import React from 'react'
import styled from 'styled-components'
import qs from 'qs'
import Button from '../common/Button'

const PaginationBlock = styled.div`
    width: 320px; 
    margin: 0 auto; 
    display: flex; 
    justify-content: space-between;
    margin-bottom: 3rem;
`

const PageNumber = styled.div``;

const buildLink = ({ username, tag, page }) => {
    const query = qs.stringify({ tag, page });
    return username ? `/@${username}?${query}` : `/?${query}`
}

const Pagination = ({ page, lastPage, username, tag }) => {
    return (
        <PaginationBlock>
            <Button to={page === 1 ? undefined: buildLink({username, tag, page: page - 1})} disalbled={page === 1}>PREV</Button>
            <PageNumber>{page}</PageNumber>
            <Button to={page === lastPage ? undefined: buildLink({username, tag, page: page + 1})} disalbled={page === lastPage}>NEXT</Button>
        </PaginationBlock>
    )
}

export default Pagination
