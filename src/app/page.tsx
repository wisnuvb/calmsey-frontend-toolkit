export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-4">Frontend Toolset</h1>
        <p className="text-lg mb-8">
          Next.js project with Orval, TanStack Query, NextAuth, and Shadcn UI
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">✨ Features</h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Next.js 15 with App Router</li>
              <li>TypeScript configuration</li>
              <li>TanStack Query (React Query)</li>
              <li>NextAuth.js authentication</li>
              <li>Orval API code generation</li>
              <li>Shadcn UI components</li>
              <li>Tailwind CSS styling</li>
            </ul>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">🚀 Getting Started</h2>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Configure environment variables</li>
              <li>Update OpenAPI spec in orval.config.js</li>
              <li>Run: npm run generate:api</li>
              <li>Start developing!</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}
