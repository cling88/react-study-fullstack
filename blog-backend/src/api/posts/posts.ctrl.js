let postId = 1; 

const posts = [
    {
        id: 1,
        title: 'Title',
        body: 'Content'
    }   
]

/* Write :: POST /api/posts  { param: title, body } */
exports.write = ctx => {
    const { title, body } = ctx.request.body;
    postId +=1;
    const post = { id: postId, title, body }
    posts.push(post);
    ctx.body = post; 
}

/* Get List :: GET /api/posts  { param: None } */
exports.list = ctx => {
    ctx.body = posts; 
}

/* Get Item :: GET /api/posts/:id  */
exports.read = ctx => {
    const { id } = ctx.params;
    const post = posts.find(p => p.id.toString() === id);
    if(!post) {
        ctx.status = 404;
        ctx.body = {
            message: "No Post Result"
        }
        return 
    }
    ctx.body = post; 
}

/* Delete Item :: GET /api/posts/:id  */
exports.remove = ctx => {
    const { id } = ctx.params;
    // 전체 목록에서 해당 아이디를 가진 게시글의 순번 조회 
    const index = posts.findIndex(p => p.id.toString() === id);
    if(index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: "No Post Result"
        }
        return;
    }
    posts.splice(index, 1);
    ctx.status = 204; // No Content 
}

/* Replace Item :: GET /api/posts/:id { param: title, body }*/
exports.replace = ctx => {
    const { id } = ctx.params;
    // 전체 목록에서 해당 아이디를 가진 게시글의 순번 조회 
    const index = posts.findIndex(p => p.id.toString() === id);
    if(index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: "No Post Result"
        }
        return;
    }
    
    posts[index] = {
        id,
        ...ctx.request.body
    }
    ctx.body = posts[index];
}

/* Update Item :: GET /api/posts/:id { param: title, body }*/
exports.update = ctx => {
    const { id } = ctx.params;
    // 전체 목록에서 해당 아이디를 가진 게시글의 순번 조회 
    const index = posts.findIndex(p => p.id.toString() === id);
    if(index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: "No Post Result"
        }
        return;
    }
    
    posts[index] = {
        ...posts[index],
        ...ctx.request.body
    }
    ctx.body = posts[index];
}