import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-amber-50">
      <div className="bg-gradient-to-r from-amber-700 to-amber-800 p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-serif text-amber-100"> Admin </h1>
          <nav className="flex space-x-4">
            <Link
              href="/admin/verification"
              className="text-amber-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Verification
            </Link>
            <Link
              href="/admin/"
              className="text-amber-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              List
            </Link>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">{children}</div>
    </div>
  );
}
