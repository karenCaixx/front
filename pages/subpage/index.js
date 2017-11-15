var util = require('../../utils/util.js')
var weax = require('../../utils/weather.js')
var sentence = require('../../utils/sentence.js')

// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: util.formatDate(new Date()),
    path: [],
    weaxArr: weax.weaxArr,
    se: sentence.se,
    content: '',
    weaxIcon: ""
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  addPic: function(e) {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        that.setData({
          path: tempFilePaths
        })
        
      },
    })
  },

  iconTap: function(e) {
    let id = e.detail.value
    this.setData({
      weaxIcon: id
    })

    console.log(e) 
  },

  bindFormSubmit: function(e) {
    if(e.detail.value.content === ""){
      this.toTimeline()
      return
    }
    let data = {
      weaxIcon: this.data.weaxIcon,
      date: this.data.date,
      content: e.detail.value.content
    }

    this.saveData(data)
    this.toTimeline()
  },

  toTimeline: function() {
    wx.redirectTo({
      url: '../timeline/index'
    })
  },

  saveData: function(data) {
    let arr = []
    try {
      var value = wx.getStorageSync('jsonData')
      if (value) {
        arr = JSON.parse(value)
      }
    } catch (e) {
      console.log(e)
    }

    arr.push(data)
    wx.setStorage({
      key: 'jsonData',
      data: JSON.stringify(arr),
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.weaxArr)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})