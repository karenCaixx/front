var app = getApp();
import { CanvasTool } from '../../utils/canvas.js';

Page({
  data: {
    userInfo: {}
  },

  onLoad: function (options) {
    let info = {};
    app.getUserInfo((userInfo) => {
      let url = userInfo.avatarUrl;
      wx.downloadFile({
        url: url,
        success: (res) => {
          let avatar = res.tempFilePath;
          this.buildImg(avatar);
        }
      })
    })

  },

  onReady: function () {

  },

  onShow: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function (options) {
    return {
      title: '地球偶尔太大去练习,沙滩上海浪留下痕迹~',
      path: '../index/index',
      imageUrl: this.data.shareImg,
      success: (res) => {
          if (res.errMsg == 'shareAppMessage:ok') { //转发成功
              
          }
      },
      fail: function(res) {
          if (res.errMsg == 'shareAppMessage:fail cancel') { //取消转发
              console.log('cancel')

          } else if (res.errMsg == 'shareAppMessage: fail') { //转发失败回调
              console.log('fail')

          }
      },
      complete: () => { //转发结束回调
        
      } 
    }
  },

  buildImg: function(avatar) {
    let width = 300;
    try {
      var res = wx.getSystemInfoSync()
      width = res.windowWidth;
    } catch (e) {
      
    }
    let bg = '../../style/img/bg3.png';
    let avatarX = (width - 60) / 2;
    const ctx = wx.createCanvasContext('shareCanvas');
    console.log(ctx)
    ctx.setFillStyle('#FFF');
    ctx.setFontSize(20);
    // ctx.fillText('快来看看快来看看快来看看快来看看快来看看', 0, 300);

    ctx.drawImage(bg, 0, 0, width, 300);
    CanvasTool.drawRoundAvatar(ctx, avatar, avatarX, 120, 60, 60, 30);
    ctx.save();

    ctx.draw(true, () => {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        canvasId: 'shareCanvas',
        success: (res) => {
          this.setData({ shareImg: res.tempFilePath });
        }
      })
    })

  }
})