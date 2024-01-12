// require('dotenv').config({path:'./env'})

import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./env",
});
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
    //     app.on("error",(error)=>{
    //         console.log("ERROR:",error)
    //         throw error
    //    })
  })
  .catch((err) => {
    console.log("MONGODB connection failed !!!", err);
  });

/*import express from "express"

const app = express()
//immediatly invoked function (()=>{})
;(async()=>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       app.on("error",(error)=>{
            console.log("ERROR:",error)
            throw error
       })

       app.listen(process.evn.PORT,()=>{
             console.log(`App is listening on port ${process.env.PORT}`)
       })
        
    } catch (error) {
        console.error("ERROR",error)
        throw err
    }
})()

*/
