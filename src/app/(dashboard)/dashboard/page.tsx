'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <h1 className="text-xl font-bold">Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center">
              <span className="mr-4 text-sm text-gray-700">
                {session?.user?.email}
              </span>
              <button
                onClick={() => signOut()}
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="rounded-lg border-4 border-dashed border-gray-200 p-8">
            <h2 className="text-2xl font-bold mb-4">Welcome to Dashboard</h2>
            <p className="text-gray-600">
              This is a protected route. You need to be authenticated to view this page.
            </p>
            
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-white p-6">
                <h3 className="font-semibold mb-2">API Integration</h3>
                <p className="text-sm text-gray-600">
                  Use Orval to generate API hooks from your OpenAPI spec
                </p>
              </div>
              
              <div className="rounded-lg border bg-white p-6">
                <h3 className="font-semibold mb-2">TanStack Query</h3>
                <p className="text-sm text-gray-600">
                  Powerful data fetching and caching with React Query
                </p>
              </div>
              
              <div className="rounded-lg border bg-white p-6">
                <h3 className="font-semibold mb-2">Shadcn UI</h3>
                <p className="text-sm text-gray-600">
                  Beautiful and accessible UI components
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
