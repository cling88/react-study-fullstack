/*
INSTALL
- yarn init -y
- yarn add koa
- yarn add koa-router 
- yarn add koa-bodyparser  // POST/PUT/PATCH 같은 메서드의 Body에 JSON 형식으로 데이터를 파싱 가능하게 도와줌 

DB
- yarn add mongoose dotenv 

ETC
- yarn add --dev nodemon

*/
require('dotenv').config();
const koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose')

const { PORT, MONGO_URI } = process.env;
const api = require('./api')

const app = new koa();
const router = new Router();

// DB
mongoose.connect("mongodb+srv://cling88:cling88@blog.zyxrr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB!");
}).catch(e => {
    console.log("Error: ", e);
})


// 라우터 설정
router.use('/api', api.routes()); // api  라우트 적용

// 😉 app 인스턴스에 적용전에 bodyParser를 적용해줌
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods()); // app 인스턴스에 라우터 적용

const port = PORT || 4000;
app.listen(port, () => {
    console.log(`port ${port} listening 111`)
})
