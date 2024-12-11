import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import dbConnect from '@/lib/mongodb'
import Note from '@/models/Note'

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const courseId = searchParams.get('courseId')
  const lessonId = searchParams.get('lessonId')

  if (!courseId || !lessonId) {
    return NextResponse.json({ error: 'Course ID and Lesson ID are required' }, { status: 400 })
  }

  await dbConnect()
  const note = await Note.findOne({ userId: session.user.id, courseId, lessonId })
  return NextResponse.json(note || { content: '' })
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { courseId, lessonId, content } = await req.json()

  if (!courseId || !lessonId || !content) {
    return NextResponse.json({ error: 'Course ID, Lesson ID, and content are required' }, { status: 400 })
  }

  await dbConnect()
  const note = await Note.findOneAndUpdate(
    { userId: session.user.id, courseId, lessonId },
    { content },
    { upsert: true, new: true }
  )

  return NextResponse.json(note)
}

