// index/index.js
import request from "../../utils/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],//轮播图数据
    recommendList: [], //推荐轮播图
    topList: [], //排行榜数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    /*轮播图数据*/
    let bannerInfo = await request("/banner", {type: 2});
    /*推荐歌单数据*/
    let recommendInfo = await request("/personalized", {limit: 5});
    this.setData({
      bannerList: bannerInfo.banners,
      recommendList: recommendInfo.result,
      //topList: topListInfo,//放在此处更新会导致发送请求的过程中页面长时间白屏,用户体验差
    });
    /*排行榜数据*/
    /**
     * 需求分析:
     *    1.根据idx的值获取对应的数据
     *    2.idx的取值范围是0-20, 我们需要0-4
     *    3.需要发5次请求
     * @type {*}
     */
    let index = 0;
    let topListInfo = [];
    while (index < 5) {
      let topListData = await request("/top/list", {idx: index ++});
      //splice(会修改原数组,可以对指定数组进行增删改) slice(不会修改原数组)
      let topListItem = {id: topListData.playlist.id,
                         name : topListData.playlist.name,
                         tracks : topListData.playlist.tracks.slice(0,3)}
      topListInfo.push(topListItem);
      // 不需要等待五次请求全部结束才更新,用户体验好,但渲染次数会多一些
      this.setData({
        topList: topListInfo
      })
    }
    this.setData({
      //topList: topListInfo,//放在此处更新会导致发送请求的过程中页面长时间白屏,用户体验差
    });

    /* wx.request({
       url: "http://localhost:3000/banner",
       data: "{type : 2}",
       success: (res) => {
         console.log(res , "成功");
       },
       fail: (err) => {
         console.log(err , "失败");
       }}
     )*/
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