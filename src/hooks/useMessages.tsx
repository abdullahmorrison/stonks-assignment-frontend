import messagesJSON from '@/assets/messages.json'
import { useCallback, useEffect, useState } from 'react'
import useBlockUser from './useBlockUser'

type UserMessage = {
  type: "user"
  username: string
  message: string
}
type NotificationMessage = {
  type: "notification"
  message: string
}
type Message = UserMessage | NotificationMessage
export default function useMessages() {
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState<Message[]>([])
  const  {blockedUsers, blockUser, unblockUser} = useBlockUser()

  const messagesInit = useCallback((users: string[], messagesList: string[]) => {
    let messages: UserMessage[] = []

    users.forEach(user => {
      let randomIndex = Math.floor(Math.random() * messagesList.length)
      messages.push({
        type: "user",
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
    if(message.startsWith('/block ')){//doesn't check if user exists
      const userToblock = message.split(" ")[1]
      setMessages((curMessages: Message[])=>[...curMessages, {type: "notification", message: "User "+userToblock+" has been blocked"}])
      blockUser(userToblock)
      return
    }else if(message.startsWith('/unblock ')){//doesn't check if user exists
      const userToUnblock = message.split(" ")[1]
      setMessages((curMessages: Message[])=>[...curMessages, {type: "notification", message: "User "+userToUnblock+" has been unblocked"}])
      unblockUser(userToUnblock)
      return
    }

    const newUserMessage: Message = {type: 'user', username, message}
    setMessages((curMessages: Message[])=>[...curMessages, newUserMessage])
  }, [blockUser, unblockUser, blockedUsers])

  return {messages, addMessage}
}
