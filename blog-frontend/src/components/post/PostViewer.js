import React, { useEffect } from 'react'
import styled from 'styled-components'
import palette from '../../lib/styles/palette'
import Responsive from '../../components/common/Responsive'
import SubInfo from '../../components/common/SubInfo'
import Tags from '../../components/common/Tags'


const PostViewerBlock = styled(Responsive)`
    margin-top: 4rem;
`

const PostHead = styled.div`
    border-bottom: 1px solid ${palette.gray[2]};
    margin-bottom: 3rem;
    padding-bottom: 3rem;
    h1 {
        font-size: 3rem;
        line-height: 1.5; 
        margin: 0; 
    }
`
const PostContent = styled.div`
    font-size: 1.3125rem;
    color: ${palette.gray[8]};
`


const PostViewer = ({post, loading, error, actionButtons}) => {
    if(error) {
        if(error.response && error.response.status === 404) {
            return <PostViewerBlock>No Post exist</PostViewerBlock>
        }
        return <PostViewerBlock>Error!</PostViewerBlock>
    }

    if(loading || !post) {
        return null;
    }

    const { title, body, tags, user, publishedDate } = post; 

    return (
        <PostViewerBlock>
            <PostHead>
                <h1>{title}</h1>
                <SubInfo username={user.username} publishedDate={publishedDate} />
                <Tags tags={tags} />
            </PostHead>
            {actionButtons}
            <PostContent 
                dangerouslySetInnerHTML={{__html: body}}
            />
        </PostViewerBlock>
    )
}

export default PostViewer
