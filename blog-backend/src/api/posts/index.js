import Router from 'koa-router';
import * as postCtrl from './posts.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn'

const posts = new Router();

posts.get('/', postCtrl.list)
posts.post('/', checkLoggedIn, postCtrl.write); // 쓰기, 수정에는 권한 체크 middleware 적용

// 권한이 필요한 라우터들은 미들웨어 적용
const post = new Router();
post.get('/', postCtrl.read)
post.delete('/', checkLoggedIn, postCtrl.checkOwnPost, postCtrl.remove)
post.patch('/', checkLoggedIn, postCtrl.checkOwnPost, postCtrl.update)
posts.use('/:id', postCtrl.getPostById, post.routes());

export default posts;