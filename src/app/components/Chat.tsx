import { useCallback, useEffect, useRef, useState } from 'react'
import useSuggestions from '@/hooks/useSuggestions'
import useMessages from '@/hooks/useMessages'
import emotes from "@/assets/emotes.json"
import Message from './Message'

export default function Chat(){
  const [currentUser] = useState("AbdullahMorrison")//login/useContext would determine current user
  const {messages, addMessage} = useMessages()
  const [messageInputText, setMessageInputText] = useState("")

  const [suggestions, setSuggestions] = useState<string[] | undefined>()
  const [suggestUsers]  = useSuggestions(messages.filter(message=>message.type=="user").map((message)=>message.username))
  const [suggestCommands] = useSuggestions(["block [username]", "unblock [username]", "mods", "vips"])
  const [suggestEmotes] = useSuggestions(emotes.map(emote=>Object.keys(emote)[0]))

  const getLastWord = useCallback((text: string) =>{
    const trimmedText = text.trim()
    const words = trimmedText.split(/\s+/)
    return words.length > 0 ? words[words.length - 1] : ""
  }, [])
  const evaluateText = useCallback((e:  React.FormEvent<HTMLInputElement>) =>{
    const message = e.currentTarget.value

    if(message.length>0 && message.charAt(0)=='/' && !message.includes(" ")){
      setSuggestions(suggestCommands(message))
    }else if(message.charAt(message.length-1)!=' ' && getLastWord(message)?.charAt(0)=='@'){
      setSuggestions(suggestUsers(getLastWord(message)))
    }else if(message.charAt(message.length-1)!=' ' && getLastWord(message)?.charAt(0)==':'){
      setSuggestions(suggestEmotes(getLastWord(message)))
    }else{
      setSuggestions(undefined)
    }
  }, [getLastWord, suggestCommands, suggestUsers, suggestEmotes])

  //Keeping chat scroll to bottom for every new message
  const chatContainerRef = useRef<HTMLDivElement | null>(null)
  useEffect(()=>{
    const scrollToBottom = () => {
      if (chatContainerRef.current)
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
    scrollToBottom()
  },[messages])

  const sendChat = useCallback(()=>{
    if(messageInputText.length>0){
      addMessage(currentUser, messageInputText)
      setMessageInputText("")
      setSuggestions(undefined)
    }
  }, [messageInputText, currentUser, addMessage])

  return(
      <section className='flex flex-col justify-end p-2 w-[500px] h-full border border-gray-600 relative'>
        <div ref={chatContainerRef} className='overflow-auto'>
          {messages.map((message, index)=>{
            return(
              <Message key={index} message={message}/>
            )
          })}
        </div>
        
        {suggestions ?
          <div className='absolute bg-black rounded p-2 w-[95%] bottom-20 my-3 outline outline-1 outline-gray-500'>
            {suggestions.length==0 //check if any matches exits
              ?<p>No matches</p>
              :<>
                {suggestions.map((suggestion: string, index: number)=>
                  <button 
                    key={index}
                    className='w-full text-left rounded p-1 focus:bg-gray-700 hover:bg-gray-700'
                    onClick={()=>{
                      setMessageInputText((prev)=>prev.substring(0, prev.lastIndexOf(" ")+2)+suggestion+" ")
                      setSuggestions(undefined)
                    }}
                  >{suggestion}</button>
                )}
              </>
            }
          </div>
        : undefined}
        <input 
          className='p-2 rounded border bg-transparent my-2 border-none outline  outline-1 outline-gray-500  focus:outline-none  focus:outline-yellow-500 focus:outline-2'
          type="text" placeholder='Send a message'
          onChange={(e)=>{
            setMessageInputText(e.currentTarget.value)
            evaluateText(e)
          }}
          value={messageInputText}
          onKeyDown={(e)=> e.key=='Enter' ? sendChat() : undefined}
        />
        <button className='bg-yellow-700 hover:bg-yellow-800 py-1 px-3 rounded self-end font-bold' onClick={()=>sendChat()}>Chat</button>
      </section>
  )
}
