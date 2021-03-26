import { createAction, handleActions } from 'redux-actions'
import MiddlewareSaga, {createRequestActionTypes} from '../lib/MiddlewareSaga'
import * as postAPI from '../lib/api/posts'
import { takeLatest } from 'redux-saga/effects'

const [READ_POST, READ_POST_SUCCESS, READ_POST_FAILURE] = createRequestActionTypes('post/READ_POST');
const UNLOAD_POST = 'post/UNLOAD_POST';  // 포스트 페이지에서 나갈떄 데이터 비우기 

export const readPost = createAction(READ_POST, id => id);
export const unloadPost = createAction(UNLOAD_POST);

const readPostSaga = MiddlewareSaga(READ_POST, postAPI.readPost);
export function* postSaga() {
    yield takeLatest(READ_POST, readPostSaga)
}

const initialState = {
    post: null,
    error: null
}

const post = handleActions({
    [READ_POST_SUCCESS]: (state, {payload: post}) => ({
        ...state,
        post
    }),
    [READ_POST_FAILURE]: (state, {payload: error}) => ({
        ...state,
        error
    }),
    [UNLOAD_POST]: () => initialState
}, initialState)

export default post