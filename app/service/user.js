'use strict';

const Service = require('egg').Service;

class userService extends Service {
  async index() {
    const { ctx } = this
    console.log(ctx.model)
    return await ctx.model.User.find()
  }

  async create (data) {
    const { ctx } = this
    console.log('----------', data)
    // let ret = await ctx.model.User.create(data)
    return 'ok'
  }
}

module.exports = userService
