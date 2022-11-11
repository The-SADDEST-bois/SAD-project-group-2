import React from 'react'
import axios from 'axios'
import { ISession } from '../../types/types'


const instance = axios.create({
    baseURL: 'http://localhost:8080/',
})

export const newSessionApi = async (session: ISession) => {
    const res = await instance.post<ISession>('session', {name: session.sessionName, session: session.date})
    console.log(res);
}
