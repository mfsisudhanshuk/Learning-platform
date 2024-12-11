import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="hero bg-primary text-white py-20">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Our Learning Platform</h1>
            <p className="text-xl mb-8">Discover new skills and advance your career</p>
            <Link href="/courses" className="bg-white text-primary px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Explore Courses
            </Link>
          </div>
        </section>

        <section className="services py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Online Courses</h3>
                <p>Access a wide range of courses from industry experts.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Live Workshops</h3>
                <p>Participate in interactive workshops to enhance your skills.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">1-on-1 Mentoring</h3>
                <p>Get personalized guidance from experienced mentors.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="team py-16 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img src="/placeholder.svg" alt="Team Member 1" className="w-32 h-32 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">John Doe</h3>
                <p className="text-gray-600">Founder & CEO</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img src="/placeholder.svg" alt="Team Member 2" className="w-32 h-32 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Jane Smith</h3>
                <p className="text-gray-600">Lead Instructor</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img src="/placeholder.svg" alt="Team Member 3" className="w-32 h-32 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Mike Johnson</h3>
                <p className="text-gray-600">Technical Director</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

