# Shared Components

Global reusable components used across the application.

## Components

### Layout Components

- **DashboardLayout** - Main layout wrapper for dashboard pages with Navbar and Sidebar
- **Navbar** - Top navigation bar with user menu
- **Sidebar** - Side navigation menu for dashboard

### Utility Components

- **LoadingSpinner** - Loading indicator with configurable sizes
- **LoadingPage** - Full-page loading state
- **ErrorMessage** - Error display with optional retry button
- **ErrorPage** - Full-page error state

## Usage

```typescript
// Layout
import { DashboardLayout } from '@/components/shared/DashboardLayout';

export default function Page() {
  return (
    <DashboardLayout>
      <h1>Dashboard Content</h1>
    </DashboardLayout>
  );
}

// Loading
import { LoadingSpinner, LoadingPage } from '@/components/shared/LoadingSpinner';

<LoadingSpinner size="lg" text="Loading data..." />

// Error
import { ErrorMessage } from '@/components/shared/ErrorMessage';

<ErrorMessage 
  title="Failed to load"
  message={error.message}
  onRetry={() => refetch()}
/>
```

## Component Structure

- All components are client components (`'use client'`)
- Use Tailwind CSS for styling
- Import from `lucide-react` for icons
- Follow Shadcn UI design patterns
