const { insert,getEvents  }=require("../controller/eventController");
const { Router }=require("express");
const eventRouter = Router();
eventRouter.post("/insert",insert);
eventRouter.get("/fetch",getEvents);
module.exports=  eventRouter;
