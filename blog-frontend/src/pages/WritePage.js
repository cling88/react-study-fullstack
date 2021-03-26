import React from 'react'
// import Editor from '../components/writes/Editor'
import EditorContainer from '../containers/write/EditorContainer'
import Responsive from '../components/common/Responsive'
// import TagBox from '../components/writes/TagBox'
import TagContainer from '../containers/write/TagContainer'
import WriteActionButtonContainer from '../containers/write/WriteActionButtonContainer'
import { Helmet } from 'react-helmet-async'

function WritePage() {
    return (
        <Responsive>
            <Helmet>
                <title>글 작성하기 - REACTERS</title>
            </Helmet>
            <EditorContainer/>
            <TagContainer/>
            <WriteActionButtonContainer/>
        </Responsive>
    )
}

export default WritePage
