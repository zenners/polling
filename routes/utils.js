var express = require('express');
var Log = require('../models/logs');

function saveLogDetails(userID, action){
  const data = { userID, action }
  saveLog(data)
}

function saveLog(data){
  const newLog = new Log(data)
  newLog.save(function(err, log){
    if(err) console.log('Error saving log: ', err)
    console.log('Log saved')
  })
}

module.exports = {
  saveLog: saveLog,
  saveLogDetails: saveLogDetails
}
