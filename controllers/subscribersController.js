// controllers/subscribersController.js
"use strict";

/**
 * @TODO:
 * Listing 16.4 (p. 230-231)
 * 구독자를 위한 컨트롤러 액션 정의
 *
 * ========================================
 * 모든 함수가 JS프로미스를 반환하도록 생성
 * ========================================
 */

// 구독자 모델 요청
const Subscriber = require("../models/Subscriber");

// 구독자 가져오기
exports.getAllSubscribers = (req, res, next) => {
  Subscriber.find({})
  .exec()
  .then(Subscribers => {
    console.log("Found: ", Subscribers);
    res.render("subscribers", {
      Subscribers: Subscribers
    });
  })
  .catch(error => {
    console.log(`Error: ${error.message}`);
    return next(error);
  });
};

// 구독 페이지 레더링
exports.getSubscriptionPage = (req, res) => {
  res.render("contact");
};

// 구독자 저장
exports.saveSubscriber = (req, res) => {
  let newSubscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.newsletter,
    profileImg: req.body.profileImg
  });


  console.log(req.body.newsletter);

  newSubscriber
    .save()
    .then(result => {
      res.render("thanks");
    })
    .catch(error => {
      res.send(error);
    });
};

exports.deleteAllSubscribers = (req, res) => {
  Subscriber.deleteMany({})
  .exec()
  .then(result => {
    res.render("subscribers", {
      subscriber: []
    });
  })
  .catch(error => {
    console.log(`Error: ${error.message}`);
    return next(error);
  })
};
