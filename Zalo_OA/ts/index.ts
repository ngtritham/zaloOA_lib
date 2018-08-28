// Define constants
const token = 'Hsfk0JQ6f5bARsW0D8-kM4HWO0C_byik4JnTQ0wIa5ar11PNAhIGUbSx85XcYBPiTHquK7FoYdv9QWn7BOB6T50LKKrslSntKX5uSNIzupTY2Nuo7fMn8Gu_9Yy2lv8c9L8MO1_la4W6SrvkUE7EHW9HNqa7kPWF4H0SIMg_iXL11IGkVBEeCte05Ibgav80R78g84kSk090F1uPNRAkFbuiQH11iD48RXzw9r7rwHf0II8cOFQB1Hf0AbWS_f134NTNH0pvt7KYL4D7J5T9sVvhFPsZN0'


import ZaloOA from './appZaloOA'
const ZOA = new ZaloOA(token)

import validate from './validate'
import * as validator from 'validator'

const user_id = '2258325342460503795'
const tag = 'tagabcxyz'
const msg = "Hello World!"
const img_url = "https://developers.zalo.me/web/static/zalo.png";
const gif_url = "https://media.giphy.com/media/l0HlM2KvkLRU7Xfa0/giphy.gif";
const title = "Title"
const subtitle = "Subtitle"
const image_url = "https://developers.zalo.me/web/static/zalo.png"
const url = "https://developers.zalo.me/"

const list = [{
    "title": "Zalo API Testing",
    "subtitle": "Zalo API cung cấp các công cụ để bạn có thể kết nối thanh chóng và hiệu quả",
    "image_url": "https://developers.zalo.me/web/static/zalo.png",
    "default_action": {
        "type": "oa.open.url",
        "url": "https://developers.zalo.me/"
    }
},
{
    "title": "Contact",
    "subtitle": "Liên hệ",
    "image_url": "https://developers.zalo.me/web/static/zalo.png",
    "default_action": {
        "type": "oa.open.url",
        "url": "https://developers.zalo.me/"
    }
},
{
    "title": "Xem thêm",
    "subtitle": "Liên hệ",
    "image_url": "https://developers.zalo.me/web/static/zalo.png",
    "default_action": {
        "type": "oa.open.url",
        "url": "https://developers.zalo.me/"
    }
}
]

// TESTING ZONE
let data = null

// data = ZOA.sendTextMessage(user_id, 'Hello').then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// });

// data = ZOA.sendSingleLinkMessage(user_id, title, subtitle, img_url, url).then(result => {
//     console.log(result);
// })

// data = ZOA.sendMultiLinkMessage(user_id, list).then((result) => {
//         console.log(result)
//     }).catch((error) => {
//         console.log(error)
//     });

// data = ZOA.sendUserRequestMessage(user_id, msg, title, subtitle, image_url).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// });

// data = ZOA.getProfile(user_id).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// });

