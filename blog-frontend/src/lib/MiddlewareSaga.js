import { call, put } from 'redux-saga/effects'
import { startLoading, finishLoading } from '../redux/loading'

export const createRequestActionTypes = type => {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    return [type, SUCCESS, FAILURE];
}

export default function MiddlewareSaga(type, request) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return function*(action) {
        yield put(startLoading(type));  // start loading 
        try {
            const response = yield call(request, action.payload);
            yield put({
                type: SUCCESS,
                payload: response.data,
                meta: response // pagination 때문에 추가 - 헤더에 정보 추가 
            })
        }catch(e) {
            yield put({
                type: FAILURE,
                payload: e,
                error: true,
            })
        }
        yield put(finishLoading(type)); // finish loading
    }
}

