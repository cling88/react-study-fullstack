/*
INSTALL
- yarn init -y
- yarn add koa
- yarn add koa-router 
- yarn add koa-bodyparser  // POST/PUT/PATCH 같은 메서드의 Body에 JSON 형식으로 데이터를 파싱 가능하게 도와줌 

DB
- yarn add mongoose dotenv 

Authorized
- yarn add bcrypt // 암호화 
- yarn add jsonwebtoken // jwt 

ETC
- yarn add --dev nodemon
- yarn add esm   // import, export 를 사용하도록 도와줌 (아직 실험적 단계)
- yarn add joi   // 스키마의 유효성 검증 


*/

require('dotenv').config();
// const koa = require('koa');
// const Router = require('koa-router');
// const bodyParser = require('koa-bodyparser');
// const mongoose = require('mongoose')
import koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import mongoose from 'mongoose'

const { PORT, MONGO_URI } = process.env;
import api from './api'
import jwtMiddleware from './lib/jwtMiddleware'

const app = new koa();
const router = new Router();

// DB
mongoose.connect(MONGO_URI, {
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
app.use(jwtMiddleware)

app.use(router.routes()).use(router.allowedMethods()); // app 인스턴스에 라우터 적용

const port = PORT || 4000;
app.listen(port, () => {
    console.log(`port ${port} listening 111`)
})
