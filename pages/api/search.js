import fetch from 'node-fetch'
export default async function handler(req,res){
  const q = req.query.q || ''
  const type = req.query.type || ''
  const key = process.env.YT_API_KEY
  if(!key){
    return res.status(400).json({error:'YT_API_KEY not set in env'})
  }
  if(type === 'id'){
    const id = q
    const v = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${encodeURIComponent(id)}&key=${key}`)
    const jd = await v.json()
    return res.status(200).json(jd)
  }
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=10&maxResults=25&q=${encodeURIComponent(q)}&key=${key}`
  const r = await fetch(url)
  const data = await r.json()
  res.status(200).json(data)
}
