import React from 'react'
import styled from 'styled-components'

const ResponsiveBlock = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    width: 1024px; 
    margin: 0 auto; 
    @media (max-width: 1024px) {
        width: 768px;
    }
    @media (max-width: 768px) {
        width: 100%;
    }
`

const Responsive = ({ children, ...rest }) => {
    /*
        ...rest : style, className, onClick 등을 사용할 수 있도록 나머지 prop 값들을 몽땅 전달 
    */
    return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>
}

export default Responsive
