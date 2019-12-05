var express = require('express');
var Board = require('../models/board');
var mongoose = require('mongoose');


const router = express.Router();
/*
 *  화살표 함수
 *  function 키워드로 생성한 일반 함수와 화살표 함수의 큰 차이점은 this 이다.
 *  this에 바인딩할 객체가 정적으로 결정되는 것이 아니고, 함수를 호출할 때 함수가 어떻게
 *  호출 되었는지에 따라서 this에 바인딩할 객체가 동적으로 결정
 *  콜백 함수 내부의 this는 전역 객체 windoe를 가르킨다.

*/
router.post('/', (req,res) => {

  //세션확인 (로그인 여부)
  if(typeof req.session.loginInfo === 'undefined'){
    return res.status(403).json({
      error: "NOT LOGGED IN",
      code: 1
    });
  }
  console.log(req.session.loginInfo);
  // 입력받은 콘텐츠가 비어있는 경우
  if(typeof req.body.contents !== 'string'){
    return res.status(400).json({
      error: "CONTENTS IS NOT STRING",
      code: 2
    });
  }
  // 입력받은 콘텐츠가 비어있는 경우
  if(req.body.contents === "") {
    return res.status(400).json({
      error: "EMPTY CONTENTS",
      code: 3
    });
  }

  let board = new Board({
    writer: req.session.loginInfo.username,
    contents: req.body.contents
  });

  board.save( err => {
    if(err) throw err;
    return res.json({ success: true });
  });
  
});



router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.get('/', (req, res)=> {


  Board.find()
    .sort({"_id": -1}) //1 오름차순 -1 내림차순
    .limit(6)// 무한 스크롤링 구현하는데, 그 단위가 6개
    .exec((err, boards) => { //find().exec()  쿼리를 프로미스를 만들기 위해 붙이는 메소드
      if(err) 
        throw err;
      console.log(boards)
      res.json(boards);
    })
});

//export default router;
module.exports = router;