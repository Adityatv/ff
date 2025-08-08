import ytdl from 'ytdl-core'
export const config = { api: { bodyParser: false } }

export default async function handler(req,res){
  let { id } = req.query
  if(!id) return res.status(400).send('Missing id')
  try{
    // Validate id
    if(!ytdl.validateID(id)){
      if(ytdl.validateURL(id)){
        // extract id from url
        id = ytdl.getURLVideoID(id)
      } else {
        return res.status(400).send('Invalid video id')
      }
    }
    res.setHeader('Content-Type','audio/mpeg')
    const stream = ytdl(id, { filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1<<25 })
    stream.pipe(res)
    stream.on('error', (e)=>{ console.error('ytdl stream error', e); try{ res.end() }catch(_){} })
  }catch(e){
    console.error(e)
    res.status(500).json({error: e.message})
  }
}
