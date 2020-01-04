// 请求的base url会和后缀的url进行拼接，组成完整的请求url
const baseURL = 'http://127.0.0.1:3000/api/v1/'

// 返回的数据结构为
// { data: [...], code: '', message: '' }
// data => 返回额数据
// code => 服务器端自定义的状态码，需要约定好
// message => 服务器端返回的提醒信息
const http = ({ url, data, method, isShowToast, ...other } = {}) => {
  let token = wx.getStorageSync('token')
  let requestUrl = baseURL + url

  // 显示请求加载等待
  if (isShowToast == true) {
    wx.showLoading({
      title: '加载中...'
    })
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: requestUrl,
      data: data,
      header: { "content-type": "application/x-www-form-urlencoded" },
      method: method,
      dataType: 'json',
      ...other,
      complete: (res) => {
        // 关闭加载等待
        if (showToast == true) {
          wx.hideLoading()
        }

        // 根据返回的状态码判断并处理
        let code = res.data.code
        let title = res.data.message

        if (code === 8888) {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        } else if (code !== 0) {
          resolve(res.data)
          if (isShowToast == true) {
            showToast(title)
          }

        } else if (code === 0) {
          resolve(res.data)
          if (isShowToast == true) {
            showToast(title)
          }
        } else {
          reject(res)
        }
      }
    })
  })
}

// 全局的展示toast方法
const showToast = title => {
  wx.showToast({
    title: title,
    duration: 1500,
    mask: true,
    icon: 'none'
  })
}

// 获取完整url
const getUrl = url => {
  if (url.indexOf('://') == -1) {
    url = baseURL + url
  }
  return url
}

// 重构请求方式
const _fetch = (content) => {
  return http({
    url: content.url,
    data: content.data,
    method: content.method,
    isShowToast: content.isShowToast
  })
}

// 方法输出
module.exports = _fetch