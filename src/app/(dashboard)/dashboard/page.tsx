'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DashboardLayout } from '@/components/shared/DashboardLayout';
import { LoadingPage } from '@/components/shared/LoadingSpinner';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LayoutDashboard, Users, FileText, Settings } from 'lucide-react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <LoadingPage />;
  }

  const stats = [
    {
      title: 'Total Users',
      value: '2,543',
      change: '+12%',
      icon: Users,
      trend: 'up',
    },
    {
      title: 'Active Sessions',
      value: '842',
      change: '+8%',
      icon: LayoutDashboard,
      trend: 'up',
    },
    {
      title: 'Documents',
      value: '1,234',
      change: '-3%',
      icon: FileText,
      trend: 'down',
    },
    {
      title: 'Settings',
      value: '12',
      change: '0%',
      icon: Settings,
      trend: 'neutral',
    },
  ];

  const features = [
    {
      title: 'API Integration',
      description: 'Use Orval to generate API hooks from your OpenAPI spec',
      badge: 'Auto-generated',
    },
    {
      title: 'TanStack Query',
      description: 'Powerful data fetching and caching with React Query',
      badge: 'Optimized',
    },
    {
      title: 'Shadcn UI',
      description: 'Beautiful and accessible UI components',
      badge: 'Ready',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {session?.user?.email}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span
                    className={
                      stat.trend === 'up'
                        ? 'text-green-600'
                        : stat.trend === 'down'
                        ? 'text-red-600'
                        : 'text-gray-600'
                    }
                  >
                    {stat.change}
                  </span>{' '}
                  from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{feature.title}</CardTitle>
                    <Badge>{feature.badge}</Badge>
                  </div>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
            <CardDescription>
              Get started with your next feature
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">
                ✅ <strong>Step 1:</strong> Configure your OpenAPI spec in{' '}
                <code className="rounded bg-muted px-1 py-0.5">orval.config.js</code>
              </p>
              <p className="text-sm">
                ✅ <strong>Step 2:</strong> Run{' '}
                <code className="rounded bg-muted px-1 py-0.5">npm run generate:api</code>
              </p>
              <p className="text-sm">
                ✅ <strong>Step 3:</strong> Use generated hooks in your components
              </p>
              <p className="text-sm">
                📚 Check the documentation for more details
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
