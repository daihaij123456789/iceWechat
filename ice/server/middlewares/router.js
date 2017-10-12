//import Route from '../decorator/router'
import Router from 'koa-router';
import { resolve } from 'path';
import sha1 from 'sha1';
import opts from '../config/development.json'

const r = path => resolve(__dirname, path)

export const router = app => {
  //const apiPath = r('../routes')
  const router = new Router();

  router.get('/wechat-hear',(ctx,next)=>{
    require('../wechat') 
  	const token = opts.wechat.token
    const {
      signature,
      nonce,
      timestamp,
      echostr
    } = ctx.query

    const str = [token, timestamp, nonce].sort().join('')
    const sha = sha1(str)
    if (sha === signature) {
        ctx.body = echostr
      } else {
        ctx.body = 'Failed'
      }
  });
  //router.post('/wechat-hear',(ctx,next)=>{});
  app.use(router.routes())
     .use(router.allowedMethods())
}
