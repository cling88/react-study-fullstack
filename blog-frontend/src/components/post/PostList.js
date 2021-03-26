import React from 'react'
import styled from 'styled-components'
import palette from '../../lib/styles/palette'
import Responsive from '../common/Responsive'
import Button from '../common/Button'
import { Link } from 'react-router-dom'
import SubInfo from '../../components/common/SubInfo'
import Tags from '../../components/common/Tags'



const PostListBlock = styled.div`
    margin-top: 3rem; 
`
const WritePostButtonWrapper = styled.div`
    display: flex; 
    justify-content: flex-end; 
    margin-bottom: 3rem;
`
const PostItemBlock = styled.div`
    padding: 3rem 0; 
    &:first-child {
        padding-top: 0;
    }
    & + & {
        border-top: 1px solid ${palette.gray[2]};
    }
    h2 {
        font-size: 2rem;
        margin-bottom: 0; 
        margin-top: 0; 
        &:hover {
            color: ${palette.gray[6]};
        }
    }
    p {
        margin-top: 2rem;
    }
`


const PostItem = ({ post }) => {
    const { publishedDate, user, tags, title, body, _id } = post;
    return(
        <PostItemBlock>
            <h2><Link to={`/@${user.username}/${_id}`} >{ title }</Link></h2>
            <SubInfo username={user.username} publishedDate={new Date(publishedDate)} />
            <Tags tags={tags} />
            <p>{body}</p>                
        </PostItemBlock>
    )
}

const PostList = ({ posts, error, loading, showWriteButton }) => {

    if(error) {
        return <PostListBlock>Error Occurs!</PostListBlock>
    }
    return (
        <Responsive>
            <PostListBlock>
                <WritePostButtonWrapper>
                    {
                        showWriteButton &&
                        <Button cyan to="/write">WRITE</Button>
                    }
                </WritePostButtonWrapper>
                {
                    !loading && posts && (
                        <div>
                            {
                                posts.map(post => (
                                    <PostItem post={post} key={post._id} />
                                ))
                            }
                        </div>
                    )
                }
            </PostListBlock>
        </Responsive>
    )
}

export default PostList
