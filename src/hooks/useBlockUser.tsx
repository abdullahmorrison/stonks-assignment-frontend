import { useCallback, useState } from "react";

export default function useBlockUser() {
    const [blockedUsers, setBlockedUsers] = useState<string[]>([]) 

    const blockUser = useCallback((username: string) =>{
      setBlockedUsers((prev)=>[...prev, username])
    }, [blockedUsers])
    const unblockUser = useCallback((username: string) =>{
      setBlockedUsers((blockedUsers)=>blockedUsers.filter((u)=>u!=username))
    }, [blockedUsers])

    return {blockedUsers, blockUser, unblockUser}
}
