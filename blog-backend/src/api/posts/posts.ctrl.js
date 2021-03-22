import Post from '../../models/post'
import mongoose from 'mongoose'
import Joi from 'joi'

const { ObjectId } = mongoose.Types;

// export const checkObjectId = (ctx, next) => {  // 권한 확인을 위한 미들웨어 
//     const { id } = ctx.params; 
//     if(!ObjectId.isValid(id)){
//         ctx.status = 400; 
//         return; 
//     }
//     return next();
// }

export const getPostById = async (ctx, next) => {
    const { id } = ctx.params;
    console.log(">> id : ", id);
    if(!ObjectId.isValid(id)) {
        ctx.status = 400; // Bad Request
        return;
    }

    try {
        const post = await Post.findById(id);
        if(!post) {
            ctx.status = 404; 
            return;
        }
        ctx.state.post = post;
        return next();
    } catch(e) {
        ctx.throw(500, e)
    }
}

export const write = async ctx => {
    const schema = Joi.object().keys({
        title: Joi.string().required(),  // required() 는 필수 항목 체크 
        body: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required()
    })
    const result = schema.validate(ctx.request.body);
    if(result.error) {
        ctx.status = 400; 
        ctx.body = result.error;
        return;
    }

    const { title, body, tags } = ctx.request.body;
    const post = new Post({
        title,
        body,
        tags,
        user: ctx.state.user
    })

    try {
        await post.save(); // save() DB에 저장 
        ctx.body = post; 
    } catch(e) {
        ctx.throw(500, e)
    }
}

/*
    GET  /api/posts?username=&tag=&page=
*/
export const list = async ctx => {
    const page = parseInt(ctx.query.page || '1', 10); 
    if(page < 1) {
        ctx.status = 400;
        return; 
    }
    const { tag, username } = ctx.query;
    // tag, username  값이 유효하면 객체안에 넣고 그렇지 않으면 넣지 않음
    const query = {
        ...(username ? { 'user.username' : username }: {}),
        ...(tag ? {tags: tag}: {})
    }

    try {
        // const posts = await Post.find().exec();
        // const posts = await Post.find().sort({_id: -1}).exec(); //  순서정렬을 위해 exec 이전에 정렬을 함
        const posts = await Post.find(query).sort({_id: -1}).limit(10).skip((page - 1) * 10).exec(); // 페이징 추가
        // 마지막 번호 알려주기
        const postCount = await Post.countDocuments(query).exec();
        ctx.set('Last-Page', Math.ceil(postCount / 10));
        ctx.body = posts
        .map(post => post.toJSON())
        .map(post => ({
            ...post,
            body: post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`
        }));
    } catch(e) {
        ctx.throw(500, e);
    }
}

// export const read = async ctx => {
//     const { id } = ctx.params;
//     try {
//         const post = await Post.findById(id).exec();
//         if(!post) {
//             ctx.status = 404;
//             return;
//         }
//         ctx.body = post;
//     } catch(e) {
//         ctx.throw(500, e);
//     }
// }

export const read = ctx => {
    ctx.body = ctx.state.post; 
}

export const checkOwnPost = (ctx, next) => {
    const { user, post } = ctx.state; 
    if(post.user._id.toString() !== user._id) {
        ctx.status = 403;
        return;
    }
    return next();
}

export const remove = async ctx => {
    const { id } = ctx.params;
    try {
        await Post.findByIdAndRemove(id).exec();
        ctx.status = 204; 
    } catch(e) {
        ctx.throw(500, e)
    }
}

export const update = async ctx => {
    const { id } = ctx.params;

    const schema = Joi.object().keys({
        title: Joi.string(), 
        body: Joi.string(),
        tags: Joi.array().items(Joi.string())
    })
    const result = schema.validate(ctx.request.body);
    if(result.error) {
        ctx.status = 400; 
        ctx.body = result.error;
        return;
    }
    
    
    try {
        const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
            new: true  // true면 업데이트 이후의 데이터 반환 false 면 업데이트 전의 데이터 반환
        }).exec()
        if(!post) {
            ctx.statu = 404;
            return;
        }
        ctx.body = post;
    } catch(e) {
        ctx.throw(500, e)
    }
}

// let postId = 1; 

// const posts = [
//     {
//         id: 1,
//         title: 'Title',
//         body: 'Content'
//     }   
// ]

// /* Write :: POST /api/posts  { param: title, body } */
// export const write = ctx => {
//     const { title, body } = ctx.request.body;
//     postId +=1;
//     const post = { id: postId, title, body }
//     posts.push(post);
//     ctx.body = post; 
// }

// /* Get List :: GET /api/posts  { param: None } */
// export const list = ctx => {
//     ctx.body = posts; 
// }

// /* Get Item :: GET /api/posts/:id  */
// export const read = ctx => {
//     const { id } = ctx.params;
//     const post = posts.find(p => p.id.toString() === id);
//     if(!post) {
//         ctx.status = 404;
//         ctx.body = {
//             message: "No Post Result"
//         }
//         return 
//     }
//     ctx.body = post; 
// }

// /* Delete Item :: GET /api/posts/:id  */
// export const remove = ctx => {
//     const { id } = ctx.params;
//     // 전체 목록에서 해당 아이디를 가진 게시글의 순번 조회 
//     const index = posts.findIndex(p => p.id.toString() === id);
//     if(index === -1) {
//         ctx.status = 404;
//         ctx.body = {
//             message: "No Post Result"
//         }
//         return;
//     }
//     posts.splice(index, 1);
//     ctx.status = 204; // No Content 
// }

// /* Replace Item :: GET /api/posts/:id { param: title, body }*/
// export const replace = ctx => {
//     const { id } = ctx.params;
//     // 전체 목록에서 해당 아이디를 가진 게시글의 순번 조회 
//     const index = posts.findIndex(p => p.id.toString() === id);
//     if(index === -1) {
//         ctx.status = 404;
//         ctx.body = {
//             message: "No Post Result"
//         }
//         return;
//     }
    
//     posts[index] = {
//         id,
//         ...ctx.request.body
//     }
//     ctx.body = posts[index];
// }

// /* Update Item :: GET /api/posts/:id { param: title, body }*/
// export const update = ctx => {
//     const { id } = ctx.params;
//     // 전체 목록에서 해당 아이디를 가진 게시글의 순번 조회 
//     const index = posts.findIndex(p => p.id.toString() === id);
//     if(index === -1) {
//         ctx.status = 404;
//         ctx.body = {
//             message: "No Post Result"
//         }
//         return;
//     }
    
//     posts[index] = {
//         ...posts[index],
//         ...ctx.request.body
//     }
//     ctx.body = posts[index];
// }