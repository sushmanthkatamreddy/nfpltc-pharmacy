'use client'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

export default function DeleteButton({
  action,
  label = <Trash2 className="h-4 w-4" />,
}: {
  action: (formData: FormData) => Promise<void> | void
  label?: React.ReactNode
}) {
  return (
    <form action={action}>
      <Button
        type="submit"
        variant="outline"
        size="sm"
        className="text-red-600"
        onClick={(e) => {
          if (!confirm('Delete this post?')) e.preventDefault()
        }}
      >
        {label}
      </Button>
    </form>
  )
}