'use strict'

const CONFIG = require('../config/google-calendar');
const CalendarAPI = require('node-google-calendar');
let cal = new CalendarAPI(CONFIG);
let params = {
  showHidden: true
};
cal.CalendarList.list(params)
  .then(resp => {
    console.log('--------', resp);
  }).catch(err => {
    console.log('error:', err.message);
  });
