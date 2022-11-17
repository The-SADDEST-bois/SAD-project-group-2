import React, { useEffect, useState } from 'react'
import {HStack, VStack, Text, Input, Button} from '@chakra-ui/react'
import { ISession, IUser } from '../../../types/types'
import { newSessionApi } from '../../../api/sessionApi/sessionApi'
import { useStore } from '../../contexts/storeProvider'

const newSession = () => {

    const authStore = useStore();

    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  
    useEffect(() => {
      setCurrentUser(authStore.auth.user);
    }, [authStore.auth.user]);
  

    const initialState: ISession = {
        sessionName: "",
        date: new Date().toISOString()
    };

    const [session, setSession] = useState<ISession>(initialState);

    console.log(session.sessionName);

    const handleSubmit = () => {
        newSessionApi(session);
    }

    return (
        <HStack width="full" height="1000px" justify={"center"}>
            <VStack width="full" justify={"center"}>
                <Text>Hello, {currentUser?.name}</Text>
                <Input
                    placeholder="Username"
                    value={session.sessionName}
                    onChange={(e) =>
                        setSession({ ...session, sessionName: e.target.value })
                    }
                />

                <Button
                    colorScheme="blue"
                    variant="outline"
                    width="full"
                    onClick={() => handleSubmit()}
                >
                    Submit
                </Button>
            </VStack>
        </HStack>
    )
}
export default newSession
