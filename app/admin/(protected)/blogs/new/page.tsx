import { createBlog } from '../action'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function NewBlogPage() {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold">New Blog Post</h1>
      <p className="mt-1 text-sm text-gray-600">Fill in details, upload images, and save.</p>

      <form action={createBlog} className="mt-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-900">Title</label>
          <input name="title" required className="mt-1 w-full rounded-md border p-2" placeholder="Post title" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Meta Title</label>
            <input name="meta_title" className="mt-1 w-full rounded-md border p-2" placeholder="SEO title (optional)" />
          </div>
          <div>
            <label className="block text-sm font-medium">Slug</label>
            <input name="slug" className="mt-1 w-full rounded-md border p-2" placeholder="auto from title if empty" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Author</label>
            <input name="author_name" className="mt-1 w-full rounded-md border p-2" placeholder="e.g., Dr. Jane Smith" />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <input name="description" className="mt-1 w-full rounded-md border p-2" placeholder="Short SEO description" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Content</label>
          <textarea
            name="content"
            rows={12}
            required
            className="mt-1 w-full rounded-md border p-3 font-mono"
            placeholder="# Heading..."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Thumbnail</label>
            <input name="thumbnail" type="file" accept="image/*" className="mt-1 block w-full text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium">Main Image</label>
            <input name="main_image" type="file" accept="image/*" className="mt-1 block w-full text-sm" />
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" className="bg-emerald-700 hover:bg-emerald-800">Save</Button>
          <Button type="reset" variant="outline">Reset</Button>
        </div>
      </form>
    </main>
  )
}