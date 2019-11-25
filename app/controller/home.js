'use strict';

const url = require('url');
const querystring = require('querystring');
const {google} = require('googleapis');
const fs = require('fs');

const Controller = require('egg').Controller;

// 证书路径
const credentialsPath = '/home/shanzm/workspace/egg-test/config/credentials.json';
// token路径
const TOKEN_PATH = '/home/shanzm/workspace/egg-test/tmp/token1.json';
const credentials = JSON.parse(fs.readFileSync(credentialsPath));
const {client_secret, client_id, redirect_uris} = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[1]);

class HomeController extends Controller {
  async authorize() {
    const { ctx } = this
    let params = url.parse(ctx.request.url)
    let code = querystring.parse(params.query).code
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return ctx.failure(err, 500)
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(token))
    })
    ctx.success('ok')
  }

  // 产生登录验证的网页地址
  async generateAuthUrl () {
    const { ctx } = this
    // 权限范围
    const SCOPES = ['https://www.googleapis.com/auth/calendar'];
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    });
    ctx.success(authUrl)
  }

  async list () {
    const { ctx } = this
    let token = fs.readFileSync(TOKEN_PATH).toString();
    oAuth2Client.setCredentials(JSON.parse(token));
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
    let ret = await calendar.events.list({
      calendarId: 'primary', // 访问当前登录帐号的日历 1443532530mhy@gmail.com
      // showHiddenInvitations: true,
      // timeMin: (new Date()).toISOString(),
      // maxResults: 10,
      // singleEvents: true,
      // orderBy: 'startTime'
    });
    ctx.success(ret.data.items)
  }
}

module.exports = HomeController;
