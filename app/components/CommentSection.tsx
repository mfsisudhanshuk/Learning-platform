'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export default function CommentSection({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  const { data: session } = useSession()
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(`/api/comments?courseId=${courseId}&lessonId=${lessonId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch comments')
        }
        const data = await response.json()
        setComments(data)
      } catch (error) {
        setError('An error occurred while fetching comments')
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [courseId, lessonId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, lessonId, content: newComment }),
      })

      if (!response.ok) {
        throw new Error('Failed to post comment')
      }

      const postedComment = await response.json()
      setComments([...comments, postedComment])
      setNewComment('')
    } catch (error) {
      setError('An error occurred while posting the comment')
    }
  }

  if (isLoading) {
    return <div>Loading comments...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      {session && (
        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full h-24 p-2 border rounded mb-2"
            placeholder="Add a comment..."
          ></textarea>
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
            Post Comment
          </button>
        </form>
      )}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="bg-gray-100 p-4 rounded">
            <p className="font-bold">{comment.userId.name}</p>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

