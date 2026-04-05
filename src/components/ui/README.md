# shadcn/ui Components for Landing Page Builder

A comprehensive set of accessible, reusable, and customizable UI components built with Radix UI and Tailwind CSS, optimized for the landing page builder with full RTL/LTR support.

## Features

- ✅ **TypeScript Support**: Full type safety with TypeScript
- ✅ **RTL/LTR Support**: Built-in support for right-to-left languages
- ✅ **Dark Mode**: Automatic dark mode support
- ✅ **Accessibility**: WCAG compliant components
- ✅ **Customizable**: Easy to customize with Tailwind CSS
- ✅ **Responsive**: Mobile-first responsive design
- ✅ **Animated**: Smooth transitions and animations

## Installation

All dependencies are already installed. The components are ready to use.

## Usage

### Importing Components

```tsx
// Import individual components
import { Button, Input, Card } from "@/components/ui"

// Or import all components from the index
import * as UI from "@/components/ui"
```

### RTL/LTR Support

All components support RTL (Right-to-Left) text direction:

```tsx
import { Button } from "@/components/ui"

function MyComponent() {
  return (
    <div dir="rtl">
      <Button isRtl>RTL Button</Button>
      <Button isRtl={false}>LTR Button</Button>
    </div>
  )
}
```

## Components

### Button

A versatile button component with multiple variants and sizes.

```tsx
import { Button } from "@/components/ui"

// Variants
<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="gradient">Gradient</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

// Loading state
<Button loading>Loading...</Button>

// RTL support
<Button isRtl>RTL Button</Button>
```

### Input

A flexible input component with adornments and error handling.

```tsx
import { Input } from "@/components/ui"

// Basic input
<Input placeholder="Enter text..." />

// With error
<Input error helperText="This field is required" />

// With adornments
<Input
  startAdornment={<SearchIcon />}
  endAdornment={<ClearIcon />}
  placeholder="Search..."
/>

// RTL support
<Input isRtl placeholder="RTL input..." />
```

### Card

A container component for grouping related content.

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui"

<Card isRtl variant="elevated">
  <CardHeader isRtl>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>
```

### Dialog

Modal dialog component for overlays and forms.

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui"

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent isRtl showCloseButton>
    <DialogHeader isRtl>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    Dialog content
  </DialogContent>
</Dialog>
```

### Select

A customizable select dropdown component.

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"

<Select>
  <SelectTrigger isRtl>
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent isRtl>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

### Dropdown Menu

Context menu component with various menu items.

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent isRtl>
    <DropdownMenuItem>Item 1</DropdownMenuItem>
    <DropdownMenuItem>Item 2</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Badge

Small status indicators and labels.

```tsx
import { Badge } from "@/components/ui"

// Variants
<Badge>Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="gradient">Gradient</Badge>

// Sizes
<Badge size="sm">Small</Badge>
<Badge size="default">Default</Badge>
<Badge size="lg">Large</Badge>
```

### Form

Form components with validation and field organization.

```tsx
import { Form, FormField, FormSection, FormActions } from "@/components/ui"

<Form onSubmit={handleSubmit} isRtl>
  <FormSection title="Personal Information" isRtl>
    <FormField label="Name" required isRtl>
      <Input placeholder="Enter your name" isRtl />
    </FormField>
    <FormField
      label="Email"
      required
      error={emailError}
      description="We'll never share your email"
      isRtl
    >
      <Input type="email" placeholder="Enter your email" isRtl />
    </FormField>
  </FormSection>

  <FormActions isRtl>
    <Button variant="outline">Cancel</Button>
    <Button type="submit">Submit</Button>
  </FormActions>
</Form>
```

### Toast

Notification system with various types and actions.

```tsx
import { useToast } from "@/components/ui"

function MyComponent() {
  const toast = useToast()

  const showSuccess = () => {
    toast.success("Operation successful!", {
      description: "Your changes have been saved.",
      action: {
        label: "Undo",
        onClick: handleUndo,
      },
      isRtl: true,
    })
  }

  return <Button onClick={showSuccess}>Show Success</Button>
}
```

## Customization

### Custom Variants

All components use `class-variance-authority` (cva) for variant management. You can easily extend or customize variants:

```tsx
import { cva } from "class-variance-authority"

const customButtonVariants = cva(buttonVariants.base, {
  variants: {
    variant: {
      ...buttonVariants.variants.variant,
      custom: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
    },
  },
})
```

### Theme Customization

The components use CSS variables for theming. You can customize the theme by modifying the CSS variables in `src/styles/globals.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96%;
  --background: 0 0% 100%;
  /* ... more variables */
}
```

## Best Practices

1. **Always provide accessibility labels**: Use proper aria labels and semantic HTML
2. **Test with screen readers**: Ensure components work with assistive technologies
3. **Check contrast ratios**: Ensure text meets WCAG contrast requirements
4. **Test RTL layouts**: Verify components work correctly in right-to-left languages
5. **Use semantic HTML**: Use proper HTML elements for better SEO and accessibility

## Contributing

When adding new components:

1. Follow the existing component structure
2. Include TypeScript types
3. Add RTL support with the `isRtl` prop
4. Include proper accessibility attributes
5. Add comprehensive documentation
6. Update this README file

## Demo

Check out `src/components/ui/demo.tsx` for a comprehensive demonstration of all components in action.