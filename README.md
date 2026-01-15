# SmartOffice Project Structure

## 1. Frontend Structure (Next.js)

Located in `c:\Project\smartoffice\src`

```
src/
├── app/                  # Next.js App Router
│   ├── (dashboard)/      # Route group for dashboard pages
│   ├── api/              # API routes
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Root page
├── components/           # React components
│   ├── Auth/             # Authentication related components
│   ├── Home/             # Homepage components
│   ├── UI/               # Generic UI components (Buttons, Inputs, etc.)
│   └── layout/           # Layout components (Sidebar, Navbar, etc.)
├── context/              # React Context parsers
├── hooks/                # Custom hooks
├── lib/                  # Library configurations (utils, etc.)
├── store/                # Redux store setup
└── utils/                # Utility functions
```

## 2. Backend Structure (Express.js)

Located in `c:\Project\smartoffice\server\src`

```
src/
  ├── config/         # Environment config, DB connection
  ├── constants/      # Constant values (enums, magic numbers)
  ├── controllers/    # Route controllers (request handler logic)
  ├── middleware/     # Custom Express middlewares
  ├── models/         # Mongoose models (Data Layer)
  ├── routes/         # Express route definitions
  ├── services/       # Business logic (Service Layer)
  ├── utils/          # Utility classes/functions
  ├── validators/     # Request validators
  ├── app.ts          # Express app setup
  └── index.ts        # Entry point
```