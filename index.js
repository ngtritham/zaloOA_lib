const token = 'Hsfk0JQ6f5bARsW0D8-kM4HWO0C_byik4JnTQ0wIa5ar11PNAhIGUbSx85XcYBPiTHquK7FoYdv9QWn7BOB6T50LKKrslSntKX5uSNIzupTY2Nuo7fMn8Gu_9Yy2lv8c9L8MO1_la4W6SrvkUE7EHW9HNqa7kPWF4H0SIMg_iXL11IGkVBEeCte05Ibgav80R78g84kSk090F1uPNRAkFbuiQH11iD48RXzw9r7rwHf0II8cOFQB1Hf0AbWS_f134NTNH0pvt7KYL4D7J5T9sVvhFPsZN0'

const zaloOfficalAccount = require('./appZaloOA')
const ZaloOA = new zaloOfficalAccount(token);
// import {zaloOfficalAccount} from './appZaloOA'
const user_id = '2258325342460503795'
let tag = 'tagabcxyz'
const msg = "Hello World!"
const img_url = "https://developers.zalo.me/web/static/zalo.png";
const gif_url = "https://media.giphy.com/media/l0HlM2KvkLRU7Xfa0/giphy.gif";
let title = "Title"
let subtitle = "Subtitle"
let image_url = "https://developers.zalo.me/web/static/zalo.png"
let url = "https://developers.zalo.me/"

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

let data = null

// Test methods:
// I.
//  1.
//data = ZaloOA.sendTextMessage(user_id, msg)

//  2.
//   a.
let img_element = [{
    "media_type": "image",
    "url": "https://developers.zalo.me/web/static/zalo.png"
}]
// data = ZaloOA.sendMediaMessage(user_id, msg, img_element).then(result => {
//     console.log(result);
// })

//   b.

data = ZaloOA.sendSingleLinkMessage(user_id, title, subtitle, img_url, url).then(result => {
    console.log(result);
})

//   c.
//data = ZaloOA.sendMultiLinkMessage(user_id, list);

//   d.
//data = ZaloOA.sendUserRequestMessage(user_id, msg, title, subtitle, image_url).then(result => console.log(result));

// ---------------------------
// II.
//  1.
//data = ZaloOA.getProfile(user_id).then(result => console.log(result));

//  2.
//data = ZaloOA.getOA().then(result => console.log(result));

//  3.
//let data = ZaloOA.getFollowers().then(result => {
//     console.log("errorMsg: ", result.errorMsg)
//     let followers = result.data.followers
//     console.log(followers)
// });

//  4.
// data = ZaloOA.getRecentChatList().then(result => {
//     console.log(result)
// })

//  5.
// data =  ZaloOA.getConversation(user_id).then(result => {
//     console.log(result)
// })

// ---------------------------
// III.
//  1.
//data = ZaloOA.getTagsOfOA().then(result => console.log(result));

//  2.
// data = ZaloOA.setTagToFollower(user_id, tag).then(result => console.log(result));

//  3.
// data = ZaloOA.removeFollowerFormTag(user_id, tag).then(result => console.log(result));

//  4.
//data = ZaloOA.removeTag(tag).then(result => console.log(result));

// ---------------------------
// IV.
//  1.
//data = ZaloOA.registerIp(token, "10.30.30.30", "VNG");
//  2.
//data = ZaloOA.removeIp(token, "10.30.30.30", "VNG");

// ---------------------------
// V.
let buttons = [{
        call_to_actions: [{
            title: "Menu",
            type: "oa.action.parent",
            call_to_actions: [{
                title: "Liên hệ",
                type: "oa.open.phone",
                payload: "0123456789"
            }]
        }]
    },
    {
        call_to_actions: [{
            title: "Menu",
            type: "oa.action.parent",
            call_to_actions: [{
                    title: "Liên hệ",
                    type: "oa.open.phone",
                    payload: "0123456789"
                },
                {
                    title: "Đến shop",
                    type: "oa.open.url",
                    url: "https://developers.zalo.me/"
                }
            ]
        }]
    },
    {
        call_to_actions: [{
            title: "Menu",
            type: "oa.action.parent",
            call_to_actions: [{
                    title: "Liên hệ",
                    type: "oa.open.phone",
                    payload: "0123456789"
                },
                {
                    title: "Đến shop",
                    type: "oa.open.url",
                    url: "https://developers.zalo.me/"
                },
                {
                    title: "Đến shop",
                    type: "oa.open.url",
                    url: "https://developers.zalo.me/"
                }
            ]
        }]
    }
]
// data = ZaloOA.configureMenuOA(buttons).then(result => {
//     console.log(result);
// })
