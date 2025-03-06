# Technical Discussion

This document outlines the key technical decisions and improvements made to both the frontend and backend of the Solace Candidate Assignment.

## Frontend Improvements

### Component Architecture

- Implemented Shadcn UI primitives for consistent, accessible components
- Used composable components (Card, Table) to maintain consistency and reusability

### UI/UX Enhancements

- Added loading states with Skeleton components for better user feedback
- Used Tailwind CSS for responsive, maintainable styling

### Data Management

- Implemented TanStack Query for efficient data fetching and caching
- Added data table patterns for:
  - Sorting
  - Pagination
  - Loading states
  - Data refresh capabilities

## Backend Improvements

### Database Layer (Drizzle ORM)

While I'm new to Drizzle ORM, I've implemented a few best practices:

#### Connection Management

```typescript
const queryClient = postgres(process.env.DATABASE_URL, {
  max: 10, // Connection pool size
  idle_timeout: 20, // Cleanup inactive connections
  connect_timeout: 10,
});
```

- Implemented connection pooling to efficiently manage database connections
- Added timeouts to prevent connection leaks
- Used singleton pattern in development to prevent multiple connection pools

#### Schema Optimization

```typescript
export const advocates = pgTable(
  "advocates",
  {
    // ... columns
  },
  (table) => ({
    cityIdx: index("city_idx").on(table.city),
    nameIdx: index("name_idx").on(table.firstName, table.lastName),
    specialtiesIdx: index("specialties_gin_idx").using(
      "gin",
      table.specialties
    ),
  })
);
```

- Added strategic indexes for performance:
  - Single-column index for city searches
  - Composite index for name searches
  - GIN index for JSON array searches in specialties

#### API Layer

```typescript
export async function GET() {
  try {
    const data = await db.select().from(advocates);
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch advocates" },
      { status: 500 }
    );
  }
}
```

- Implemented proper error handling
- Used appropriate HTTP status codes
- Added error logging for debugging
- Used Next.js Route Handlers for API endpoints

## Wish I Had Time For

- Dark mode
- Add query state management
- Implement filters for specialties and cities
- Leverage React Server Components where possible to reduce client-side JavaScript
