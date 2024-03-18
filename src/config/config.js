const dotenv=require("dotenv")
dotenv.config();
const config={
    env:{
        app:{
            port:process.env.PORT
        },
        database:{
            mongoURL:process.env.MONGO_URL || ""
        },
        jwt:{
            secret:process.env.JWT_SECRET,
            expiresIn:process.env.JWT_EXPIRES_IN || ""
        }
    }
}
module.exports={config};