import { useCallback, useMemo } from "react"
import emotes from "@/assets/emotes.json"

type UserMessage = {
  type: "user"
  username: string
  message: string
}
type NotificationMessage = {
  type: "notification"
  message: string
}
type Message = {
  message: UserMessage | NotificationMessage 
}
export default function Message({message}: Message){
  const emoteMap: { [key: string]: string }  = emotes.reduce((acc: any, emote) => {
    const [key, value] = Object.entries(emote)[0];
    acc[key] = value;
    return acc;
  }, {});

  const words = useMemo(()=>{
    return message.message.split(" ")
  }, [message])

  const parseMessage = useCallback(()=>{
    return(
      words.map((word: any)=>{
        if(emoteMap[word]){
          return <img className="w-8 mx-1" src={emoteMap[word]} alt={word}/>
        }else{
          return <>{word} </>
        }
      })
    )
  }, [words])

  return(
    <p className='flex items-center py-1 text-[14px] hover:bg-gray-800'>
      {message.type == "user" ?
        <>
          <span className='text-yellow-500 font-bold'>{message.username}</span>: {parseMessage()}
        </>
        : <span className='text-gray-300'>{parseMessage()}</span>
      }
    </p>
  )
}
