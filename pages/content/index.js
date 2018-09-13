var util = require('../../utils/util.js')
import { CanvasTool } from '../../utils/canvas.js'

Page({
    data: {
        now: util.formatTime(new Date()),
        interval: 0,
        imgShow: false,
        bgImg: '',
        taVal: ''
    },

    onLoad: function(options) {
        // this.doClock(); //模拟时钟的效果


    },

    onShow: function() {
        let arr = [3,4,5];
        let arrL = arr.length;
        let idx = Math.floor(Math.random(0,9)*10+1)%arrL;
        let n = arr[idx];
        console.log(idx, n);
        this.setData({ bgImg: `../../style/img/bg${n}.png`});
    },

    onShareAppMessage: function() {

    },

    doClock: function() {
        let now = +new Date();
        this.interval = setInterval(() => {
            now += 1000;
            this.setData({ now: util.formatTime(new Date(now)) });
        }, 1000);
    },

    imgLoad: function(e) {
        let { width, height } = e.detail;
        let ratio = width / height;
        let viewWidth = 600,
            viewHeigth = 600 / ratio;
        console.log(ratio, 'ratio')
        this.setData({
            imgWidth: viewWidth,
            imgHeight: viewHeigth
        })
    },

    generate: function(e) {
        let width = 375;
        let bg = this.data.bgImg;
        try {
            var res = wx.getSystemInfoSync()
            width = res.windowWidth;
        } catch (e) {}

        wx.showLoading({
            title: '加工中',
            mask: true,
        });

        const ctx = wx.createCanvasContext('imgCanvas');
        ctx.setFillStyle('#222222');
        ctx.setFontSize(15);
        ctx.drawImage(bg, 0, 0, width, 600);
        ctx.save();

        let s = e.detail.value.content;
        this.setData({ taVal: s });
        CanvasTool.drawTextarea(ctx, 15, 56, this.getFormatCode(s), width - 30, 30);

        ctx.draw(false, () => {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                canvasId: 'imgCanvas',
                success: (res) => {
                    this.setData({ img: res.tempFilePath, imgShow: true });
                    wx.hideLoading();
                }
            })
        })
    },

    getFormatCode: function(strValue) {
        return strValue.replace(/\r\n/g, '`').replace(/\n/g, '`').replace(/\s/g, '^');
    },

    close: function() {
        this.setData({ imgShow: false });
    },

    saveImg: function() {
        let that = this;
        let img = this.data.img;
        wx.saveImageToPhotosAlbum({
            filePath: img,
            success(res) {
                if (res.errMsg == 'saveImageToPhotosAlbum:ok') {
                    that.showToast('保存成功去看看吧', 'success');
                    that.setData({ imgShow: false });
                }
            },
            fail(res) {},
            complete(res) {}
        })
    },

    showToast: function(str, type) {
        wx.showToast({
            title: str,
            icon: type,
            duration: 2000
        })
    }

})