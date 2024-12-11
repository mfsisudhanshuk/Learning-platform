'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import withAuth from '../components/withAuth'

function Profile() {
  const { data: session } = useSession()
  const [name, setName] = useState('')
  const [videoLinks, setVideoLinks] = useState([])
  const [newVideoTitle, setNewVideoTitle] = useState('')
  const [newVideoUrl, setNewVideoUrl] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch('/api/profile')
        if (!response.ok) {
          throw new Error('Failed to fetch profile')
        }
        const data = await response.json()
        setName(data.name)
        setVideoLinks(data.videoLinks)
      } catch (error) {
        setError('An error occurred while fetching profile data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      // Update successful
    } catch (error) {
      setError('An error occurred while updating profile')
    }
  }

  const handleAddVideoLink = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/video-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newVideoTitle, url: newVideoUrl }),
      })

      if (!response.ok) {
        throw new Error('Failed to add video link')
      }

      const newVideoLink = await response.json()
      setVideoLinks([...videoLinks, newVideoLink])
      setNewVideoTitle('')
      setNewVideoUrl('')
    } catch (error) {
      setError('An error occurred while adding video link')
    }
  }

  if (isLoading) {
    return <div>Loading profile...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>
        <form onSubmit={handleUpdateProfile} className="mb-8">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
            Update Profile
          </button>
        </form>

        <h2 className="text-2xl font-bold mb-4">Video Links</h2>
        <form onSubmit={handleAddVideoLink} className="mb-4">
          <div className="mb-2">
            <label htmlFor="videoTitle" className="block mb-2">Video Title</label>
            <input
              type="text"
              id="videoTitle"
              value={newVideoTitle}
              onChange={(e) => setNewVideoTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="videoUrl" className="block mb-2">Video URL</label>
            <input
              type="url"
              id="videoUrl"
              value={newVideoUrl}
              onChange={(e) => setNewVideoUrl(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
            Add Video Link
          </button>
        </form>

        <ul className="space-y-2">
          {videoLinks.map((link) => (
            <li key={link._id} className="bg-gray-100 p-4 rounded">
              <h3 className="font-bold">{link.title}</h3>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {link.url}
              </a>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  )
}

export default withAuth(Profile)

