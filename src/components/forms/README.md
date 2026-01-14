# Form Components

Place form-specific components and wrappers here.

## Examples

- `UserForm.tsx` - User creation/edit form
- `LoginForm.tsx` - Login form
- `SearchBar.tsx` - Search input component
- `DatePicker.tsx` - Date picker wrapper
- `FileUpload.tsx` - File upload component

## Best Practices

- Use React Hook Form for form state management
- Use Zod for validation schemas
- Keep forms composable and reusable
- Handle loading and error states

## Example

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '@/schemas/user.schema';

export function UserForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(userSchema),
  });
  
  return <form>...</form>;
}
```
