'use strict'

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = '/home/shanzm/workspace/egg-test/tmp/token2.json';

// Load client secrets from a local file.
fs.readFile('/home/shanzm/workspace/egg-test/config/credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Calendar API.
  authorize(JSON.parse(content), listEvents);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      return getAccessToken(oAuth2Client, callback);
    }
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
  console.log('-----------', auth)
  const calendar = google.calendar({version: 'v3', auth});
  let event = {
    start: { date: '2019-11-22' },
    end: { date: '2019-11-22' },
    summary: '22号的日历测试事件'
  };
  getList(calendar);
  // insert(calendar, event);
  // update(calendar, 'j63ictdaog4ms5a7602jp47r1g', event);
  // destroy(calendar, '281vlbbq4qjetd4721li3225ls');
}

// 获取日历的事件列表
function getList (calendar) {
  calendar.events.list({
    calendarId: 'primary', // 访问当前登录帐号的日历 1443532530mhy@gmail.com
    // showHiddenInvitations: true,
    // timeMin: (new Date()).toISOString(),
    // maxResults: 10,
    // singleEvents: true,
    // orderBy: 'startTime'
  }, (err, res) => {
    if (err) return console.log('query error: ' + err);
    console.log(res.data.items)
  });
}

// 添加
function insert (calendar, event) {
  calendar.events.insert({
    calendarId: 'primary',
    resource: event
  }, function (err, res) {
    if (err) return console.log('insert error: ' + err);
    console.log(res.data)
  })
}

// 更新
function update (calendar, id, resource) {
  calendar.events.update({
    calendarId: 'primary',
    eventId: id,
    resource
  }, function (err, res) {
    if (err) return console.log('update error: ' + err);
    console.log(res.data)
  })
}

// 删除
function destroy (calendar, id) {
  calendar.events.delete({
    calendarId: 'primary',
    eventId: id
  }, function (err, res) {
    if (err) return console.log('delete error: ' + err);
    console.log(res.data)
  })
}
