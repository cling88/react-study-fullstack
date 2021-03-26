import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import palette from '../../lib/styles/palette'

const TagBlock = styled.div`
    margin-top: 0.5rem;
    .tag {
        display: inline-block; 
        color: ${palette.cyan[7]};
        text-decoration: none; 
        margin-right: 0.5rem;
    }
    &:hover {
        color: ${palette.cyan[6]};
    }
`

const Tags = ({ tags }) => {
    return (
        <TagBlock>
            {
                tags &&
                tags.map(tag => (
                    <div key={tag} className="tag">#{tag}</div>
                ))
            }
        </TagBlock>
    )
}

export default Tags
