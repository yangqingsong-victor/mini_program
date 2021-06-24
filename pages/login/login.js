// pages/login/login.js
import request from "../../utils/request";
/**
 * 登录流程:
 *    1.收集表单项数据
 *    2.前端验证
 *        1.用户信息(账号密码)是否合法
 *        2.不通过,提示用户
 *        3.通过,请求后台
 *    3.后端验证
 *        1.验证用户是否存在
 *        2.用户不存在,告诉前端
 *        3.用户存在,验证密码
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",//手机号
    password: ""//密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 表单内容发生改变的回调
  handleInput: function (event) {
    //let type = event.currentTarget.id;//通过id传值 type: phone||password

    //通过data-key传值可以传多个数据
    let type = event.currentTarget.dataset.type;//通过data-key传值 type: phone||password
    let test = event.currentTarget.dataset.test;//通过data-key传值 type: phone||password

    this.setData({
      [type]: event.detail.value
    })
  },

  // 登录的回调
  async login() {
    // 1.收集表单项数据
    let {phone, password} = this.data;
    // 2.前端验证
    if (!phone) {
      wx.showToast({
        "title": "手机号不能为空!",
        "icon": "none"
      })
      return;
    }
    //定义一个正则
    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/
    if (!phoneReg.test(phone)) {
      wx.showToast({
        "title": "手机号格式错误!",
        "icon": "none"
      })
      return;
    }
    if (!password) {
      wx.showToast({
        "title": "密码不能为空!",
        "icon": "none"
      })
      return;
    }

    // 3.后端验证
    let res = await request("/login/cellphone", {phone, password, isLogin: true}, "POST");
    if (res.code === 200) {
      wx.showToast({
        "title": "登录成功!"
      });
      // 将用户信息存储至本地
      wx.setStorageSync("userInfo", JSON.stringify(res.profile));
      //跳转至个人中心 switchTab 这个方法不行,personal下的onLoad在一开始就执行了一次,登录成功后不会执行,所以userInfo下面也没有数据
      wx.reLaunch({
        url: "/pages/personal/personal"
      });
    } else if (res.code === 400) {
      wx.showToast({
        "title": "手机号错误!",
        "icon": "none"
      })
    } else if (res.code === 502) {
      wx.showToast({
        "title": "密码错误!",
        "icon": "none"
      });
    } else {
      wx.showToast({
        "title": "登录失败,请重新登录!",
        "icon": "none"
      });
    }

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