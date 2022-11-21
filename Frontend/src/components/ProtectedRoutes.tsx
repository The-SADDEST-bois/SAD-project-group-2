import { interactivity } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';
import { Roles } from '../../types/roles';
import { IUser } from '../../types/types';
import { useStore } from '../contexts/storeProvider';

interface Props{
    user: IUser | null;
    role: Roles;
}

const ProtectedRoutes = (props: Props) => {

    if (props.user === null || props.user === undefined) {
        console.log("Please log in");
        return <Navigate to="/" replace/>
    }
    if (props.role !== props.user.role)
    {
        console.log('Insufficient permissions');
        return <Navigate to="/" replace/>
    }
    return <Outlet />;

}
export default ProtectedRoutes;