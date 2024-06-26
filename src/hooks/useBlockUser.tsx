import { useCallback, useState } from "react";

export default function useBlockUser() {
    const [blockedUsers, setBlockedUsers] = useState<string[]>([]) 

    const blockUser = useCallback((username: string) =>{
      setBlockedUsers((prev)=>[...prev, username])
    }, [])
    const unblockUser = useCallback((username: string) =>{
      setBlockedUsers((blockedUsers)=>blockedUsers.filter((u)=>u!=username))
    }, [])

    return {blockedUsers, blockUser, unblockUser}
}
