const { login,register }=require("../controller/userController");
const { Router } =require("express");
const userRouter = Router();
userRouter.post("/register",register);
userRouter.post("/login",login);
module.exports= userRouter;
