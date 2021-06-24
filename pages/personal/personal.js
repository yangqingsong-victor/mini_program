// pages/personal/personal.js
import request from "../../utils/request";

let startY = 0;//手指起始的坐标
let moveY = 0;//手指移动的坐标
let moveDistance = 0;//手指移动距离

Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform: "translateY(0)",
    coverTransition: "",
    userInfo: {},// 用户信息
    recordPlayInfo: {}// 播放记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 读取用户的基本信息
    let userInfo = wx.getStorageSync("userInfo");
    if (userInfo) {
      this.setData({
        userInfo: JSON.parse(userInfo)
      });
      //获取用户播放记录
      this.getRecentPlay(this.data.userInfo.userId);
    }
  },

  async getRecentPlay(userId) {
    let res = await request("/user/record", {uid: userId, type: 1});
    let index = 0;
    res.weekData.map(item => {
      item.id = index++;
      return item;
    })
    this.setData({
      recordPlayInfo: res.weekData
    });
  },

  handleTouchStart: function (event) {
    this.setData({
      coverTransition: ""
    });
    startY = event.touches[0].clientY;
  },
  handleTouchMove: function (event) {
    moveY = event.touches[0].clientY;
    moveDistance = moveY - startY;
    if (moveDistance <= 0) {
      return;
    }
    if (moveDistance >= 80) {
      moveDistance = 80;
    }
    // 动态更新coverTransform的状态值
    this.setData({
      coverTransform: `translateY(${moveDistance}rpx)`
    });
  },
  handleTouchEnd: function () {
    this.setData({
      coverTransform: `translateY(0rpx)`,
      coverTransition: `transform 1s linear`
    });
  },

  // 跳转至登录login页面的回调
  toLogin() {
    //已经登录时,点击去登录无效
    if (this.data.userInfo.avatarUrl) {
      return;
    }
    wx.navigateTo({
      url: "/pages/login/login"
    });
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