import ytdl from 'ytdl-core'
import ffmpeg from 'fluent-ffmpeg'
import ffmpegStatic from 'ffmpeg-static'
import stream from 'stream'
export const config = { api: { bodyParser: false } }

export default async function handler(req,res){
  let { id } = req.query
  if(!id) return res.status(400).send('Missing id')
  try{
    // ensure ffmpeg path
    ffmpeg.setFfmpegPath(ffmpegStatic)

    if(!ytdl.validateID(id)){
      if(ytdl.validateURL(id)){
        id = ytdl.getURLVideoID(id)
      } else {
        return res.status(400).send('Invalid id')
      }
    }

    const info = await ytdl.getInfo(id)
    const titleRaw = info.videoDetails.title || 'download'
    const title = titleRaw.replace(/[^a-z0-9\-_. ]/gi,'').slice(0,80)

    res.setHeader('Content-Disposition', `attachment; filename="${title}.mp3"`)
    res.setHeader('Content-Type', 'audio/mpeg')

    const audioStream = ytdl(id, { filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1<<25 })

    const ffmpegProcess = ffmpeg(audioStream)
      .audioBitrate(128)
      .format('mp3')
      .on('error', err => {
        console.error('ffmpeg error', err)
        try{ if(!res.headersSent) res.status(500).send('Conversion error') }catch(_){}
      })
      .on('end', ()=> {
        try{ res.end() }catch(_){}
      })
      .pipe(res, { end: true })

  }catch(e){
    console.error(e)
    res.status(500).json({ error: e.message })
  }
}
