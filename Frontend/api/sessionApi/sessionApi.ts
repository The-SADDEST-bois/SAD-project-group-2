import React from 'react'
import axios from 'axios'
import { ISession } from '../../types/types'

export const newSessionApi = async (session: ISession) => {
    const res = await axios.post('http://localhost:8080/session/', {session})
    console.log(res);
}
