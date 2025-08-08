/*
  YouTube Music wrapper search API.
  Requires 'youtube-music-api' package installed.
  Returns search results for songs using YouTube Music endpoints.
*/
const YouTubeMusicApi = require('youtube-music-api');

module.exports = async function handler(req, res) {
  const q = req.query.q || '';
  if (!q) return res.status(400).json({ error: 'Missing query parameter q' });
  try {
    const api = new YouTubeMusicApi();
    await api.initalize(); // initialize (fetches necessary tokens)
    const results = await api.search(q, 'song'); // type 'song' for song results
    // Return a compact version of results to the frontend
    res.status(200).json(results);
  } catch (e) {
    console.error('ytmusic search error', e);
    res.status(500).json({ error: e.message || String(e) });
  }
};
