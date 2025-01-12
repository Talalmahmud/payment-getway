# Payment Gateway Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). This project implements a payment gateway system with user authentication, document management, and payment processing using Supabase.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm, yarn, pnpm, or bun (package managers)
- Supabase account and project

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/payment-gateway.git
cd payment-gateway
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:

Create a

.env.local

file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To create an optimized production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

### Running in Production

To run the production build:

```bash
npm run start
# or
yarn start
# or
pnpm start
# or
bun start
```

## Features

- User Authentication with Supabase
- Role-based Access Control
- Document Management (Upload, View, Filter)
- Payment Processing and Management
- Pagination and Filtering for Payments and Documents

## Project Structure

-

actions.ts

: Contains functions for interacting with Supabase (e.g., authentication, fetching data).

-

common

: Contains common components like `Pagination`.

-

tables

: Contains table components like `DocumentTable` and `PaymentTable`.

- `src/pages`: Contains Next.js pages.

## Login Credentials

### Admin Login

- Email: admin@test.com
- Password: admin123

### User Login

- Email: user@test.com
- Password: user123

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## License

This project is licensed under the MIT License.

```

### Key Points:
1. **Login Credentials**: Added a new section called "Login Credentials" with the admin and user login information.
2. **Admin Login**: Provided the email and password for the admin account.
3. **User Login**: Provided the email and password for the user account.

Make sure to replace `your-username` and `your-supabase-url` with the actual values for your project. Adjust the content as needed for your specific project setup.
### Key Points:
1. **Login Credentials**: Added a new section called "Login Credentials" with the admin and user login information.
2. **Admin Login**: Provided the email and password for the admin account.
3. **User Login**: Provided the email and password for the user account.

```
