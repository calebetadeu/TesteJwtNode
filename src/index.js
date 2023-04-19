

const jwt = require('jsonwebtoken');
const express = require('express');

const app = express();

const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized Access',
    });
  }

  try {
    const jwtToken = token.split(" ")[1];
    const verified = jwt.verify(jwtToken, 'secret');
    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).json({
      message: 'Invalid token',
    });
  }
};



router.post('/createNewToken',(req,res)=>{
    const token  = jwt.sign({
        data:"someIdentifierData"
    },'secret',{expiresIn:60})
    res.status(201).json({
        "message": "Token created successfully",
        "token": token
    })
});
router.get('/getSomeData',verifyToken,(req,res)=>{
    res.status(200).json({
        "message": "Data fetched",
        "data":"some data returned from server"
    })
})


app.get('/', (req, res) => {
    res.json({
        'message': "Server Running"
    })
})
app.use('/api',router)
 const port = 3000
//
 app.listen(port,()=>{
    console.log(`Server running at port ${port}`)
 })
 