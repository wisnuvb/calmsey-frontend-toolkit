# API Architecture Guide

This project supports **two scenarios** for API usage:

1. **Fullstack** - Using Next.js API Routes (integrated backend)
2. **External API** - Consuming API from a separate backend (microservices, REST API, etc.)

## 🏗️ Scenario 1: Fullstack (Next.js API Routes)

Use this scenario if you want to build the backend directly in Next.js.

### Struktur API Routes

```
src/app/api/
├── auth/
│   └── [...nextauth]/route.ts    # NextAuth endpoints
├── users/
│   └── route.ts                   # GET /api/users, POST /api/users
└── users/[id]/
    └── route.ts                   # GET/PUT/DELETE /api/users/:id
```

### Contoh: Users API Route

```typescript
// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/users
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Your database logic here
  const users = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'admin' },
  ];

  return NextResponse.json(users);
}

// POST /api/users
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  // Your database logic here
  const newUser = {
    id: Date.now().toString(),
    ...body,
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json(newUser, { status: 201 });
}
```

### Configuration for Fullstack

```env
# .env.local
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
NEXT_PUBLIC_API_URL=http://localhost:3000/api  # Point ke Next.js API routes
```

### Benefits of Fullstack:

- ✅ All code in one project
- ✅ Type-safe end-to-end
- ✅ Easy deployment (Vercel, etc.)
- ✅ Server-side logic directly in Next.js
- ✅ Can use Server Actions as well

---

## 🌐 Scenario 2: External API (Consume Separate Backend)

Use this scenario if the backend is already separate (Laravel, Express, Django, NestJS, etc.).

### Axios Configuration

The Axios instance is already configured in `src/lib/axios.ts`:

```typescript
// Automatically uses NEXT_PUBLIC_API_URL from env
baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
```

### Setup Environment

```env
# .env.local
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
NEXT_PUBLIC_API_URL=https://api.yourdomain.com  # External API URL
```

### Setup Orval to Generate API Client

1. **Update `orval.config.js`**:

```javascript
module.exports = {
  api: {
    input: {
      // Point to your backend's OpenAPI/Swagger spec
      target: 'https://api.yourdomain.com/swagger.json',
      // or local file
      // target: './openapi.json',
    },
    output: {
      target: './src/services/api/endpoints',
      schemas: './src/services/api/model',
      client: 'react-query',
      // ... rest of config
    },
  },
};
```

2. **Generate API Client**:

```bash
npm run generate:api
```

3. **Use Generated Hooks**:

```typescript
// src/app/(dashboard)/users/page.tsx
import { useGetUsers, useCreateUser } from '@/services/api/endpoints/users';

export default function UsersPage() {
  // Automatically type-safe from OpenAPI spec!
  const { data: users, isLoading } = useGetUsers();
  const createUser = useCreateUser();

  // ...
}
```

### Authentication Flow for External API

Your backend must return a format like this:

```json
{
  "id": "123",
  "email": "user@example.com",
  "name": "John Doe",
  "accessToken": "jwt-token-here"
}
```

Update `src/lib/auth.ts`:

```typescript
async authorize(credentials) {
  // Call external API
  const response = await axiosInstance.post('https://api.yourdomain.com/auth/login', {
    email: credentials.email,
    password: credentials.password,
  });

  const user = response.data;

  if (user && user.accessToken) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      accessToken: user.accessToken, // Stored in JWT session
    };
  }

  return null;
}
```

### Benefits of External API:

- ✅ Separate backend (microservices architecture)
- ✅ Can use any backend framework
- ✅ Auto-generate TypeScript types from OpenAPI
- ✅ Type-safe API calls with React Query hooks
- ✅ Backend can be deployed separately

---

## 🔄 Hybrid Approach (Combination)

You can also **combine** both approaches:

- **Next.js API Routes** for: Auth, file upload, server-side logic
- **External API** for: Business logic, database operations

Example:

```typescript
// Next.js API Route for file upload
// src/app/api/upload/route.ts
export async function POST(request: NextRequest) {
  // Handle file upload
}

// External API for business logic
// src/services/api/endpoints/users.ts (generated)
export const useGetUsers = () => {
  // Call external API
};
```

---

## 📝 Best Practices

### 1. Environment Variables

Always use `NEXT_PUBLIC_*` prefix for variables used in the client:

```env
NEXT_PUBLIC_API_URL=https://api.example.com  # ✅ Accessible in client
API_SECRET_KEY=secret123                      # ❌ Server only
```

### 2. Error Handling

Axios interceptor already handles 401 auto-redirect. For other errors:

```typescript
try {
  const response = await axiosInstance.get('/users');
} catch (error) {
  if (error.response?.status === 404) {
    // Handle 404
  } else if (error.response?.status === 500) {
    // Handle 500
  }
}
```

### 3. Type Safety

- **Fullstack**: Export types from API routes
- **External API**: Auto-generate from OpenAPI spec with Orval

### 4. CORS (for External API)

Make sure your backend allows CORS from the frontend domain:

```javascript
// Backend (Express example)
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
```

---

## 🚀 Quick Start

### Fullstack Setup:

1. Buat API routes di `src/app/api/`
2. Set `NEXT_PUBLIC_API_URL=http://localhost:3000/api`
3. Done!

### External API Setup:

1. Set `NEXT_PUBLIC_API_URL=https://your-api.com`
2. Update `orval.config.js` with OpenAPI spec URL
3. Run `npm run generate:api`
4. Use generated hooks!

---

## 📚 Resources

- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Orval Documentation](https://orval.dev/)
- [Axios Documentation](https://axios-http.com/)
- [TanStack Query](https://tanstack.com/query/latest)
