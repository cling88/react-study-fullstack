import Joi from 'joi'
import User from '../../models/user'

/*
POST /api/auth/register
{
    username: test
    passrod: test123
}
*/


// 회원가입
export const register = async ctx => {
    // Request body 검증 
    const schema = Joi.object().keys({
        username: Joi.string().alphanum().min(3).max(20).required(),
        password: Joi.string().required()
    })
    const result = schema.validate(ctx.request.body);
    if(result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }
    const { username, password } = ctx.request.body;
    try {
        // username 이 이미 존재하는지 확인
        const exist = await User.findByUsername(username);
        if(exist) {
            ctx.status = 409; // Conflict
            return; 
        }   
        const user = new User({
            username
        })
        await user.setPassword(password);
        await user.save(); // DB에 저장
        
        ctx.body = user.serialized();

        const token = user.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
            httpOnly: true
        })
    } catch(e) {
        ctx.throw(500, e)
    }
}

// 로그인
export const login = async ctx => {
    const { username, password } = ctx.request.body;
    // username, password 가 없으면 에러 처리
    if(!username || !password) {
        ctx.status = 401; // Unauthorized
        return;
    }
    try {
        const user = await User.findByUsername(username);
        // 아이디체크
        if(!user) {
            ctx.status = 401; 
            return; 
        }
        const valid = await user.checkPassword(password);
        // 비번체크
        if(!valid){
            ctx.status = 401;
            return;
        }
        ctx.body = user.serialized();
        const token = user.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true
        })
    } catch(e) { 
        ctx.throw(500, e)
    }
}

// 로그인 상태 확인
export const check = async ctx => {
    const { user } = ctx.state;
    if(!user) {
        ctx.status = 401;
        return;
    }
    ctx.body = user;
}

// 로그아웃 
export const logout = async ctx => {
    ctx.cookies.set('access_token');
    ctx.status = 204; // No Content
}