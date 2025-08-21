# Preply - AI Study Assistant Platform

A comprehensive AI-powered study assistant platform that connects students with tutors and provides intelligent document analysis, personalized learning tools, and seamless payment processing.

## 🚀 Project Overview

Preply is a modern educational platform that combines human tutoring with AI-powered study assistance. Students can upload their study materials, get instant AI-generated insights, and book sessions with qualified tutors.

### Key Features
- **🤖 AI Study Assistant** - Document analysis, Q&A, flashcards, and quizzes
- **👥 Tutoring Platform** - Connect with qualified tutors
- **💳 Payment System** - Subscription and pay-as-you-go models
- **📅 Scheduling** - Easy session booking and calendar integration
- **📱 Modern UI** - Beautiful, responsive design

## 🏗 Architecture

This project consists of two main repositories:

### Backend Repository
- **Repository**: [preply-backend](https://github.com/RakeshK99/preply-backend)
- **Tech Stack**: FastAPI, PostgreSQL, OpenAI, Stripe, Pinecone
- **Features**: API endpoints, AI processing, payment handling, database management

### Frontend Repository
- **Repository**: [preply-frontend](https://github.com/RakeshK99/preply-frontend)
- **Tech Stack**: Next.js, TypeScript, Tailwind CSS, Clerk
- **Features**: User interface, authentication, payment forms, real-time updates

## 🚀 Quick Start

### Prerequisites
- Python 3.8+ (for backend)
- Node.js 18+ (for frontend)
- PostgreSQL
- Redis
- Stripe account
- OpenAI API key
- Clerk account

### Backend Setup
```bash
# Clone backend repository
git clone https://github.com/RakeshK99/preply-backend.git
cd preply-backend

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Run database migrations
alembic upgrade head

# Start the server
uvicorn main:app --reload
```

### Frontend Setup
```bash
# Clone frontend repository
git clone https://github.com/RakeshK99/preply-frontend.git
cd preply-frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Start the development server
npm run dev
```

## 📚 Documentation

- **Backend API Docs**: http://localhost:8000/docs (when backend is running)
- **Backend README**: [preply-backend/README.md](https://github.com/RakeshK99/preply-backend/blob/main/README.md)
- **Frontend README**: [preply-frontend/README.md](https://github.com/RakeshK99/preply-frontend/blob/main/README.md)

## 🎯 Core Features

### AI Study Assistant
- **Document Upload**: PDF, Word, PowerPoint, and text files
- **Semantic Q&A**: Ask questions about uploaded documents
- **Document Summaries**: Generate outlines and key takeaways
- **Flashcard Generation**: Create study cards with difficulty levels
- **Quiz Creation**: Multiple choice and short answer questions
- **Vector Search**: Pinecone integration for semantic document retrieval

### Tutoring Platform
- **Tutor Discovery**: Browse and search for qualified tutors
- **Session Booking**: Easy booking with calendar integration
- **Video Calls**: Integrated video calling for sessions
- **Session Management**: Track past and upcoming sessions
- **Availability Management**: Real-time tutor availability

### Payment System
- **Subscription Plans**: Starter ($19.99), Pro ($39.99), Premium ($79.99)
- **Credit System**: Monthly credits and credit pack purchases
- **Pay-as-you-go**: One-time session payments
- **Stripe Integration**: Complete payment processing with webhooks

### User Management
- **Authentication**: Secure login with Clerk
- **Role-based Access**: Student, Tutor, and Admin roles
- **User Profiles**: Comprehensive profile management
- **Session Management**: Automatic session handling

## 🛠 Tech Stack

### Backend
- **Framework**: FastAPI 0.104.1
- **Database**: PostgreSQL with SQLAlchemy 2.0
- **Authentication**: Clerk
- **AI/ML**: OpenAI GPT-4, LangChain, Pinecone
- **Payments**: Stripe
- **File Storage**: S3/Supabase
- **Background Tasks**: Celery with Redis
- **Email**: Resend

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **State Management**: React Query (TanStack Query)
- **Payments**: Stripe Elements
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Radix UI + Custom components
- **Animations**: Framer Motion

## 🔧 Development

### Backend Development
```bash
cd preply_backend

# Run tests
pytest

# Format code
black .
isort .

# Lint code
flake8
```

### Frontend Development
```bash
cd preply_frontend

# Run tests
npm run test

# Type checking
npm run type-check

# Lint code
npm run lint
```

## 🚀 Deployment

### Backend Deployment
- **Recommended**: Railway, Render, or Heroku
- **Docker**: `docker build -t preply-backend .`
- **Environment Variables**: Set all required API keys and database URLs

### Frontend Deployment
- **Recommended**: Vercel
- **Manual**: `npm run build && npm start`
- **Environment Variables**: Set backend API URL and authentication keys

## 📊 Project Status

### ✅ Completed Features
- [x] User authentication and authorization
- [x] AI study assistant with document processing
- [x] Payment system with Stripe integration
- [x] Tutoring scheduling system
- [x] File upload and storage
- [x] Email and notification system
- [x] Database models and migrations
- [x] API endpoints and documentation
- [x] Frontend UI components
- [x] Responsive design
- [x] **Complete frontend app structure with Next.js App Router**
- [x] **Role-based dashboards (Student, Tutor, Admin)**
- [x] **AI chat interface with threaded conversations**
- [x] **Document upload management with progress tracking**
- [x] **Billing and subscription management**
- [x] **Modern, Apple-inspired UI design**
- [x] **Complete API surface with FastAPI endpoints**
- [x] **Tutor management and search functionality**
- [x] **Booking system with hold/confirm flow**
- [x] **Google Calendar integration with OAuth**
- [x] **Stripe webhook handling for payments**

### 🚧 In Progress
- [ ] Real-time video calling integration
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Advanced AI features

### 📋 Planned Features
- [ ] Multi-language support
- [ ] Advanced reporting
- [ ] Integration with learning management systems
- [ ] AI-powered tutor matching
- [ ] Group study sessions

## 🎨 Frontend App Structure

### Routes Implemented
- **`/`** - Landing page with pricing, subject search, tutor cards, CTA
- **`/auth/*`** - Clerk authentication routes
- **`/dashboard`** - Role-based redirect to appropriate dashboard
- **`/dashboard/student`** - Student dashboard with widgets
- **`/dashboard/tutor`** - Tutor dashboard with availability editor
- **`/dashboard/admin`** - Admin dashboard with management tools
- **`/ai/chat`** - Threaded AI chat interface
- **`/uploads`** - Document upload and management
- **`/billing`** - Subscription and payment management

### Key Components
- **CalendarGrid** - Availability management with timezone support
- **UploadDropzone** - Drag-and-drop file upload with progress
- **FlashcardDeck** - Interactive flashcard components
- **QuizRunner** - Quiz interface with scoring
- **PlanBanner** - Feature gating based on subscription
- **Toast/Dialog/Skeleton** - UI feedback components

### Design System
- **Sleek edtech aesthetic** - White/blue space, soft shadows, rounded cards
- **Subtle animations** - Framer Motion for smooth interactions
- **Apple-inspired design** - Clean, consistent, accessible
- **Responsive layout** - Mobile-first approach
- **Dark mode ready** - Theme switching capability

## 🔌 Backend API Surface

### Authentication & User Management
- **`POST /auth/post-login`** - Attach role, create user row if first login
- **`GET /me`** - Profile & entitlements with subscription status

### Tutor Management & Search
- **`GET /tutors`** - List/search tutors with filters
- **`GET /tutors/{id}`** - Detailed tutor profile
- **`GET /tutors/{id}/slots`** - Available slots (timezone-aware)

### Booking System
- **`POST /book/hold`** - Hold slot with Redis TTL
- **`POST /book/confirm`** - Confirm booking with payment
- **`POST /book/reschedule`** - Reschedule with policy checks
- **`POST /book/cancel`** - Cancel with refunds
- **`GET /bookings`** - List bookings by role

### Calendar Integration
- **`GET /calendar/status`** - Connection status
- **`GET /calendar/connect-url`** - Google OAuth URL
- **`POST /google/oauth/callback`** - Token exchange
- **`POST /calendar/sync/{booking_id}`** - Sync events

### Billing & Payments
- **`POST /billing/checkout`** - Stripe Checkout sessions
- **`POST /billing/portal`** - Billing Portal sessions
- **`POST /stripe/webhook`** - Webhook handling with idempotency

### AI Features
- **`POST /uploads`** - S3 signed URL generation
- **`POST /uploads/{id}/finalize`** - Enqueue ingestion job
- **`GET /uploads`** - List user uploads
- **`POST /ai/summarize`** - Generate summaries
- **`POST /ai/flashcards`** - Generate flashcard decks
- **`POST /ai/quiz`** - Generate quizzes
- **`POST /ai/chat`** - RAG chat interface

### Concurrency & Safety
- **Database transactions** - Prevent double-booking
- **Redis TTL** - Temporary slot holds
- **Idempotency keys** - Safe retries
- **Unique indices** - Data integrity

## 🤝 Contributing

We welcome contributions! Please see the individual repository READMEs for contribution guidelines:

- [Backend Contributing Guide](https://github.com/RakeshK99/preply-backend/blob/main/README.md#contributing)
- [Frontend Contributing Guide](https://github.com/RakeshK99/preply-frontend/blob/main/README.md#contributing)

## 📄 License

This project is licensed under the MIT License - see the LICENSE files in each repository for details.

## 📞 Support

- **Email**: support@preply.com
- **Issues**: Create issues in the respective repositories
- **Documentation**: Check the README files in each repository

## 🔗 Links

- **Backend Repository**: https://github.com/RakeshK99/preply-backend
- **Frontend Repository**: https://github.com/RakeshK99/preply-frontend
- **Live Demo**: Coming soon
- **Documentation**: Coming soon

---

**Built with ❤️ for students and tutors worldwide**

*Preply - Empowering education through AI and human connection*
