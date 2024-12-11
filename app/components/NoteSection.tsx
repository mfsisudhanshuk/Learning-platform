'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export default function NoteSection({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  const { data: session } = useSession()
  const [note, setNote] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchNote() {
      try {
        const response = await fetch(`/api/notes?courseId=${courseId}&lessonId=${lessonId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch note')
        }
        const data = await response.json()
        setNote(data.content)
      } catch (error) {
        setError('An error occurred while fetching the note')
      } finally {
        setIsLoading(false)
      }
    }

    if (session) {
      fetchNote()
    }
  }, [courseId, lessonId, session])

  const handleNoteChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNote = e.target.value
    setNote(newNote)

    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, lessonId, content: newNote }),
      })

      if (!response.ok) {
        throw new Error('Failed to save note')
      }
    } catch (error) {
      setError('An error occurred while saving the note')
    }
  }

  if (isLoading) {
    return <div>Loading note...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Notes</h2>
      <textarea
        value={note}
        onChange={handleNoteChange}
        className="w-full h-32 p-2 border rounded"
        placeholder="Take notes here..."
      ></textarea>
    </div>
  )
}

