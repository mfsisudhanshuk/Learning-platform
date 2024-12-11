'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import VideoPlayer from '../../components/VideoPlayer'
import NoteSection from '../../components/NoteSection'
import CommentSection from '../../components/CommentSection'
import withAuth from '../../components/withAuth'

function CourseDetail() {
  const { id } = useParams()
  const { data: session } = useSession()
  const [course, setCourse] = useState(null)
  const [currentLesson, setCurrentLesson] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await fetch(`/api/courses/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch course')
        }
        const data = await response.json()
        setCourse(data)
        setCurrentLesson(data.lessons[0])
      } catch (error) {
        setError('An error occurred while fetching the course')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourse()
  }, [id])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (!course) {
    return <div>Course not found</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">{course.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-xl font-bold mb-4">Lessons</h2>
            <ul>
              {course.lessons.map((lesson) => (
                <li key={lesson._id} className="mb-2">
                  <button
                    onClick={() => setCurrentLesson(lesson)}
                    className={`text-left w-full p-2 rounded ${
                      currentLesson._id === lesson._id ? 'bg-primary text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    {lesson.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            {currentLesson && (
              <>
                <VideoPlayer videoUrl={currentLesson.videoUrl} />
                <NoteSection courseId={id} lessonId={currentLesson._id} />
                <CommentSection courseId={id} lessonId={currentLesson._id} />
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default withAuth(CourseDetail)

