import Head from 'next/head'
import axios from 'axios'
import {useState, useContext} from 'react'
import { PlayerContext } from '../components/PlayerContext'

export default function Home(){
  const [q,setQ] = useState('')
  const [results,setResults] = useState([])
  const { play } = useContext(PlayerContext)

  async function search(e){
    e.preventDefault()
    if(!q) return
    const r = await axios.get('/api/search?q='+encodeURIComponent(q))
    setResults(r.data.items || [])
  }
  return (
    <>
      <Head><title>ADTV Music</title></Head>
      <div className="max-w-4xl mx-auto p-4">
        <header className="flex items-center gap-4 py-4">
          <div className="logo text-2xl">ADTV Music</div>
        </header>

        <main>
          <form onSubmit={search}>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search songs, artists..." className="w-full p-4 rounded-xl bg-[#071211] text-white" />
          </form>

          <section className="mt-6">
            {results.length===0 && <div className="p-4 bg-[#0b1413] rounded-lg">Try searching for a song or artist.</div>}
            <div className="mt-4 space-y-3">
            {results.map(it=>(
              <div key={it.id.videoId || it.id} className="p-3 bg-[#0b1413] rounded-lg flex items-center gap-4">
                <img src={it.snippet.thumbnails?.medium?.url || '/placeholder.png'} className="thumb" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{it.snippet.title}</div>
                  <div className="text-sm text-[#9aa1a0]">{it.snippet.channelTitle}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={()=>play(it.id.videoId || it.id, it)} className="px-3 py-2 rounded border">Play</button>
                  <a href={`/api/download/${it.id.videoId || it.id}`} className="px-3 py-2 rounded border">Download</a>
                </div>
              </div>
            ))}
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
