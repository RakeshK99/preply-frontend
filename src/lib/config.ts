export const config = {
  // Clerk Authentication (client-side only needs publishableKey)
  clerk: {
    publishableKey:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
      'pk_test_Y2xvc2UtY2FyZGluYWwtMjcuY2xlcmsuYWNjb3VudHMuZGV2JA',
  },

  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  },

  // Stripe Configuration
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  },

  // Environment
  env: process.env.NODE_ENV || 'development',

  // App Configuration
  app: {
    name: 'Preply',
    description: 'AI-powered study assistant with human tutoring',
  },
};

// Validation
export function validateConfig() {
  const requiredEnvVars = ['NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY'];

  const missing = requiredEnvVars.filter((envVar) => !process.env[envVar]);

  if (missing.length > 0) {
    console.warn('Missing optional environment variables:', missing);
    console.warn('Using fallback defaults where possible.');
  }

  return true;
}
