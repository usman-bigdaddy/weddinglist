import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-pink-50">
      <div className="bg-pink-800 p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-serif text-pink-100"> Admin </h1>
          <nav className="flex space-x-4">
            <Link 
              href="/admin/verification" 
              className="text-pink-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Verification
            </Link>
            <Link 
              href="/admin/" 
              className="text-pink-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              List
            </Link>
          </nav>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto p-4">
        {children}
      </div>
    </div>
  );
}