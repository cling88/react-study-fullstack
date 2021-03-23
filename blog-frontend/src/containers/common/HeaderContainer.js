import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/common/Header'
import { logout } from '../../redux/user'


function HeaderContainer() {
    const dispatch = useDispatch();
    const { user } = useSelector(({user}) => ({
        user: user.user
    }))

    const onLogout = () => {
        dispatch(logout())
    }

    return (
        <Header user={user} onLogout={onLogout} />
    )
}

export default HeaderContainer
