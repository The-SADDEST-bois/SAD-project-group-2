import React, { useEffect, useState } from 'react'
import * as Chakra from '@chakra-ui/react'
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
        <Chakra.HStack width="full" height="1000px" justify={"center"}>
            <Chakra.VStack width="full" justify={"center"}>
                <Chakra.Text>Hello, {currentUser?.name}</Chakra.Text>
                <Chakra.Input
                    placeholder="Username"
                    value={session.sessionName}
                    onChange={(e) =>
                        setSession({ ...session, sessionName: e.target.value })
                    }
                />

                <Chakra.Button
                    colorScheme="blue"
                    variant="outline"
                    width="full"
                    onClick={() => handleSubmit()}
                >
                    Submit
                </Chakra.Button>
            </Chakra.VStack>
        </Chakra.HStack>
    )
}
export default newSession
