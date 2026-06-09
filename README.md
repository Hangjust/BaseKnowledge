# BaseKnowledge

BaseKnowledge is an accountless learning platform prototype for high school learners. Students can browse subjects, study topic explanations, complete quizzes, and use an AI assistant for textbook screenshots. Only administrators sign in to manage content.

## Prototype scope

- Public learning experience for Biology, English, Physics, Chemistry, and Economics
- Complete sample slice: Physics -> Thermodynamics
- Difficulty levels: Basic, Intermediate, Advanced
- Practice quizzes with instant feedback
- AI screenshot assistant powered by the OpenAI Responses API
- Admin dashboard protected with credentials auth
- MongoDB content storage and Cloudinary media uploads when configured

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

The app runs with seeded read-only content if MongoDB is not configured. Admin content writes require `MONGODB_URI`.

## Environment variables

See `.env.example` for the full list. Required for the full prototype:

- `NEXTAUTH_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH`
- `MONGODB_URI`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `OPENAI_API_KEY`

For local-only admin testing, `ADMIN_PASSWORD` is supported when `NODE_ENV !== "production"`.

Generate an admin password hash:

```bash
npm run admin:hash -- "your-password"
```

When pasting a bcrypt hash into `.env.local`, use the `ADMIN_PASSWORD_HASH=...` line printed by the script. It escapes `$` characters for Next.js env-file expansion.

## Scripts

- `npm run dev` starts the local development server.
- `npm start` builds first, then starts the production server locally.

```bash
npm run dev
npm run build
npm start
npm test
```
