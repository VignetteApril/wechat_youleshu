const fetch = require('fetch.js');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 检测用户的登录状态的公共方法
 */
function check_login_status () {
  let token = wx.getStorageSync('token');
  return token == '' ? false : true;
}

/**
 * 用户输入学习码的公共方法
 */
function input_book_code (code, token, subject_id = '') {
  if (token == '') {
    wx.showToast({
      title: '即将前往手机号授权页面...',
      icon: 'none',
      duration: 3000,
      success(res) {
        wx.navigateTo({
          url: '/pages/getUserInfo/getUserPhone',
        })
      }
    })
  } else { 
    if (code.length != 12) {
      wx.showToast({
        title: '请输入正确的学习码',
        icon: 'none'
      })
    } else {
      fetch({
        url: 'book_codes',
        data: {
          code: code,
          token: token
        },
        method: 'post'
      }).then((res) => {
        console.log(res);
        if (res.code == '0') {
          if (subject_id != res.data.subject_id) {
            wx.showToast({
              title: res.message,
              icon: 'none',
              duration: 3000,
              success(){
                wx.navigateTo({
                  url: '../subject/subject' + '?subject_id=' + res.data.subject_id,
                })
              }
            })
          } else {
            wx.redirectTo({
              url: '../subject/subject' + '?subject_id=' + res.data.subject_id,
            })
          }
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
        }
      });
    }
  }
}

module.exports = {
  formatTime: formatTime,
  check_login_status: check_login_status,
  input_book_code: input_book_code
}
