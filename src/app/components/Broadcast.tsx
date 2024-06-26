export default function Broadcast(){
  return(
    <iframe
      className='flex justify-center items-center w-full h-full'
      src={"https://player.twitch.tv/?channel=alveussanctuary&parent="+process.env.WEBSITE+"&muted=true"}
    />
  )
}
