import bcrpyt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const SALT = 10



const createHash = async(data)=>{
  //to create the salt 
  let salt = await bcrpyt.genSalt(SALT)
  //to hash the password
  let hash =await bcrpyt.hash(data,salt)
  return hash
}

const hashCompare = async(data,hash)=>{
  return await bcrpyt.compare(data,hash)
  
}

const createToken = async(payload)=>{
  let token = await jwt.sign(payload,process.env.JWT_SECRET,{
      expiresIn:process.env.JWT_EXPRIY
  })
  return token
}

const decodeToken = async(token)=>{

  return await jwt.decode(token)

}

//Write medel where fuction
const autheticate = async(req,res,next)=>{

  let token = req?.headers?.authorization?.split(" ")[1]

   if(token)
    {
      let payload = await decodeToken(token)
      let currentTime = +new Date()
      if(Math.floor(currentTime/1000)<payload.exp)
        {
          next()
        }
        else{
          res.status(402).send({
            message:"Session  expriy"
          })
        }
     
    }else{   
      res.status(402).send({
        message:"unauthrised asucces"
      })
    
    }

}
 
const adminGard = async(req,res,next)=>{

  let token = req?.headers?.authorization?.split(" ")[1]

   if(token)
    {
      let payload = await decodeToken(token)
  
      if(payload.role==="admin")
        {
          next()
        }
        else{
          res.status(402).send({
            message:"only Admin are Allowed"
          })
        }
     
    }else{   
      res.status(402).send({
        message:"unauthrised asucces"
      })
    
    }

}




export default{
  createHash,
  hashCompare,
  createToken,
  autheticate,
  adminGard

}