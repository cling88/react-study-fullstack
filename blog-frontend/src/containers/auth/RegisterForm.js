import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeField, initializeForm, register } from '../../redux/auth'
import AuthForm from '../../components/auth/AuthForm'
import { check } from '../../redux/user'
import { withRouter } from 'react-router-dom'

const RegisterForm = ({history}) => {
    const dispatch = useDispatch();
    const { form, auth, authError, user  } = useSelector(({auth, user}) => ({
        form : auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }));
    
    const onChange = e => {
        const { value, name } = e.target;
        dispatch(changeField({
            form: 'register',
            key: name,
            value: value
        }))
    }

    const onSubmit = e => {
        e.preventDefault();
        const { username, password, passwordConfirm } = form; 
        if(password !== passwordConfirm) return;
        dispatch(register({username, password}))
    }

    // 최초 렌더시 form 초기화
    useEffect(() => {
        dispatch(initializeForm('register'))
    }, [dispatch]) 

    // user값 설정 여부

    // 회원가입 성공/실패 처리
    useEffect(() => {
        if(authError) {
            console.log("오류 : ", authError);
            return;
        }
        if(auth) {
            console.log("회원가입 성공: ", auth);
            dispatch(check())
        }
    }, [auth, authError, dispatch])

    useEffect(() => {
        if(user) {
            history.push('/')
            console.log("check API 성공: ", user)
        }
    }, [history, user])

    return (
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    )
}

export default withRouter(RegisterForm)
