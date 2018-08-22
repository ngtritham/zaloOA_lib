const token = 'Hsfk0JQ6f5bARsW0D8-kM4HWO0C_byik4JnTQ0wIa5ar11PNAhIGUbSx85XcYBPiTHquK7FoYdv9QWn7BOB6T50LKKrslSntKX5uSNIzupTY2Nuo7fMn8Gu_9Yy2lv8c9L8MO1_la4W6SrvkUE7EHW9HNqa7kPWF4H0SIMg_iXL11IGkVBEeCte05Ibgav80R78g84kSk090F1uPNRAkFbuiQH11iD48RXzw9r7rwHf0II8cOFQB1Hf0AbWS_f134NTNH0pvt7KYL4D7J5T9sVvhFPsZN0'

const zaloOfficalAccount = require('./appZaloOA')
const ZaloOA = new zaloOfficalAccount(token);
// import {zaloOfficalAccount} from './appZaloOA'
const user_id = '2258325342460503795'
let tag = 'tagabcxyz'
const msg = "Hello World! fsdfsdfsdf"
const img_url = "https://developers.zalo.me/web/static/zalo.png";
const gif_url = "https://media.giphy.com/media/l0HlM2KvkLRU7Xfa0/giphy.gif";

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

const link = {
    "title": "Title",
    "subtitle": "ZSL Test Message",
    "image_url": "https://developers.zalo.me/web/static/zalo.png",
    "default_action": {
        "type": "oa.open.url",
        "url": "https://developers.zalo.me/"
    }
}

// Test methods:
// I.
//  1.
// let data = ZaloOA.sendTextMessage(user_id, msg).then(result => {
//     console.log(result);
// })

//  2.
//   b.
// let data = ZaloOA.sendSingleLinkMessage(user_id, link).then(result => {
//     console.log(result);
// })

//   c.
//let data = ZaloOA.sendMultiLinkMessage(token, user_id, list);

//   d.
let text = "Hello World!"
let title = "OA chatbot (Testing)";
let subtitle = "Đang yêu cầu thông tin từ bạn";
let image_url = "https://developers.zalo.me/web/static/zalo.png"

// let data = ZaloOA.sendUserRequestMessage(token, user_id, text, title, subtitle, image_url).then(result => console.log(result));

// ---------------------------
// II.
//  1.
//let data = ZaloOA.getProfile(token, user_id).then(result => console.log(result));

// ---------------------------
// III.
//  1.
//let data = ZaloOA.getTagsOfOA(token).then(result => console.log(result));

//  2.resizeBy
//let data = ZaloOA.setTagToFollower(token, tag, user_id).then(result => console.log(result));

// ---------------------------
// IV.
//  1.
//let data = ZaloOA.registerIp(token, "10.30.30.30", "VNG");
//  2.
// let data = ZaloOA.removeIp(token, "10.30.30.30", "VNG");

// ---------------------------
// V.
// let buttons = [{
//         call_to_actions: [{
//             title: "Menu",
//             type: "oa.action.parent",
//             call_to_actions: [{
//                 title: "Liên hệ",
//                 type: "oa.open.phone",
//                 payload: "0123456789"
//             }]
//         }]
//     },
//     {
//         call_to_actions: [{
//             title: "Menu",
//             type: "oa.action.parent",
//             call_to_actions: [{
//                     title: "Liên hệ",
//                     type: "oa.open.phone",
//                     payload: "0123456789"
//                 },
//                 {
//                     title: "Đến shop",
//                     type: "oa.open.url",
//                     url: "https://developers.zalo.me/"
//                 }
//             ]
//         }]
//     }
// ]
// let data = ZaloOA.configureMenuOA(token, buttons);
