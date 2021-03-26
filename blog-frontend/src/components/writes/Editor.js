import React, { useRef, useEffect } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.bubble.css'
import styled from 'styled-components'
import palette from '../../lib/styles/palette'
import Responsive from '../../components/common/Responsive'

const EditorBlock = styled(Responsive)`
    padding-top: 5rem;
    padding-bottom: 5rem;
`

const TitleInput = styled.input`
    font-size: 3rem; 
    outline: none; 
    padding-bottom: 0.5rem;
    border: none; 
    border-bottom: 1px solid ${palette.gray[4]};
    margin-bottom: 2rem;
    width: 100%;
`

const QuillWrapper = styled.div`
    .ql-editor {
        padding: 0; 
        min-height: 320px; 
        font-size: 1.125rem;
        line-height: 1.5; 
    }
    .ql-editor.ql-blank:before {
        left: 0px; 
    }
`

const Editor = ({ title, body, onChangeField }) => {

    const quillElement = useRef(null);
    const quillInstance = useRef(null);

    useEffect(() => {
        quillInstance.current = new Quill(quillElement.current, {
            theme: 'bubble',
            placeholder: 'Write something...',
            modules: {
                toolbar: [
                    [{header: '1'}, {header: '2'}],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{list: 'ordered'}, {list: 'bullet'}],
                    ['blockquote', 'code-block', 'link', 'image']
                ]
            }
        })
        // quill text-change 이벤트 핸들러 등록 (https://quilljs.com/docs/api/#events)
        const quill = quillInstance.current;
        quill.on('text-change', (delat, oldDelta, source) => {
            if(source === 'user') {
                onChangeField({ key: 'body', value:quill.root.innerHTML })
            }
        });
    }, [onChangeField])

    // 수정할때 내용 렌더
    const mounted = useRef(false);
    useEffect(() => {
        if(mounted.current) return;
        mounted.current = true;
        quillInstance.current.root.innerHTML = body; 
    }, [body])

    const onChangeTitle = e => {
        onChangeField({key: 'title', value: e.target.value})
    }

    return (
        <EditorBlock>
            <TitleInput placeholder="write title" onChange={onChangeTitle} value={title} />
            <QuillWrapper>
                <div ref={quillElement}></div>
            </QuillWrapper>
        </EditorBlock>
    )
}

export default Editor
