// Self define functions:
// const isJSON = (body) => {
//     if (!body) return false;
//     if ('string' == typeof body) return false;
//     if ('function' == typeof body.pipe) return false;
//     if (Buffer.isBuffer(body)) return false;
//     return true;
// }

// let a = JSON.stringify({
//     a: 1
// })

// console.log(isJSON(a));

const validate = require('./validate');

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

// console.log(validate.multiLink(list))

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
console.log(validate.buttons(buttons))