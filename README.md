# Safhira Nanda — Web Profile

Next.js portfolio (EN/ID) with cream + pink visual direction, contact form via Resend.

## Setup

```bash
cd safhira-web
cp .env.example .env.local
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key |
| `CONTACT_TO_EMAIL` | Inbox for form submissions (default: safhirara0@gmail.com) |
| `CONTACT_FROM_EMAIL` | Verified Resend sender |
| `NEXT_PUBLIC_PHOTO_URL` | Professional photo URL |
| `NEXT_PUBLIC_CV_URL` | CV / resume download URL |

Without a Resend key, the contact API accepts submissions and logs them (dev-friendly mock).

## Deploy

Vercel-ready. Add the env vars in the Vercel project, then attach your custom domain.
