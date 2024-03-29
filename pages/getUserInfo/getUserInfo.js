// pages/getUserInfo/getUserInfo.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_checked: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // // 查看是否授权
    // wx.getSetting({
    //   success (res){
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         withCredentials: true,
    //         success: function(res) {
    //           console.log(res);
    //         }
    //       })
    //     }
    //   }
    // })
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

  },

  bindGetUserInfo(e) {
    if (this.data.is_checked == false) {
      wx.showToast({
        title: '请勾选确认信息',
        icon: 'none'
      });

      return;
    }
    wx.setStorageSync('userInfo', e.detail.userInfo);

    wx.navigateBack({
      delta: 1,
    })
  },

  onClickRefuse: function () {
    wx.navigateBack();
  },

  /**
   * 用户点击checkbox
   */
  onClickCheck: function () {
    let _that = this;
    
    _that.setData({
      is_checked: !_that.data.is_checked
    })
  }
})