# Setup
1. Install Node.js 20.9+.
2. Copy .env.example to .env.local and enter local development values only.
3. Run npm install.
4. Configure PostgreSQL, then run npx prisma migrate dev --name init.
5. Run npm run dev and open http://localhost:3000.
Never commit .env.local or credentials. Use payment-provider sandbox credentials first and validate webhook signatures server-side.