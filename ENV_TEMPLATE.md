# Environment Variables Template

Copy this file to `.env.local` and fill in the values:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Optional: Database (if needed)
# DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Optional: Other API Keys
# NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

## How to generate NEXTAUTH_SECRET

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```
