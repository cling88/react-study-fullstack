import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeField, initializeForm, register } from '../../redux/auth'
import AuthForm from '../../components/auth/AuthForm'
import { check } from '../../redux/user'
import { withRouter } from 'react-router-dom'

const RegisterForm = ({history}) => {
    const [Error, setError] = useState(null);
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
        console.log(">> onSubmit")
        const { username, password, passwordConfirm } = form; 
        if([username, password, passwordConfirm].includes('')){
            setError("빈 칸을 모두 입력하세요");
            return; 
        }
        if(password !== passwordConfirm) {
            setError("비밀번호가 일치하지 않습니다.");
            dispatch(changeField({ form: 'register', key: 'password', value: '' }))
            dispatch(changeField({ form: 'register', key: 'passwordConfirm', value: '' }))
            return;
        };
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
            // 계정이 이미 존재
            if(authError.response.status === 409) {
                setError("계정이 이미 존재합니다");
                return;
            }
            // 기타 에러
            setError('회원가입 실패')
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
            try {
                localStorage.setItem('user', JSON.stringify(user));
            } catch(e) {
                console.log("localStorage is not working")
            }
            console.log("check API 성공: ", user)
        }
    }, [history, user])

    return (
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={Error}
        />
    )
}

export default withRouter(RegisterForm)
