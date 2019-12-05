var express = require('express');
var Account = require('../models/account');
var bkfd2Password = require('pbkdf2-password');


const router = express.Router();
const hasher = bkfd2Password();

/*
    ACCOUNT SIGNUP: POST /api/account/signup
    BODY SAMPLE: { "username": "test", "password": "test" }
    ERROR CODES:
        1: BAD USERNAME
        2: BAD PASSWORD
        3: USERNAM EXISTS
*/

router.post('/signup', (req, res) => {
//  res.json({success:true});

  let usernameRegex = /^[a-z0-9]+$/;

  if(!usernameRegex.test(req.body.username)){
    return res.status(400).json({
      error: "BAD USERNAME",
      code: 1
    });
  }

  if(req.body.password.length < 4 || typeof req.body.password !== "string"){
    return res.status(400).json({
      error: "BAD PASSWORD",
      code: 2
    });
  }
  /*
  Account.find({}).sort().exec(function(err,data) {
    if(err)
      throw err;
    
      data.forEach(element => {
        console.log(element); 
     });
  })*/
  Account.findOne({username: req.body.username}, (err, exists) => {
    if(err) 
      throw err;
    if(exists){
      return res.status(409).json({
        error: "USERNAME EXISTS",
        code: 3
      });
    }

    //create account
    hasher({password:req.body.password}, (err, pass, salt, hash) => {
      let account = new Account({
        username: req.body.username,
        password: hash,
        salt: salt
      });

      account.save(err => {
        if(err) throw err;
        
        return res.json({success: true})
      })
    });
  })
});
/*
    ACCOUNT SIGNIN: POST /api/account/signin
    BODY SAMPLE: { "username": "test", "password": "test" }
    ERROR CODES:
        1: PASSWORD IS NOT STRING
        2: THERE IS NO USER
        3: PASSWORD IS NOT CORRECT
*/
router.post('/signin', (req, res) => {
  //res.json({success: true});

  if(typeof req.body.password !== "string"){
    return res.status(401).json({
      error: "PASSWORD IS NOT STRING",
      code: 1
    });
  }

  Account.findOne({username: req.body.username}, (err, account) => {
    
    if(err) 
      throw err;

    if(!account)  {
      //HTTP status 401 은 권한 없음을 의미. (권한 없음, 인증 안 됨)
      return res.status(401).json({
        error: "THERE IS NO USER",
        code: 2
      });
    } 
    /*
console.log(req.body.password)
console.log(account.salt)*/
// 유저검색 결과가 있으면 검사 salt값으로 해쉬
    const validate = hasher({ password: req.body.password, 
                              salt: account.salt }, function (err, pass, salt, hash) {
     // 입력한 비밀번호를 이용해 만든 해쉬와 DB에 저장된 비밀번호가 같을 경우                           
      if( hash === account.password ){
        let session = req.session;

        session.loginInfo = {
          _id: account._id,
          username: account.username
        };
        
        return res.json({
          success: true
        });
      }
      else {
        return res.status(401).json({
          error: "PASSWORD IS NOT CORRECT",
          code: 3
        });
      }
    });
  });
});

router.get('/getinfo', (req, res) => {
  //res.json({info: null})

  if(typeof req.session.loginInfo === "undefined"){
    return res.status(401).json({
      error: "THERE IS NO LOGIN DATA",
      code: 1
    })
  }
  res.json({ info: req.session.loginInfo });
});

router.post('/logout',(req, res) => {
//  return res.json({ success: true });
//req.session.destroy() 메소드를 이용하면 세션을 파괴할 수 있습니다.
  req.session.destroy(err => { 
    if(err) throw err;
  });

  return res.json({success: true})
});


module.exports = router;