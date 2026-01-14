# State Management

Place your global state management here.

## Recommended: Zustand

```bash
npm install zustand
```

## Example Store

```typescript
// userStore.ts
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
```

## Usage in Components

```typescript
import { useUserStore } from '@/store/userStore';

function UserProfile() {
  const { user, logout } = useUserStore();
  
  return (
    <div>
      <p>Welcome, {user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## When to Use Global State

Use global state for:
- User authentication state
- Theme preferences
- Shopping cart
- Global UI state (modals, sidebars)

## When NOT to Use

Avoid global state for:
- Server data (use React Query instead)
- Form state (use React Hook Form)
- Component-specific state (use useState)

## Alternatives

- **Zustand** - Recommended (simple, minimal boilerplate)
- **Jotai** - Atomic state management
- **Redux Toolkit** - For complex applications
- **Context API** - Built-in, but verbose
