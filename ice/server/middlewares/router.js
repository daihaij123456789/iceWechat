//import Route from '../decorator/router'
import Router from 'koa-router';
import config from '../config/development.json'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'
import {resolve} from 'path'
import {signature} from '../controllers/wechat'

const r = path => resolve(__dirname, path)

export const router = app => {
  //const apiPath = r('../routes')
  const router = new Router();

  router.all('/wechat-hear',wechatMiddle(config.wechat,reply));
  router.get('/wechat-signature',signature);
  app.use(router.routes())
     .use(router.allowedMethods())
}



