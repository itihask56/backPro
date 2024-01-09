const asyncHandler = (requestHandler)=>{

    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((err)=>next(err))
    }

}
export {asyncHandler}


//Higher order function
// const asyncHnadler = ()=>{}
// const asyncHandler = (fun)=>{}
// const asyncHandler = (fun)=>{()=>{}}
// const asyncHandler = (fun)=>()=>{}


//This code is for trycatch asyncHandler function
// const asyncHandler = (fun)=>async (req, res, next)=>{
//     try {
//         await fun(req,res,next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success:false,
//             message:err.message
//         })
//     }
// }