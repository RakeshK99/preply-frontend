# Preply Frontend Setup Guide

## 🚀 Quick Start

### 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Clerk Authentication (Required)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here

# Backend API (Required)
NEXT_PUBLIC_API_URL=http://localhost:8000

# Stripe (Required for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Next.js (Optional - auto-generated)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Environment
NODE_ENV=development
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🔧 Required Services Setup

### 1. Clerk Authentication

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Get your API keys from the API Keys section
4. Configure your application settings:
   - **Sign-in methods**: Email, Google, GitHub
   - **User management**: Enable user profiles
   - **Domains**: Add your domain (localhost:3000 for development)

### 2. Stripe Payments

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create a new account or use existing
3. Get your publishable key from the Developers > API Keys section
4. Configure webhooks (for backend integration)
5. Set up products and pricing plans

### 3. Backend API

Ensure the backend is running at `http://localhost:8000` with all required services configured.

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run type checking
npm run type-check
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── dashboard/         # Dashboard pages
│   ├── ai/               # AI features
│   ├── uploads/          # File uploads
│   ├── billing/          # Billing & subscriptions
│   └── layout.tsx        # Root layout
├── components/           # Reusable components
│   ├── ui/              # Base UI components
│   ├── providers/       # Context providers
│   └── features/        # Feature-specific components
├── lib/                 # Utilities and configurations
│   ├── config.ts        # Environment configuration
│   └── utils.ts         # Helper functions
└── types/               # TypeScript type definitions
```

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env.local` to version control
2. **API Keys**: Use test keys for development, production keys for deployment
3. **CORS**: Configure CORS properly in the backend
4. **Authentication**: All protected routes are handled by Clerk middleware

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

1. Build the application: `npm run build`
2. Set environment variables
3. Deploy the `.next` folder

## 🐛 Troubleshooting

### Common Issues

1. **Clerk Key Missing**: Ensure `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set
2. **API Connection**: Check `NEXT_PUBLIC_API_URL` points to running backend
3. **Build Errors**: Run `npm run type-check` to identify TypeScript issues
4. **Middleware Errors**: Ensure Clerk middleware is properly configured

### Debug Mode

Enable debug mode by setting:
```bash
NODE_ENV=development
DEBUG=true
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
