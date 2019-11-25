'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx, service } = this;
    let ret = await service.user.index()
    ctx.success(ret)
  }

  async create() {
    const { ctx, service } = this;
    let ret = await service.user.create(ctx.request.body)
    ctx.success(ret)
  }
}

module.exports = UserController;
