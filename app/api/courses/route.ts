import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import dbConnect from '@/lib/mongodb'
import Course from '@/models/Course'

export async function GET(req: Request) {
  await dbConnect()
  const courses = await Course.find({})
  return NextResponse.json(courses)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await dbConnect()
  const data = await req.json()
  const course = new Course(data)
  await course.save()
  return NextResponse.json(course, { status: 201 })
}

