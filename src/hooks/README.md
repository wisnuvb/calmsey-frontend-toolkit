# Custom Hooks

Place your custom React hooks here.

## Examples

- `useAuth.ts` - Authentication helpers
- `useDebounce.ts` - Debounce hook
- `useLocalStorage.ts` - Local storage hook
- `useMediaQuery.ts` - Responsive design hook
- `useOnClickOutside.ts` - Click outside detector

## Example Hook

```typescript
// useDebounce.ts
import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debouncedValue;
}
```

## Naming Convention

Always prefix custom hooks with `use` (e.g., `useCustomHook`).
