import messagesJSON from '@/assets/messages.json'
import { useCallback, useEffect, useState } from 'react'
import useBlockUser from './useBlockUser'

type Message = {
  username: string,
  message: string
}
export default function useMessages() {
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState<Message[]>([])
  const  {blockedUsers, blockUser, unblockUser} = useBlockUser()

  const messagesInit = useCallback((users: string[], messagesList: string[]) => {
    let messages: Message[] = []

    users.forEach(user => {
      let randomIndex = Math.floor(Math.random() * messagesList.length)
      messages.push({
        username: user,
        message: messagesList[randomIndex]
      })
    })
    setMessages(messages)
  }, [])

  useEffect(()=>{
    const fetchUsers = async () => {
      const response = await fetch("https://665621609f970b3b36c4625e.mockapi.io/users")
      const data =  (await response.json()).map((user: any)=>user.username)
      setUsers(data)
      messagesInit(data, messagesJSON)
    }
    fetchUsers()
  },[messagesInit])


  //Since chat is not moving, messages won't be added so I'll just print blockedUsers when it updates
  useEffect(()=>{
    console.log(blockedUsers)
  },[blockedUsers])
  const addMessage = useCallback((username: string, message: string)=>{
    if(blockedUsers.includes(username)) return //blocked users won't show in chat

    //NOTE: you can technically block yourself here, but won't fix 
    if(message.startsWith('/block')){//doesn't check if user exists
      const userToblock = message.split(" ")[1]
      blockUser(userToblock)
      return
    }else if(message.startsWith('/unblock')){//doesn't check if user exists
      const userToUnblock = message.split(" ")[1]
      unblockUser(userToUnblock)
      return
    }

    const newMessage: Message = {username, message}
    setMessages((curMessages: Message[])=>[...curMessages, newMessage])
  }, [blockUser, unblockUser, blockedUsers])

  return {messages, addMessage}
}
