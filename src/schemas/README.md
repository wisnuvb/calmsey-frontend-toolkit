# Validation Schemas

Place your Zod validation schemas here.

## Examples

- `user.schema.ts` - User validation schemas
- `auth.schema.ts` - Authentication schemas
- `product.schema.ts` - Product schemas
- `common.schema.ts` - Shared/common schemas

## Example Schema

```typescript
// user.schema.ts
import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['user', 'admin']).default('user'),
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
```

## Usage with Forms

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserSchema, CreateUserInput } from '@/schemas/user.schema';

const { register, handleSubmit, formState: { errors } } = useForm<CreateUserInput>({
  resolver: zodResolver(createUserSchema),
});
```

## Benefits

- Type-safe validation
- Reusable schemas
- Automatic TypeScript types
- Runtime validation
