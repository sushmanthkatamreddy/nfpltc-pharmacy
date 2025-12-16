"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function AdminUsersPage() {
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const form = e.currentTarget // keep a reference (avoid null after awaits)
    const formData = new FormData(form)

    const payload = {
      account_number: (formData.get("account_number") as string)?.toString().trim(),
      dob: formData.get("dob") as string,
      email: (formData.get("email") as string)?.toLowerCase().trim(),
      password: formData.get("password") as string,
      full_name: (formData.get("full_name") as string)?.trim(),
    }

    try {
      const res = await fetch("/api/admin/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) {
        setMessage(`Error: ${data.error ?? "Failed to create user"}`)
      } else {
        setMessage("✅ User created successfully!")
        form.reset()
      }
    } catch (err: any) {
      setMessage(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-6">Manage Users</h1>

      <form onSubmit={handleCreateUser} className="space-y-4">
        <div>
          <Label htmlFor="full_name">Full Name</Label>
          <Input id="full_name" name="full_name" placeholder="Jane Doe" required />
        </div>

        <div>
          <Label htmlFor="account_number">Account Number</Label>
          <Input id="account_number" name="account_number" placeholder="12345" required />
        </div>

        <div>
          <Label htmlFor="dob">DOB</Label>
          <Input id="dob" name="dob" type="date" required />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="jane@example.com" required />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" placeholder="••••••••" required />
        </div>

        {message && <p className="text-sm text-gray-700">{message}</p>}

        <Button type="submit" disabled={loading} className="w-full bg-emerald-700 hover:bg-emerald-800 text-white">
          {loading ? "Creating..." : "Create User"}
        </Button>
      </form>
    </main>
  )
}