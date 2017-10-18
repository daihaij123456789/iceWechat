const tip = '我的卡丽熙，欢迎来到河间地\n' +
  '点击 <a href="http://vuessrdahai.free.ngrok.cc/">一起搞事情吧</a>'


export default async (ctx, next) => {
  const message = ctx.weixin
  let mp = require('../wechat')
  let client = mp.getWechat()

  const tokenData = await client.fetchAccessToken()

  //await client.handle('getUserInfo', message.FromUserName, tokenData.access_token)

  if (message.MsgType === 'event') {
    if (message.Event === 'subscribe') {
      ctx.body = tip
    } else if (message.Event === 'unsubscribe') {
      console.log('取关了')
    } else if (message.Event === 'LOCATION') {
      ctx.body = message.Latitude + ' : ' + message.Longitude
    } else if (message.Event === 'view') {
      ctx.body = message.EventKey + message.MenuId
    } else if (message.Event === 'pic_sysphoto') {
      ctx.body = message.Count + ' photos sent'
    }
  } else if (message.MsgType === 'text') {
    if (message.Content === '1') {
      let userList = [
        {
          openid: 'oe0IEv99LfZP6V-uLOmEfVPnxVbU',
          lang: 'zh_CN'
        },
        {
          openid: 'oe0IEv4Ez4ICPkXBasCsQvm_OpSo',
          lang: 'zh_CN'
        },
        {
          openid: 'oe0IEv5PKjp68WXf4xvINjBGbnks',
          lang: 'zh_CN'
        },
        {
          openid: 'oe0IEv89v1gEkLfpf9tzZCWv7uNU',
          lang: 'zh_CN'
        },
        {
          openid: 'oe0IEv6srsMjcEDJCeKHhqlSXPSw',
          lang: 'zh_CN'
        }
      ]
      //const data = await client.handle('createTag', 'VueSSR')
      const data = await client.handle('fetchTags')
      // const data = await client.handle('batchTag', ['oW4nAvpSgoLKfVDdtK_VvGutDako'], 100)
      //const data = await client.handle('getTagList', 'oW4nAvpSgoLKfVDdtK_VvGutDako')
      
      //user
      //const data = await client.handle('fetchUserList')
      //const data = await client.handle('batchUserInfo',userList)
      //const data = await client.handle('getUserInfo','oe0IEv89v1gEkLfpf9tzZCWv7uNU')
      ctx.body = data
    } else if (message.Content === '2') {
      const menu = require('./menu').default
      await client.handle('delMenu')
      const menuData = await client.handle('createMenu', menu)
    }


    ctx.body = message.Content
  } else if (message.MsgType === 'image') {
    ctx.body = {
      type: 'image',
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'voice') {
    ctx.body = {
      type: 'voice',
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'video') {
    ctx.body = {
      type: 'video',
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'location') {
    ctx.body = message.Location_X + ' : ' + message.Location_Y + ' : ' + message.Label
  } else if (message.MsgType === 'link') {
    ctx.body = [{
      title: message.Title,
      description: message.Description,
      picUrl: 'http://mmbiz.qpic.cn/mmbiz_jpg/xAyPZaQZmH09wYBjskFEQSoM4te0SnXR9YgbJxlDPVPDZtgLCW5FacWUlxFiaZ7d8vgGY6mzmF9aRibn05VvdtTw/0',
      url: message.Url
    }]
  }
}