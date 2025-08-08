import {useRouter} from 'next/router'
import {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import { PlayerContext } from '../components/PlayerContext'

export default function Player(){
  const r = useRouter()
  const { id } = r.query
  const { play } = useContext(PlayerContext)
  const [meta,setMeta] = useState(null)

  useEffect(()=>{
    if(!id) return
    async function load(){
      const res = await axios.get('/api/search?q='+encodeURIComponent(id)+'&type=id')
      const item = (res.data.items||[])[0]
      setMeta(item)
      play(id, item)
    }
    load()
  },[id])

  return (
    <div className="max-w-4xl mx-auto p-4" style={{paddingBottom:120}}>
      <div style={{height:24}} />
      <h1 className="text-2xl font-bold">Player</h1>
      {meta && <div className="mt-4 flex gap-6">
        <img src={meta.snippet.thumbnails?.medium?.url} style={{width:220,height:220,objectFit:'cover'}}/>
        <div>
          <h2 className="text-xl font-semibold">{meta.snippet.title}</h2>
          <p className="text-sm text-[#9aa1a0]">{meta.snippet.channelTitle}</p>
          <a href={'/api/download/'+id} className="mt-4 inline-block px-3 py-2 rounded border">Download as MP3</a>
        </div>
      </div>}
    </div>
  )
}
