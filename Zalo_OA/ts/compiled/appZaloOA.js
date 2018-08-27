import * as _ from 'lodash';
import validate from './validate';
import * as axios from 'axios';
const secretKey = '20GmfUL3GukSLOF33EU4';
const urlAPI = 'https://openapi.zalo.me/v2.0/oa/';
// Self define functions:
const isJSON = (body) => {
    // if (!body) return false;
    // if ('string' == typeof body) return false;
    // if ('function' == typeof body.pipe) return false;
    // if (Buffer.isBuffer(body)) return false;
    // return true;
};
export default class zaloOfficalAccount {
    constructor(access_token = null) {
        this.default_access_token = null;
        this.expired_time = 5000; // miliseconds
        if (_.isString(access_token)) {
            console.log(`Constructor ZaloOA: access_token is valid`);
            this.default_access_token = access_token;
        }
        else {
            if (_.isNull(access_token)) {
                console.log(`Constructor ZaloOA: access_token is NULL`);
            }
            else {
                console.log(`Constructor ZaloOA: access_token is not a string`);
            }
        }
    }
    sendTextMessage(user_id = '', text = '', access_token = null) {
        console.log('sendTextMessage');
        let url_api = ``;
        // Setup access_token
        if (validate.accessToken(access_token)) {
            url_api = `${urlAPI}message?access_token=${access_token}`;
        }
        else {
            console.log("sendTextMessage: Invalid access_token !");
            url_api = `${urlAPI}message?access_token=${this.default_access_token}`;
        }
        console.log(url_api);
        // Check user_id & text
        if (!validate.userId(user_id)) {
            return Promise.reject(new Error('user_id is invalid'));
        }
        else if (!validate.text(text)) {
            return Promise.reject(new Error('text is invalid'));
        }
        else {
            return new Promise(resolve => {
                axios.default.post(url_api, {
                    recipient: {
                        user_id: user_id
                    },
                    message: {
                        text: text
                    }
                })
                    .then(response => {
                    console.log(response.status);
                    if (response.status == 200) {
                        console.log(response.data);
                        if (isJSON(response.data)) {
                            resolve(response.data);
                        }
                        else {
                            resolve(false);
                        }
                        console.log(response.data);
                        resolve(response.data);
                    }
                    else {
                        resolve(false);
                    }
                })
                    .catch(error => {
                    console.error(error);
                    resolve(false);
                });
            });
        }
    }
}
