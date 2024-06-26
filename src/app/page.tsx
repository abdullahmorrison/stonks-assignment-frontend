"use client"
import Broadcast from "./components/Broadcast"
import Chat from "./components/Chat"

export default function Stonks() {
  return (
    <main className='flex w-screen h-screen'>
      <Broadcast/>
      <Chat/>
    </main>
  )
}
