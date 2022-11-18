import React, { useEffect, useState } from 'react'
import { HStack, VStack, Text, Button } from '@chakra-ui/react'
import { IUser } from '../../../types/types'
import { useStore } from '../../contexts/storeProvider'

const newSession = () => {

    const authStore = useStore();

    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  
    useEffect(() => {
      setCurrentUser(authStore.auth.user);
    }, [authStore.auth.user]);

    const handleClick = () => {
        if (authStore) {
            authStore.auth.Authenticate();
        }
    }

    return (
        <HStack width="full" height="1000px" justify={"center"}>
            <VStack width="full" justify={"center"}>
                <Text>{'testpage' + currentUser?.email}</Text>
                <Button onClick={() => handleClick()} >auth</Button>
            </VStack>
        </HStack>
    )
}
export default newSession
