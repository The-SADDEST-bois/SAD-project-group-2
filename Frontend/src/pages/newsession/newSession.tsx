import React, { useEffect, useState } from 'react'
import {HStack, VStack, Text, Input, Button} from '@chakra-ui/react'
import { ISession, IUser } from '../../../types/types'
import { newSessionApi } from '../../../api/sessionApi/sessionApi'
import { useStore } from '../../contexts/storeProvider'
import api from '../../../api/config/apiconfig'
import Cookies from 'js-cookie'

const newSession = () => {

    const authStore = useStore();

    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  
    useEffect(() => {
      setCurrentUser(authStore.auth.user);
    }, [authStore.auth.user]);
  
    const handleSubmit = async () => {
        const cookie = Cookies.get("accessToken");
        const response = await api.post('/user/refresh', {accessToken: cookie});
        console.log(response);
    }

    return (
        <HStack width="full" height="1000px" justify={"center"}>
            <VStack width="full" justify={"center"}>
                <Text>Hello, {currentUser?.name}</Text>

                <Button
                    colorScheme="blue"
                    variant="outline"
                    width="full"
                    onClick={() => handleSubmit()}>
                    Submit
                </Button>
            </VStack>
        </HStack>
    )
}
export default newSession
