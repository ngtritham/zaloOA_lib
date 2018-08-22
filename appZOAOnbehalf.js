/**
 *
 * Lib ZOA Onbehalf
 *
 */

// var {
//   appConfig
// } = require('../config/constants')
// appConfig = appConfig[appConfig.env]

const crypto = require('crypto')
const hash256 = crypto.createHash('sha256')

var axios = require('axios')
let moment = require('moment')
var JSONbig = require('json-bigint')
var JSONstrict = require('json-bigint')({
  "strict": true
})
var JSONbigString = require('json-bigint')({
  "storeAsString": true
})

// // Config proxy
// var isProxy = appConfig.isProxy;
// var proxy = appConfig.proxy;

const appID = '3685435022798396002'
const secretKey = '20GmfUL3GukSLOF33EU4'
const urlAPI = 'https://openapi.zaloapp.com/oa/v1/onbehalf/'
let access_token = ''

/**
 *
 * https://oauth.zaloapp.com/page/login?app_id=3685435022798396002&redirect_uri=http://app.event.zalo.me/zs/app/callback
 * @class zoaOnbehalf
 */
class zoaOnbehalf {
  constructor() {

  }

  async getURLLogin() {
    let url = `https://oauth.zaloapp.com/page/login?app_id=${appID}&redirect_uri=http://app.event.zalo.me/zs/app/callback`
    return url
  }

  // 1. Cập nhập thông tin người quan tâm
  // TODO:

  // 2. Lấy danh sách người quan tâm

  /**
   *
   *
   * @param {string} [accessToken='']
   * @param {number} [offset=0]
   * @param {number} [count=20]
   * @memberof zoaOnbehalf
   */
  async getFollowers(accessToken = '', offset = 0, count = 20) {
    console.log('getFollowers')

    let url_api = `${urlAPI}getfollowers`
    let data = {
      accessTok: accessToken,
      offset: offset,
      count: count
    }
    let timestamp = moment().valueOf()
    var mac = crypto.createHash('sha256').update(appID + JSON.stringify(data) + timestamp + secretKey, 'utf8').digest("hex");

    let data_push = {
      appid: appID,
      data: data,
      timestamp: timestamp,
      mac: mac,
    }

    return new Promise(resolve => {
      axios.get(`${url_api}`, {
          params: data_push,
          transformResponse: data => JSONbigString.parse(data)
        })
        .then(response => {
          if (response.status == 200) {
            resolve(response.data)
          } else {
            resolve(false)
          }
        })
        .catch(error => {
          console.error(error)
          resolve(false)
        })
    })
  }

  // 3. Gửi tin nhắn yêu cầu thông tin
  // 4. Lấy danh sách nhãn

  /**
   *
   *
   * @param {string} [accessToken='']
   * @returns
   * @memberof zoaOnbehalf
   */
  async getTagsOfOA(accessToken = '') {
    console.log('getTagsOfOA')

    let url_api = `${urlAPI}tag/gettagsofoa`
    let data = {
      accessTok: accessToken,
    }
    let timestamp = moment().valueOf()
    var mac = crypto.createHash('sha256').update(appID + JSON.stringify(data) + timestamp + secretKey, 'utf8').digest("hex");

    let data_push = {
      appid: appID,
      data: data,
      timestamp: timestamp,
      mac: mac,
    }

    return new Promise(resolve => {
      axios.get(`${url_api}`, {
          params: data_push
        })
        .then(response => {
          if (response.status == 200) {
            resolve(response.data)
          } else {
            resolve(false)
          }
        })
        .catch(error => {
          console.error(error)
          resolve(false)
        })
    })
  }

  // 5. Xóa nhãn

  /**
   *
   *
   * @param {string} [accessToken='']
   * @param {string} [tagName='']
   * @returns
   * @memberof zoaOnbehalf
   */
  async removeTagsOfOA(accessToken = '', tagName = '') {
    console.log('removeTagsOfOA')

    let url_api = `${urlAPI}tag/rmtag`
    let data = {
      accessTok: accessToken,
      tagName: tagName
    }
    let timestamp = moment().valueOf()
    var mac = crypto.createHash('sha256').update(appID + JSON.stringify(data) + timestamp + secretKey, 'utf8').digest("hex");

    let data_push = {
      appid: appID,
      data: data,
      timestamp: timestamp,
      mac: mac,
    }

    return new Promise(resolve => {
      axios.get(`${url_api}`, {
          params: data_push
        })
        .then(response => {
          if (response.status == 200) {
            resolve(response.data)
          } else {
            resolve(false)
          }
        })
        .catch(error => {
          console.error(error)
          resolve(false)
        })
    })
  }

  // 6. Gỡ người quan tâm khỏi nhãn

  /**
   *
   *
   * @param {string} [accessToken='']
   * @param {string} [tagName='']
   * @param {string} [uid='']
   * @returns
   * @memberof zoaOnbehalf
   */
  async removeTagFromFollower(accessToken = '', tagName = '', uid = '') {
    console.log('removeTagFromFollower')

    let url_api = `${urlAPI}tag/rmfollowerfromtag`
    let data = {
      accessTok: accessToken,
      tagName: tagName,
      uid: uid
    }
    let timestamp = moment().valueOf()
    var mac = crypto.createHash('sha256').update(appID + JSON.stringify(data) + timestamp + secretKey, 'utf8').digest("hex");

    let data_push = {
      appid: appID,
      data: data,
      timestamp: timestamp,
      mac: mac,
    }

    return new Promise(resolve => {
      axios.get(`${url_api}`, {
          params: data_push
        })
        .then(response => {
          if (response.status == 200) {
            resolve(response.data)
          } else {
            resolve(false)
          }
        })
        .catch(error => {
          console.error(error)
          resolve(false)
        })
    })
  }

  // 7. Gán nhãn người quan tâm

  /**
   *
   *
   * @param {string} [accessToken='']
   * @param {string} [tagName='']
   * @param {string} [uid='']
   * @returns
   * @memberof zoaOnbehalf
   */
  async setTagToFollower(accessToken = '', tagName = '', uid = '') {
    console.log('setTagToFollower')

    let url_api = `${urlAPI}tag/tagfollower`
    let data = {
      accessTok: accessToken,
      tagName: tagName,
      uid: uid
    }
    let timestamp = moment().valueOf()
    var mac = crypto.createHash('sha256').update(appID + JSON.stringify(data) + timestamp + secretKey, 'utf8').digest("hex");

    let data_push = {
      appid: appID,
      data: data,
      timestamp: timestamp,
      mac: mac,
    }

    return new Promise(resolve => {
      axios.get(`${url_api}`, {
          params: data_push
        })
        .then(response => {
          if (response.status == 200) {
            resolve(response.data)
          } else {
            resolve(false)
          }
        })
        .catch(error => {
          console.error(error)
          resolve(false)
        })
    })
  }

  // 8. Lấy thông tin người quan tâm
  /**
   *
   *
   * @param {string} [accessToken='']
   * @param {*} uid
   * @returns
   * @memberof zoaOnbehalf
   */
  getProfile(accessToken = '', uid = '') {
    console.log('getProfile')

    let url_api = `${urlAPI}getprofile`
    let data = {
      accessTok: accessToken,
      uid: uid
    }
    let timestamp = moment().valueOf()
    var mac = crypto.createHash('sha256').update(appID + JSON.stringify(data) + timestamp + secretKey, 'utf8').digest("hex");

    let data_push = {
      appid: appID,
      data: data,
      timestamp: timestamp,
      mac: mac,
    }

    return new Promise(resolve => {
      axios.get(`${url_api}`, {
          params: data_push,
          transformResponse: data => JSONbigString.parse(data)
        })
        .then(response => {
          if (response.status == 200) {
            resolve(response.data)
          } else {
            resolve(false)
          }
        })
        .catch(error => {
          console.error(error)
          resolve(false)
        })
    })
  }

  // 9. Lấy thông tin OA

  /**
   *
   *
   * @param {string} [accessToken='']
   * @returns
   * @memberof zoaOnbehalf
   */
  getOA(accessToken = '') {
    console.log('getOA')

    let url_api = `${urlAPI}getoa`
    let data = {
      accessTok: accessToken,
    }
    let timestamp = moment().valueOf()
    var mac = crypto.createHash('sha256').update(appID + JSON.stringify(data) + timestamp + secretKey, 'utf8').digest("hex");

    let data_push = {
      appid: appID,
      data: data,
      timestamp: timestamp,
      mac: mac,
    }

    return new Promise(resolve => {
      axios.get(`${url_api}`, {
          params: data_push,
          transformResponse: data => JSONbigString.parse(data)
        })
        .then(response => {
          if (response.status == 200) {
            resolve(response.data)
          } else {
            resolve(false)
          }
        })
        .catch(error => {
          console.error(error)
          resolve(false)
        })
    })
  }

  // 10. Lấy đoạn hội thoại giữa người quan tâm và OA

  // TODO: Chưa xong
  /**
   *
   *
   * @param {string} [accessToken='']
   * @returns
   * @memberof zoaOnbehalf
   */

  getConversation(accessToken = '') {
    console.log('getConversation')

    let url_api = `${urlAPI}conversation`
    let data = {
      accessTok: accessToken,
    }
    let timestamp = moment().valueOf()
    var mac = crypto.createHash('sha256').update(appID + JSON.stringify(data) + timestamp + secretKey, 'utf8').digest("hex");

    let data_push = {
      appid: appID,
      data: data,
      timestamp: timestamp,
      mac: mac,
    }

    return new Promise(resolve => {
      axios.get(`${url_api}`, {
          params: data_push
        })
        .then(response => {
          if (response.status == 200) {
            resolve(response.data)
          } else {
            resolve(false)
          }
        })
        .catch(error => {
          console.error(error)
          resolve(false)
        })
    })
  }



  // 11. Lấy danh sách người quan tâm vừa chat với OA
  // 12. Trả lời tin nhắn dạng liên kết
  // 13. Trả lời tin nhắn dạng hình
  // 14. Trả lời tin nhắn dạng text
  // 15. Gửi tin nhắn dạng Sticker
  // 16. Gửi tin nhắn dạng Gif
  // 17. Gửi tin nhắn tương tác
  // 18. Gửi tin nhắn dạng liên kết
  // 19. Gửi tin nhắn dạng hình
  // 20. Gửi tin nhắn dạng text
}

module.exports = new zoaOnbehalf()
