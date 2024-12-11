import Link from 'next/link';

export default function CourseCard({ course }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{course.title}</h2>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <Link href={`/courses/${course.id}`} className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors">
          View Course
        </Link>
      </div>
    </div>
  );
}

