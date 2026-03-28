<<<<<<< HEAD
# PDF Tool - iLovePDF Clone

A full-stack, production-ready web application providing core PDF manipulation tools natively. Built with React (Vite), TailwindCSS, Node.js, Express, and MongoDB.

## Features Supported
- Merge PDF
- Split PDF
- Compress PDF (Basic rebuild)
- Rotate PDF
- Add Watermark
- Unlock PDF
- Protect PDF (Stubbed requiring binaries)
- Add Page Numbers
- JPG to PDF

## Project Structure
- `/server` - Backend Node.js/Express application
- `/client` - Frontend React/Vite application

## Replit Setup Commands

To run this application in Replit, simply run from root:
```bash
npm run install:all
npm run dev:all
```

Alternatively, manual commands per the output requirements:

**Backend:**
```bash
cd server
npm install
npm run dev
```

**Frontend:**
```bash
cd client
npm install
npm run dev
```

## Environment Variables
- `server/.env`: Contains `PORT`, `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`
- `client/.env`: Custom VITE vars if needed (default points to localhost:5000)

## Mongoose / MongoDB
Make sure to provide a valid `MONGODB_URI` in `server/.env`. By default it points to `mongodb://localhost:27017/ilovepdf`.
=======
# PDFLynx.com
PDFLynx.com
>>>>>>> d23d7b2b0ca687558a984fcd6e73c19cd225d210
