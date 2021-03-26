import { createAction, handleActions } from 'redux-actions'
import MiddlewareSaga, { createRequestActionTypes } from '../lib/MiddlewareSaga'
import * as postsAPI from '../lib/api/posts'
import { takeLatest } from 'redux-saga/effects'
import post from './post';

const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD';
const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST';  // 수정시 기본 내용 가져오기
const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] = createRequestActionTypes('write/WRITE_POST')
const [UPDATE_POST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE] = createRequestActionTypes('write/UPDATE_POST') // 수정

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({key, value}) => ({
    key,
    value
}))
export const writePost = createAction(WRITE_POST, ({title, body, tags}) => ({
    title,
    body,
    tags
}))
export const setOriginalPost = createAction(SET_ORIGINAL_POST, post => post);
export const updatePost = createAction(UPDATE_POST, ({id, title, body, tags}) => ({
    id, 
    title, 
    body, 
    tags
}))


// saga
const writePostSaga = MiddlewareSaga(WRITE_POST, postsAPI.writePost);
const updatePostSaga = MiddlewareSaga(UPDATE_POST, postsAPI.updatePosts);
export function* writeSaga() {
    yield takeLatest(WRITE_POST, writePostSaga);
    yield takeLatest(UPDATE_POST, updatePostSaga);
}

const initialState = {
    title: '',
    body: '',
    tags: [],
    post: null,
    postError: null,
    originalPostId: post._id
}

const write = handleActions({
    [INITIALIZE]: state => initialState,
    [CHANGE_FIELD]: (state, {payload: {key, value}}) => ({
        ...state,
        [key]: value
    }),
    [WRITE_POST]: state => ({
        ...state,
        post: null,
        postError: null
    }),
    [WRITE_POST_SUCCESS] : (state, {payload: post}) => ({
        ...state,
        post
    }),
    [WRITE_POST_FAILURE]: (state, {payload: postError}) => ({
        ...state,
        postError
    }),
    [SET_ORIGINAL_POST]: (state, {payload: post}) => ({
        ...state,
        title: post.title,
        body: post.body,
        tags: post.tags,
        originalPostId: post._id
    }),
    [UPDATE_POST_SUCCESS]: (state, {payload: post}) => ({
        ...state,
        post
    }),
    [UPDATE_POST_FAILURE]: (state, {payload: postError}) => ({
        ...state,
        postError
    })
}, initialState);

export default write; 