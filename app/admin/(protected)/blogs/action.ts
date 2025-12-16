'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { createClient as createAdminClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const BLOG_BUCKET = process.env.NEXT_PUBLIC_BLOG_BUCKET || 'blog'

function slugify(s: string) {
  return s.toLowerCase().trim()
    .replace(/[\s_]+/g, '-').replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-').replace(/^-|-$/g, '')
}

async function getSSR() {
  const maybe = cookies() as any
  const cs = typeof maybe?.then === 'function' ? await maybe : maybe
  return createServerClient(SUPABASE_URL, ANON_KEY, {
    cookies: {
      get: (n: string) => cs.get(n)?.value,
      set(name: string, value: string, options: CookieOptions) { cs.set({ name, value, ...options }) },
      remove(name: string, options: CookieOptions) { cs.set({ name, value: '', ...options, maxAge: 0 }) },
    },
  })
}

function getAdmin() {
  return createAdminClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

async function uploadImage(
  admin: ReturnType<typeof getAdmin>,
  file: File | null,
  slug: string,
  key: 'thumbnails' | 'main'
): Promise<string | null> {
  if (!file || file.size === 0) return null
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
  const path = `${key}/${slug}.${ext}`
  const buf = Buffer.from(await file.arrayBuffer())
  const { error: upErr } = await admin.storage.from(BLOG_BUCKET).upload(path, buf, {
    upsert: true,
    contentType: file.type || 'image/*',
  })
  if (upErr) throw upErr
  return admin.storage.from(BLOG_BUCKET).getPublicUrl(path).data.publicUrl
}

export async function createBlog(form: FormData) {
  const ssr = await getSSR()
  const admin = getAdmin()

  const { data: { user } = { user: null } } = await ssr.auth.getUser()

  const title       = String(form.get('title') || '').trim()
  const meta_title  = String(form.get('meta_title') || '').trim() || null
  const description = String(form.get('description') || '').trim() || null
  const rawSlug     = String(form.get('slug') || '')
  const content     = String(form.get('content') || '').trim() || null
  const author_name = String(form.get('author_name') || '').trim() || null
  const thumbFile   = (form.get('thumbnail')  as File) || null
  const mainFile    = (form.get('main_image') as File) || null

  if (!title) throw new Error('Title is required')

  let slug = slugify(rawSlug || title) || crypto.randomUUID().slice(0, 8)
  const { data: exists } = await admin.from('blogs').select('id').eq('slug', slug).maybeSingle()
  if (exists) slug = `${slug}-${crypto.randomUUID().slice(0, 6)}`

  const [thumbnail_url, main_image_url] = await Promise.all([
    uploadImage(admin, thumbFile, slug, 'thumbnails'),
    uploadImage(admin, mainFile,  slug, 'main'),
  ])

  // only set created_by if matching profile exists (avoid FK failure)
  let created_by: string | null = null
  if (user?.id) {
    const { data: prof } = await admin.from('profiles').select('id').eq('id', user.id).maybeSingle()
    if (prof) created_by = user.id
  }

  const id = crypto.randomUUID()
  const payload = {
    id, title, meta_title, description, slug,
    thumbnail_url, main_image_url,
    content, created_by, author_name,
  }

  const { error } = await admin.from('blogs').insert(payload)
  if (error) {
    console.error('Blog insert failed:', error)
    throw new Error(error.message || 'Failed to create blog')
  }

  revalidatePath('/admin/blogs')
  redirect('/admin/blogs')
}

export async function deleteBlog(id: string) {
  const admin = getAdmin()
  const { error } = await admin.from('blogs').delete().eq('id', id)
  if (error) {
    console.error('Blog delete failed:', error)
    throw new Error(error.message || 'Failed to delete blog')
  }
  revalidatePath('/admin/blogs')
}