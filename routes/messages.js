const express = require('express');
const router = express.Router({ mergeParams: true });
const db = require('../models');

router.get('/', function (req, res, next) {
  db.Message.find()
    .then(function (messages) {
      res.send(messages);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
});

router.get('/:m_id', function (req, res) {
  db.Message.findById(req.params.m_id)
    .then(function (message) {
      res.send(message);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
});

router.post('/', function (req, res, next) {
  let newMessage = new db.Message(req.body);
  newMessage.save()
    .then(function () {
      res.send(newMessage);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
});

router.patch('/:m_id', function (req, res, next) {
  db.Message.findByIdAndUpdate(req.params.m_id, req.body)
    .then(function (message) {
      res.send('updated!');
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
});

router.delete('/:m_id', function (req, res, next) {
  db.Message.findByIdAndRemove(req.params.m_id)
    .then(function (message) {
      res.send('deleted!');
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
});

module.exports = router;
