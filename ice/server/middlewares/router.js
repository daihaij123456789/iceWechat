//import Route from '../decorator/router'
import Router from 'koa-router';
import config from '../config/development.json'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'
import {resolve} from 'path'

const r = path => resolve(__dirname, path)

export const router = app => {
  //const apiPath = r('../routes')
  const router = new Router();

  router.all('/wechat-hear',wechatMiddle(config.wechat,reply));
  //router.post('/wechat-hear',(ctx,next)=>{});
  router.get('/upload',async (ctx,next)=>{
  	let mp = require('../wechat');
  	let client = mp.getWechat();
  	
    const news = {
        "articles":
        [{
        "title": "SSp",
        "thumb_media_id": "EZLFu9HSX1xnvfD08kE3NUiRsTrrgFMeZ5vpcYDqtjE",
        "author": "大海",
        "digest" : "摘要",
        "show_cover_pic": 1,
        "content" : "您好",
        "content_source_url": "http://coding.imooc.com"
        }
        ]
      }
      const data = await client.handle('uploadMaterial','news',news,{})
      //const data = await client.handle('batchMaterial',{})
    
    console.log(data)
  })
  app.use(router.routes())
     .use(router.allowedMethods())
}



