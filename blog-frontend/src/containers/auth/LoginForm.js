import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeField, initializeForm, login } from '../../redux/auth'
import AuthForm from '../../components/auth/AuthForm'
import { withRouter } from 'react-router-dom'
import { check } from '../../redux/user'

const LoginForm = ({history}) => {
    const [Error, setError] = useState(null);
    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({auth, user}) => ({
        form : auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }));
    
    const onChange = e => {
        const { value, name } = e.target;
        dispatch(changeField({
            form: 'login',
            key: name,
            value: value
        }))
    }

    const onSubmit = e => {
        e.preventDefault();
        const { username, password } = form; 
        dispatch(login({username, password}))
    }

    useEffect(() => {
        dispatch(initializeForm('login'))
    }, [dispatch]) // 최초 렌더시 form 초기화

    useEffect(() => {
        if(authError) {
            console.log("오류 발생 : ", authError);
            setError("로그인 실패");
            return;
        }
        if(auth) {
            console.log("로그인 성공");
            dispatch(check());
        }

    }, [auth, authError, dispatch])

    useEffect(() => {
        if(user) {
            history.push('/')
            try {
                localStorage.setItem('user', JSON.stringify(user));
            } catch(e) {
                console.log("localStorage is not working")
            }
        }
    }, [user, history])

    return (
        <AuthForm
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={Error}
        />
    )
}

export default withRouter(LoginForm)
