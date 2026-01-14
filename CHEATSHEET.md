# Quick Reference Cheatsheet

Essential commands and code snippets for Frontend Toolset.

## 🚀 NPM Scripts

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
npm run format:check     # Check formatting

# API Generation
npm run generate:api     # Generate API client from OpenAPI spec
```

## 🔧 Shadcn UI Components

```bash
# Install individual components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add form
npx shadcn@latest add table
npx shadcn@latest add dialog
npx shadcn@latest add toast
npx shadcn@latest add dropdown-menu

# Install multiple at once
npx shadcn@latest add button card input form
```

## 📝 Common Code Patterns

### 1. Fetching Data (React Query)

```typescript
import { useGetUsers } from '@/services/api/endpoints/users';

function UsersList() {
  const { data, isLoading, error, refetch } = useGetUsers();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data?.map(user => <div key={user.id}>{user.name}</div>)}
      <button onClick={() => refetch()}>Refresh</button>
    </div>
  );
}
```

### 2. Creating/Updating Data (Mutations)

```typescript
import { useCreateUser } from '@/services/api/endpoints/users';
import { queryClient } from '@/lib/query-client';

function CreateUserForm() {
  const { mutate, isPending } = useCreateUser({
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] });
      alert('User created!');
    },
    onError: (error) => {
      alert('Error: ' + error.message);
    },
  });
  
  const handleSubmit = (data) => {
    mutate(data);
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

### 3. Form with Validation (React Hook Form + Zod)

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

function LoginForm() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const onSubmit = async (data: FormData) => {
    await loginApi(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

### 4. Protected Route

```typescript
'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedPage() {
  const { data: session, status } = useSession();
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/login');
    }
  }, [status]);
  
  if (status === 'loading') return <div>Loading...</div>;
  
  return <div>Protected Content</div>;
}
```

### 5. Server Component with Data Fetching

```typescript
// Server component (no 'use client')
import { axiosInstance } from '@/lib/axios';

async function getUsers() {
  const response = await axiosInstance.get('/users');
  return response.data;
}

export default async function UsersPage() {
  const users = await getUsers();
  
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### 6. Using Shadcn Components

```typescript
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter text..." />
        <Button className="mt-4">Submit</Button>
      </CardContent>
    </Card>
  );
}
```

### 7. Global State (Zustand)

```typescript
// store/userStore.ts
import { create } from 'zustand';

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

// Usage in component
import { useUserStore } from '@/store/userStore';

function UserProfile() {
  const { user, logout } = useUserStore();
  
  return (
    <div>
      <p>{user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### 8. API Route Handler

```typescript
// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const users = await fetchUsersFromDB();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const user = await createUserInDB(body);
  return NextResponse.json(user, { status: 201 });
}
```

### 9. Environment Variables

```typescript
// Client-side (must prefix with NEXT_PUBLIC_)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Server-side (no prefix needed)
const dbUrl = process.env.DATABASE_URL;
```

### 10. Custom Hook Example

```typescript
// hooks/useDebounce.ts
import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debouncedValue;
}

// Usage
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 500);

useEffect(() => {
  // API call with debounced value
  searchApi(debouncedSearch);
}, [debouncedSearch]);
```

## 🔐 Authentication Patterns

### Login

```typescript
import { signIn } from 'next-auth/react';

const login = async (email: string, password: string) => {
  const result = await signIn('credentials', {
    email,
    password,
    redirect: false,
  });
  
  if (result?.error) {
    console.error('Login failed:', result.error);
  } else {
    router.push('/dashboard');
  }
};
```

### Logout

```typescript
import { signOut } from 'next-auth/react';

const logout = () => {
  signOut({ callbackUrl: '/' });
};
```

### Get Session

```typescript
import { useSession } from 'next-auth/react';

const { data: session, status } = useSession();

// status can be: "loading" | "authenticated" | "unauthenticated"
```

## 🎨 Styling Patterns

### Tailwind Classes with cn()

```typescript
import { cn } from '@/lib/utils';

<button 
  className={cn(
    'px-4 py-2 rounded',
    isActive && 'bg-blue-500',
    isDisabled && 'opacity-50 cursor-not-allowed'
  )}
>
  Button
</button>
```

### Conditional Classes

```typescript
<div className={`
  flex items-center gap-4
  ${isOpen ? 'h-full' : 'h-0'}
  ${error ? 'border-red-500' : 'border-gray-300'}
`}>
```

## 📦 Common Imports

```typescript
// React
import { useState, useEffect, useMemo, useCallback } from 'react';

// Next.js
import { redirect } from 'next/navigation';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// React Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// NextAuth
import { useSession, signIn, signOut } from 'next-auth/react';

// Forms
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Utils
import { cn } from '@/lib/utils';
import { axiosInstance } from '@/lib/axios';
```

## 🔍 TypeScript Tips

### Type from Zod Schema

```typescript
const userSchema = z.object({
  id: z.string(),
  name: z.string(),
});

type User = z.infer<typeof userSchema>;
```

### Generic Component Props

```typescript
interface Props<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: Props<T>) {
  return <>{items.map(renderItem)}</>;
}
```

## 🐛 Debugging

### React Query Devtools

Already included! Open in browser:
- Press `Ctrl/Cmd + Shift + D` to toggle
- Or look for floating icon in bottom corner

### Console Logging

```typescript
console.log('Debug:', data);
console.error('Error:', error);
console.table(arrayOfObjects);
```

## 📚 Resources Quick Links

- [Next.js Docs](https://nextjs.org/docs)
- [React Query Docs](https://tanstack.com/query/latest/docs/react/overview)
- [Shadcn Components](https://ui.shadcn.com/docs/components)
- [Zod Docs](https://zod.dev/)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🆘 Common Issues

### Issue: "Module not found"
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### Issue: Orval generation fails
```bash
# Check if OpenAPI spec is valid
# Use https://editor.swagger.io/
```

### Issue: Auth not working
```env
# Make sure these are set in .env.local
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
```

### Issue: Types not working
```bash
# Restart TypeScript server
# VS Code: Ctrl/Cmd + Shift + P → "TypeScript: Restart TS Server"
```
