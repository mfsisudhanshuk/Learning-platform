'use client'

import withAuth from '../components/withAuth'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useSession } from 'next-auth/react'

function Dashboard() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <p>Welcome, {session?.user?.name || 'User'}!</p>
        {/* Add more dashboard content here */}
      </main>
      <Footer />
    </div>
  )
}

export default withAuth(Dashboard)

