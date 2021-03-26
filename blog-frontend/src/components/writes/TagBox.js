import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import palette from '../../lib/styles/palette'

const TabBoxBlock = styled.div`
    width: 100%; 
    border-top: 1px solid ${palette.gray[2]};
    padding-top: 2rem;
    h4 {
        color: ${palette.gray[8]};
        margin-top: 0; 
        margin-bottom: 0.5rem;
    }
`

const TagForm = styled.form`
    borde-radius: 4px; 
    overflow: hidden; 
    display: flex; 
    width: 256px; 
    border: 1px solid ${palette.gray[9]};
    input,
    button {
        outline: none; 
        border: none; 
        font-size: 1rem;
    }
    input {
        padding: 0.5rem;
        flex: 1; 
        min-width: 0; 
    }
    button {
        cursor: pointer; 
        padding: 0 1rem; 
        border: none; 
        background: ${palette.gray[8]};
        color: white; 
        font-weight: bold; 
        &:hover {
            background: ${palette.gray[6]};
        }
    }
`

const Tag = styled.div`
    margin-right: 0.5rem;
    color: ${palette.gray[6]};
    cursor: pointer; 
    &:hover {
        opacity: 0.5;
    }
`

const TagListBlock = styled.div`
    display: flex; 
    margin-top: 0.5rem;
`

// 태그값이 바뀔때만 리렌더링
const TagItem = React.memo(({tag, onRemove}) => <Tag onClick={() => onRemove(tag)}>#{tag}</Tag>)
const TagList = React.memo(({tags, onRemove}) => (
    <TagListBlock>
        {
            tags &&
            tags.map(tag => (
                <TagItem key={tag} tag={tag} onRemove={onRemove} />
            ))
        }
    </TagListBlock>
))

const TagBox = ({tags, onChangeTags}) => {
    const [input, setInput] = useState('');
    const [localTags, setLocalTags] = useState([]); // 존재하는 태그 목록

    const insertTag = useCallback(
        tag => {
            if(!tag) return ; // 공백이면 추가하지 않음 
            if(localTags.includes(tag)) return;
            const nextTags = [...localTags, tag];
            // local 과 state 를 분리하는 이유는 태그 삭제후 글 등록 취소시 반영되지 않게 하기위함!
            setLocalTags(nextTags); 
            onChangeTags(nextTags);
        }, [localTags,  onChangeTags]
    )

    const onRemove = useCallback(
        tag => {
            const nextTags = localTags.filter(t => t !== tag);
            setLocalTags(nextTags);
            onChangeTags(nextTags);
        }, [localTags, onChangeTags]
    )

    const onChange = useCallback(e => {
        setInput(e.target.value);
    }, [])

    const onSubmit = useCallback(e => {
        e.preventDefault();
        insertTag(input.trim());
        setInput('');
    }, [input, insertTag])

    useEffect(() => {
        setLocalTags(tags)
    }, [tags])


    return (
        <TabBoxBlock>
            <h4>태그</h4>
            <TagForm onSubmit={onSubmit}>
                <input type="text" placeholder="write tag" value={input} onChange={onChange} />
                <button type="submit" >ADD</button>
            </TagForm>
            <TagList tags={localTags} onRemove={onRemove} />
        </TabBoxBlock>
    )
}

export default TagBox
