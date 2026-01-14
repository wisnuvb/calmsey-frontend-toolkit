# UI Components

Shadcn UI components - primitive, reusable building blocks.

## Installed Components

### Form Elements
- **Button** - Button component with variants (default, destructive, outline, secondary, ghost, link)
- **Input** - Text input field
- **Label** - Form label

### Layout & Display
- **Card** - Card container with Header, Title, Description, Content, Footer
- **Table** - Table with Header, Body, Footer, Row, Head, Cell, Caption
- **Badge** - Small status/tag indicator
- **Alert** - Alert message with Title and Description

## Usage

```typescript
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

function MyForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" />
          </div>
          <Button>Submit</Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

## Adding More Components

Install additional Shadcn UI components as needed:

```bash
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add select
npx shadcn@latest add textarea
npx shadcn@latest add toast
```

## Documentation

Full component documentation: https://ui.shadcn.com/docs/components
