import React from 'react'
import HeaderContainer from '../containers/common/HeaderContainer'
import PostListContainer from '../containers/post/PostListContainer'
import PaginationContainer from '../containers/post/PaginationContainer'

function PostListPage() {
    return (
        <div>
            <HeaderContainer/>
            <PostListContainer/>
            <PaginationContainer/>
        </div>
    )
}

export default PostListPage
