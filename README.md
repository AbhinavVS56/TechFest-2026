# TechFest 2026 Portal — Experiment 5

## Structure
- `frontend/`: React + Vite application
- `backend/`: Express REST API and MongoDB models
- `.github/workflows/ci.yml`: GitHub Actions CI workflow

## Local setup

### Backend
```bash
cd backend
npm install
```
Copy `.env.example` to `.env`, then set `MONGO_URI` and a long random `JWT_SECRET`.
```bash
npm run dev
```
Health check: `http://localhost:5000/api/health`

### Frontend
In another terminal:
```bash
cd frontend
npm install
```
Copy `.env.example` to `.env` (or leave the default localhost API URL).
```bash
npm run dev
```

## Security implemented
- Helmet security response headers
- express-mongo-sanitize for NoSQL operator sanitization
- Request body size limit
- Strict allow-list CORS with credentials
- bcrypt password hashing
- JWT in an HttpOnly, SameSite=Strict cookie (Bearer token remains supported)
- React renders user-provided text as text, not injected HTML

## Deployment
- MongoDB Atlas: create a database and set `MONGO_URI` in Render.
- Render: deploy `backend` as a Node web service; build command `npm install`; start command `npm start`.
- Render environment variables: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` (Netlify URL), `NODE_ENV=production`.
- Netlify: base directory `frontend`, build command `npm run build`, publish directory `dist`; set `VITE_API_URL` to the Render API base URL.
- Add a Netlify SPA redirect: `frontend/public/_redirects` contains `/* /index.html 200`.

Never commit `.env` files, credentials, database passwords or JWT secrets.

Experiment 5 security improvements completed.
