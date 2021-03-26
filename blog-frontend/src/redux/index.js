import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'
import auth, { authSaga } from './auth'
import user, { userSaga } from './user'
import loading from './loading'
import write, { writeSaga } from './write'
import post, { postSaga } from './post'
import posts, { postsSaga } from './posts'


const rootReducer = combineReducers({
    auth,
    user,
    write,
    post,
    posts,
    loading
});

export function* rootSaga(){
    yield all([authSaga(), userSaga(), writeSaga(), postSaga(), postsSaga()])
}

export default rootReducer