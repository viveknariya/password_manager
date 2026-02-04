# SaaS Template

A modern SaaS application template.

## Quick Start

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd saas_template
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables

   ```bash
   cp .env
   ```

4. Start development server
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file with the following:

```
# Database
DATABASE_URL=

# API Keys
JWT_SECRET=

# Email
ZEPTOMAIL_API_KEY=
ZEPTOMAIL_FROM_ADDRESS=

# Stripe
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
```

## License

MIT License - see LICENSE file for details.
