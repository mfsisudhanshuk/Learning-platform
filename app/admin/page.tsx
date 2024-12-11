'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import withAuth from '../components/withAuth'

function AdminPanel() {
  const { data: session } = useSession()
  const [users, setUsers] = useState([])
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const [usersResponse, coursesResponse] = await Promise.all([
          fetch('/api/admin/users'),
          fetch('/api/admin/courses')
        ])

        if (!usersResponse.ok || !coursesResponse.ok) {
          throw new Error('Failed to fetch data')
        }

        const [usersData, coursesData] = await Promise.all([
          usersResponse.json(),
          coursesResponse.json()
        ])

        setUsers(usersData)
        setCourses(coursesData)
      } catch (error) {
        setError('An error occurred while fetching data')
      } finally {
        setIsLoading(false)
      }
    }

    if (session?.user?.role === 'admin') {
      fetchData()
    } else {
      setError('Unauthorized access')
      setIsLoading(false)
    }
  }, [session])

  if (isLoading) {
    return <div>Loading admin panel...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Users</h2>
          <ul className="space-y-2">
            {users.map((user) => (
              <li key={user._id} className="bg-gray-100 p-4 rounded">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Courses</h2>
          <ul className="space-y-2">
            {courses.map((course) => (
              <li key={course._id} className="bg-gray-100 p-4 rounded">
                <p><strong>Title:</strong> {course.title}</p>
                <p><strong>Instructor:</strong> {course.instructor.name}</p>
                <p><strong>Lessons:</strong> {course.lessons.length}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default withAuth(AdminPanel)

