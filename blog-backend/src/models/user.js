import  mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Post from './post'

const UserSchema = new Schema({
    username: String,
    hashedPassword: String, 
})


// this에 접근하기 위해 화살표 함수를 쓰지않고 function 함수를 써야함 
UserSchema.methods.setPassword = async function(password) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
}

UserSchema.methods.checkPassword = async function(password) {
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result; // true | false
}

// static 함수에서 this 는 model 을 가리킴 ( 여기서는 User model)
UserSchema.statics.findByUsername = function(username) {
    return this.findOne({username});
}

UserSchema.methods.serialized = function(){
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
}

// token 생성
UserSchema.methods.generateToken = function(){
    const token = jwt.sign({
        _id: this.id,
        username: this.username
    }, 
    process.env.JWT_SECRET, {
        expiresIn: '3d' // 7일동안 유효
    })
    return token;
}

const User = mongoose.model('User', UserSchema);
export default User;
