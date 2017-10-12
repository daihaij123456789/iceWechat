//import Route from '../decorator/router'
import Router from 'koa-router';
import config from '../config/development.json'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'
const r = path => resolve(__dirname, path)

export const router = app => {
  //const apiPath = r('../routes')
  const router = new Router();

  router.all('/wechat-hear',wechatMiddle(config.wechat,reply));
  //router.post('/wechat-hear',(ctx,next)=>{});
  app.use(router.routes())
     .use(router.allowedMethods())
}



