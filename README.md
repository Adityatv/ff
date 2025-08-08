# ADTV Music — Vercel-ready

This is a Next.js + serverless API scaffold for **ADTV Music**.

## Setup

1. Replace `YT_API_KEY` in `.env.local`.
2. Install dependencies:
   ```
   npm install
   ```
3. Run locally:
   ```
   npm run dev
   ```
4. Deploy to Vercel: connect repository — Vercel will auto-install deps.

## Notes

- Streaming & downloads use `ytdl-core` and `ffmpeg-static` (fluent-ffmpeg).
- Ensure you understand YouTube's Terms of Service before deploying public download/stream endpoints.


## YouTube Music wrapper
- New endpoint: `/api/ytmusic/search?q=...` uses `youtube-music-api` to fetch results from YouTube Music.
- Official YouTube Data API endpoint: `/api/search?q=...` remains for Data API v3.
