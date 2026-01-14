# Getting Started Guide

Complete guide to set up and start developing with Frontend Toolset.

## Step 1: Environment Setup

1. **Copy environment file:**
```bash
cp .env.example .env
```

2. **Update environment variables:**
```env
# Required
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key  # Generate with: openssl rand -base64 32

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api  # Your backend API URL
```

## Step 2: Configure Orval for API Generation

1. **Update `orval.config.js`** with your OpenAPI spec:

```javascript
module.exports = {
  api: {
    input: {
      // Option 1: URL to your Swagger/OpenAPI spec
      target: 'https://api.example.com/swagger.json',
      
      // Option 2: Local file
      // target: './openapi.json',
    },
    // ... rest of config
  },
};
```

2. **Generate API client:**
```bash
npm run generate:api
```

This will create:
- `src/services/api/endpoints/` - React Query hooks
- `src/services/api/model/` - TypeScript types

## Step 3: Implement Authentication

The project includes basic NextAuth setup. Customize based on your backend:

### Update Auth Configuration (`src/lib/auth.ts`)

```typescript
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Replace with your actual login API call
        const response = await axiosInstance.post('/auth/login', {
          email: credentials.email,
          password: credentials.password,
        });
        
        return response.data; // Should return user object with accessToken
      },
    }),
  ],
  // ... rest of config
};
```

### Login Flow

Users can login at `/login`:
```
http://localhost:3000/login
```

## Step 4: Start Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Step 5: Create Your First Feature

### Example: User List Page

1. **Create page file:**
```typescript
// src/app/(dashboard)/users/page.tsx
'use client';

import { useGetUsers } from '@/services/api/endpoints/users';

export default function UsersPage() {
  const { data: users, isLoading, error } = useGetUsers();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <ul className="space-y-2">
        {users?.map(user => (
          <li key={user.id} className="p-4 border rounded">
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

2. **Add navigation:**
Update your dashboard layout to include links to new pages.

## Step 6: Add UI Components

Install Shadcn UI components as needed:

```bash
# Button
npx shadcn@latest add button

# Form components
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add form

# Data display
npx shadcn@latest add table
npx shadcn@latest add card
npx shadcn@latest add badge

# Feedback
npx shadcn@latest add toast
npx shadcn@latest add alert
npx shadcn@latest add dialog
```

### Example Usage:

```typescript
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={() => console.log('Clicked!')}>
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
}
```

## Step 7: Form Handling with React Hook Form + Zod

1. **Create schema:**
```typescript
// src/schemas/user.schema.ts
import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['user', 'admin']).default('user'),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
```

2. **Create form component:**
```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserSchema, CreateUserInput } from '@/schemas/user.schema';
import { useCreateUser } from '@/services/api/endpoints/users';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function CreateUserForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });
  
  const { mutate: createUser, isPending } = useCreateUser();
  
  const onSubmit = (data: CreateUserInput) => {
    createUser(data, {
      onSuccess: () => {
        alert('User created successfully!');
      },
      onError: (error) => {
        alert('Error creating user: ' + error.message);
      },
    });
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input {...register('email')} placeholder="Email" />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
      </div>
      
      <div>
        <Input {...register('name')} placeholder="Name" />
        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
      </div>
      
      <div>
        <Input type="password" {...register('password')} placeholder="Password" />
        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
      </div>
      
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create User'}
      </Button>
    </form>
  );
}
```

## Step 8: State Management (Optional)

For global state, you can use Zustand:

```bash
npm install zustand
```

```typescript
// src/store/userStore.ts
import { create } from 'zustand';

interface UserState {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}));
```

## Common Tasks

### Adding New Pages

1. Create file in `src/app/`:
   - Public pages: `src/app/about/page.tsx`
   - Protected pages: `src/app/(dashboard)/settings/page.tsx`
   - Auth pages: `src/app/(auth)/register/page.tsx`

### Protecting Routes

Use `useSession` hook:
```typescript
'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function ProtectedPage() {
  const { data: session, status } = useSession();
  
  if (status === 'unauthenticated') {
    redirect('/login');
  }
  
  return <div>Protected content</div>;
}
```

### API Requests Outside React Components

```typescript
import { axiosInstance } from '@/lib/axios';

async function serverAction() {
  const response = await axiosInstance.get('/data');
  return response.data;
}
```

### Handling File Uploads

```typescript
const formData = new FormData();
formData.append('file', file);

await axiosInstance.post('/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
```

## Troubleshooting

### Orval Generation Fails
- Check if OpenAPI spec URL is accessible
- Validate OpenAPI spec format at [Swagger Editor](https://editor.swagger.io/)
- Check Orval logs for specific errors

### Authentication Not Working
- Verify NEXTAUTH_SECRET is set
- Check API endpoint returns correct user object with accessToken
- Ensure NEXTAUTH_URL matches your domain

### API Calls Failing
- Check NEXT_PUBLIC_API_URL is correct
- Verify CORS settings on backend
- Check browser console for detailed error messages

## Next Steps

1. **Customize UI Theme** - Edit `tailwind.config.ts` and `src/app/globals.css`
2. **Add More Pages** - Create features in `src/app/(dashboard)/`
3. **Deploy** - See deployment guide in main README
4. **Set up CI/CD** - Add GitHub Actions or similar

## Resources

- [Project README](./README.md)
- [Next.js Docs](https://nextjs.org/docs)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Shadcn UI Components](https://ui.shadcn.com/docs/components)
- [Orval Documentation](https://orval.dev/)
