import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeField, initializeForm } from '../../redux/auth'
import AuthForm from '../../components/auth/AuthForm'

function RegisterForm() {
    const dispatch = useDispatch();
    const { form } = useSelector(({auth}) => ({
        form : auth.register
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
        // ...
    }

    useEffect(() => {
        dispatch(initializeForm('register'))
    }, [dispatch]) // 최초 렌더시 form 초기화


    return (
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    )
}

export default RegisterForm
