import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import dbConnect from '@/lib/mongodb'
import Comment from '@/models/Comment'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const courseId = searchParams.get('courseId')
  const lessonId = searchParams.get('lessonId')

  if (!courseId || !lessonId) {
    return NextResponse.json({ error: 'Course ID and Lesson ID are required' }, { status: 400 })
  }

  await dbConnect()
  const comments = await Comment.find({ courseId, lessonId }).populate('userId', 'name')
  return NextResponse.json(comments)
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
  const comment = new Comment({
    userId: session.user.id,
    courseId,
    lessonId,
    content
  })
  await comment.save()

  return NextResponse.json(comment, { status: 201 })
}

