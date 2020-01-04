// pages/feedback/feedback.js
const App   = getApp();
const fetch = require('../../utils/fetch.js');
const util  = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: '',
    maxCharNum: 140,
    currentCharNum: 0,
    fileList: [],
    token: '',
    paddingBottom: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (App.globalData.isIpx == true) {
      this.setData({
        paddingBottom: '30rpx'
      })
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
    // 查看用户是否登录，如果没有登录，则跳转到手机号授权页面
    if (!util.check_login_status()) {
      wx.navigateTo({
        url: '/pages/getUserInfo/getUserPhone',
      });
    } else {
      this.setData({
        token: wx.getStorageSync('token')
      })
    };
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

  /**
   * 用户输入反馈意见
   */
  onChangeMessage: function(e) {
    let _that = this;

    _that.setData({
      message: e.detail,
      currentCharNum: e.detail.length
    })
  },

  /**
   * 用户上传图片
   */
  afterRead: function(e) {
    let _that = this;
    let current_file = { url: e.detail.file.path, name: e.detail.file.name, isImage: true };
    let current_fileList = _that.data.fileList;
    current_fileList.push(current_file);
    _that.setData({
      fileList: current_fileList
    });

    console.log(current_fileList)
  },

  /**
   * 用户删除上传图片
   */
  onDelete: function(e) {
    let _that = this;
    _that.setData({
      fileList: []
    })
  },

  /**
   * 用户点击提交反馈按钮
   */
  onClickSubmitFeedback: function () {
    let _that = this;
    if (_that.data.message == '') {
      wx.showToast({
        title: '请输入留言信息',
        icon: 'none'
      })
    } else {
      // 发送创建反馈的请求
      if (_that.data.fileList.length > 0) {
        wx.uploadFile({
          url: 'http://127.0.0.1:3000/api/v1/feedbacks',
          filePath: _that.data.fileList[0].url,
          name: 'image',
          formData: { message: _that.data.message, token: _that.data.token },
          success(res) {
            console.log(res)
          }
        });
      } else {
        fetch({
          url: 'feedbacks',
          data: {
            message: _that.data.message,
            token: _that.data.token
          },
          method: 'post'
        }).then((res) => {
          console.log(res);
        })
      }

      wx.showToast({
        title: '留言成功！',
        icon: 'none',
        duration: 3000,
        success(){
          wx.switchTab({
            url: '/pages/my/my',
          })
        }
      })
    };
  },
})