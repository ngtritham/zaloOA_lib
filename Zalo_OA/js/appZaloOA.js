/**
 *
 * Lib ZOA Official Account API
 * https://developers.zalo.me/docs/official-account-api-147
 *
 */

// var {
//   appConfig
// } = require('../config/constants')
// appConfig = appConfig[appConfig.env]
const crypto = require('crypto')
const hash256 = crypto.createHash('sha256')

const axios = require('axios')
const moment = require('moment')
const _ = require('lodash')
const JSONbig = require('json-bigint')
const JSONstrict = require('json-bigint')({
	"strict": true
})
const JSONbigString = require('json-bigint')({
	"storeAsString": true
})

const validate = require('./validate');
// // Config proxy
// var isProxy = appConfig.isProxy;
// var proxy = appConfig.proxy;

const appID = '3685435022798396002'
const secretKey = '20GmfUL3GukSLOF33EU4'
const urlAPI = 'https://openapi.zalo.me/v2.0/oa/'
const default_access_token = 'Hsfk0JQ6f5bARsW0D8-kM4HWO0C_byik4JnTQ0wIa5ar11PNAhIGUbSx85XcYBPiTHquK7FoYdv9QWn7BOB6T50LKKrslSntKX5uSNIzupTY2Nuo7fMn8Gu_9Yy2lv8c9L8MO1_la4W6SrvkUE7EHW9HNqa7kPWF4H0SIMg_iXL11IGkVBEeCte05Ibgav80R78g84kSk090F1uPNRAkFbuiQH11iD48RXzw9r7rwHf0II8cOFQB1Hf0AbWS_f134NTNH0pvt7KYL4D7J5T9sVvhFPsZN0'


// Self define functions:
const isJSON = (body) => {
	if (!body) return false;
	if ('string' == typeof body) return false;
	if ('function' == typeof body.pipe) return false;
	if (Buffer.isBuffer(body)) return false;
	return true;
}

/**
 *
 * https://oauth.zaloapp.com/v3/oa/permission?app_id=3685435022798396002&oaId=1202635083231104313&redirect_uri=http://app.event.zalo.me/zs/app/callback
 * @class zaloOfficalAccount
 */
class zaloOfficalAccount {
	constructor(access_token = null) {
		if (_.isString(access_token) === false) {
			if (_.isNull(access_token) || _.isNaN(access_token)) {
				console.log(`Constructor ZaloOA: access_token is not a string, it's a ${access_token}) \n Have set access_token = default_access_token`)
			} else {
				console.log(`Constructor ZaloOA: access_token is not a string, it's a ${typeof access_token}) \n Have set access_token = default_access_token`)
			}
			this.default_access_token = default_access_token
		} else {
			console.log(`Constructor ZaloOA: access_token is valid`)
			this.default_access_token = access_token
		}

		this.expire = 5000; // 5000 miliseconds
	}

	/**
	 *
	 *
	 * @param {string} [oa_id='']
	 * @returns
	 * @memberof zaloOfficalAccount
	 */
	async getURLPermission(oa_id = '') {
		let url = `https://oauth.zaloapp.com/v3/oa/permission?app_id=${appID}&oaId=${oa_id}&redirect_uri=http://app.event.zalo.me/zs/app/callback`
		return url
	}

	// I. Send message
	//  1. Send text message

	/**
	 *
	 *
	 * @param {string} [access_token=null]
	 * @param {string} [user_id='']
	 * @param {string} [text='']
	 * @returns
	 * @memberof zaloOfficalAccount
	 */
	sendTextMessage(user_id = '', text = '', access_token = null) {
		console.log('sendTextMessage')
		let url_api = ``;

		// Setup access_token
		if (validate.accessToken(access_token)) {
			url_api = `${urlAPI}message?access_token=${access_token}`
		} else {
			console.log("sendTextMessage: Invalid access_token !");
			url_api = `${urlAPI}message?access_token=${this.default_access_token}`
		}

		console.log(url_api);
		// Check user_id & text
		if (!validate.userId(user_id)) {
			return false;
		} else if (!validate.text(text)) {
			return false;
		} else {
			return new Promise(resolve => {
				axios.post(url_api, {
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
							//console.log(response.data)

							if (isJSON(response.data)) {
								resolve(response.data)
							} else {
								resolve(false)
							}
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

	}

	//  2. Send pattern message
	//    a. Send media message as image attachment
	// TODO: fix send gif image after upload
	/**
	 *
	 *
	 * @param {string} [access_token=null]
	 * @param {string} [user_id='']
	 * @param {string} [text='']
	 * @param {Object} elements
	 * @returns
	 * @memberof zaloOfficalAccount
	 */
	sendMediaMessage(user_id = '', text = '', elements = [], access_token = null) {
		console.log('sendMediaMessage')

		let url_api = `${urlAPI}message?access_token=${access_token}`

		//console.log(url_api);
		// let img_ext = url.split(".").slice(-1)[0]; // Get extention of image file
		// let media_type = '';
		// if (img_ext === "gif") {
		// 	media_type = "gif";
		// } else {
		// 	media_type = "image"
		// }

		// Setup access_token
		if (_.isString(access_token) && access_token.length > 0) {
			url_api = `${urlAPI}message?access_token=${access_token}`
		} else {
			console.log("sendTextMessage: Invalid access_token !");
			url_api = `${urlAPI}message?access_token=${this.default_access_token}`
		}

		//Check user_id & text
		if (!validate.userId(user_id)) {
			return false;
		} else if (validate.text(text)) {
			return false;
		} else if (_.isArray(elements) == false || _.isEmpty(elements)) {
			console.log("elements is not an array or empty");
			return Promise.reject(new Error());
		} else {
			return new Promise(resolve => {
				axios.post(url_api, {
						recipient: {
							user_id: user_id
						},
						message: {
							text: text,
							attachment: {
								type: "template",
								payload: {
									template_type: "media",
									elements: elements
								}
							}
						}
					})
					.then(response => {
						console.log(response.status);
						if (response.status == 200) {
							//console.log(response.data)
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


	}

	//    b. Send message with signle link attachment

	/**
	 *
	 *
	 * @param {string} [access_token=null]
	 * @param {string} [user_id='']
	 * @param {string} [title='']
	 * @param {string} [subtitle='']
	 * @param {string} [image_url='']
	 * @param {string} [url='']
	 * @returns
	 * @memberof zaloOfficalAccount
	 */
	sendSingleLinkMessage(user_id = '', title = '', subtitle = '', image_url = '', url = '', access_token = null) {
		console.log('sendSingleLinkMessage')

		let url_api = ``;
		// Setup access_token
		if (validate.accessToken(access_token)) {
			url_api = `${urlAPI}message?access_token=${access_token}`
		} else {
			url_api = `${urlAPI}message?access_token=${this.default_access_token}`
		}

		//console.log(url_api)

		if(!validate.singleLink(title, subtitle, image_url, url)) {
			return false
		} else {
			console.log(url_api);
			return new Promise(resolve => {
				axios.post(url_api, {
						recipient: {
							user_id: user_id
						},
						message: {
							attachment: {
								type: "template",
								payload: {
									template_type: "list",
									elements: [{
										title: title,
										subtitle: subtitle,
										image_url: image_url,
										default_action: {
											type: "oa.open.url",
											url: url
										}
									}]
								}
							}
						}
					})
					.then(response => {
						console.log(response.status);
						if (response.status == 200) {
							//console.log(response.data)
							if (isJSON(response.data)) {
								resolve(response.data)
							} else {
								resolve(false)
							}
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
	}

	//    c. Send message with list multi link attachment

	/**
	 *
	 *
	 * @param {string} [access_token=null]
	 * @param {string} [user_id='']
	 * @param {Object[]} list_link
	 * @returns
	 * @memberof zaloOfficalAccount
	 */
	sendMultiLinkMessage(user_id = '', list_link = [], access_token = null) {
		console.log('sendMultiLinkMessage')

		let url_api = ``;
		// Setup access_token
		if (validate.accessToken(access_token)) {
			url_api = `${urlAPI}message?access_token=${access_token}`
		} else {
			//console.log("sendMultiLinkMessage: Invalid access_token !");
			url_api = `${urlAPI}message?access_token=${this.default_access_token}`
		}

		//console.log(url_api)

		if (!validate.userId(user_id)) {
			return false;
		} else if (!validate.multiLink(list_link)) {
			return false;
		} else {
			return new Promise(resolve => {
				axios.post(url_api, {
						recipient: {
							user_id: user_id
						},
						message: {
							attachment: {
								type: "template",
								payload: {
									template_type: "list",
									elements: list_link
								}
							}
						}
					})
					.then(response => {
						console.log(response.status);
						if (response.status == 200) {
							//console.log(response.data)

							if (isJSON(response.data)) {
								resolve(response.data)
							} else {
								resolve(false)
							}
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
	}

	//    d. Send message with user request
	/**
	 *
	 *
	 * @param {string} [access_token=null]
	 * @param {string} [user_id='']
	 * @param {string} [text='']
	 * @param {string} [title='']
	 * @param {string} [subtitle='']
	 * @param {string} [image_url='']
	 * @returns
	 * @memberof zaloOfficalAccount
	 */
	sendUserRequestMessage(user_id = '', text = '', title = '', subtitle = '', image_url = '', access_token = null) {
		console.log('sendUserRequestMessage')

		let url_api = ``;
		// Setup access_token
		if (validate.accessToken(access_token)) {
			url_api = `${urlAPI}message?access_token=${access_token}`
		} else {
			url_api = `${urlAPI}message?access_token=${this.default_access_token}`
		}

		if (!validate.userRequest(text, title, subtitle, image_url)) {
			return false
		} else {
			return new Promise(resolve => {
				axios.post(url_api, {
						recipient: {
							user_id: user_id
						},
						message: {
							text: text,
							attachment: {
								type: "template",
								payload: {
									template_type: "request_user_info",
									elements: [{
										title: title,
										subtitle: subtitle,
										image_url: image_url
									}]
								}
							}
						}
					})
					.then(response => {
						console.log(response.status);
						if (response.status == 200) {
							//console.log(response.data)

							if (isJSON(response.data)) {
								resolve(response.data)
							} else {
								resolve(false)
							}
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
	}

	// II. Get information
	// 1. Get profile

	/**
	 *
	 *
	 * @param {string} [access_token=null]
	 * @param {string} [user_id='']
	 * @returns
	 * @memberof zaloOfficalAccount
	 */
	getProfile(user_id = '', access_token = null) {
		console.log('getProfile')

		let url_api = `${urlAPI}getprofile`

		let data_push = {
			access_token: null,
			data: {
				user_id: null
			}
		}

		if (validate.accessToken(access_token)) {
			data_push.access_token = access_token
		} else {
			data_push.access_token = this.default_access_token
		}


		if (!validate.userId(user_id)) {
			return false;
		} else {
			data_push.data.user_id = user_id

			return new Promise(resolve => {
				axios.get(`${url_api}`, {
						params: data_push,
						transformResponse: data => JSONbigString.parse(data)
					})
					.then(response => {
						console.log(response.status);
						if (response.status == 200) {
							//console.log(response.data)

							if (isJSON(response.data)) {
								resolve(response.data)
							} else {
								resolve(false)
							}
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



	}

	// 2. Get OA's profile

	/**
	 *
	 *
	 * @param {string} [access_token=null]
	 * @returns
	 * @memberof zaloOfficalAccount
	 */
	getOA(access_token = null) {
		console.log('getOA')

		let url_api = `${urlAPI}getoa`

		let data_push = {
			access_token: null
		}

		if (validate.accessToken(access_token)) {
			data_push.access_token = access_token
		} else {
			data_push.access_token = this.default_access_token
		}

		return new Promise(resolve => {
			axios.get(`${url_api}`, {
					params: data_push,
					transformResponse: data => JSONbigString.parse(data)
				})
				.then(response => {
					if (response.status == 200) {
						//console.log(response.data)

						if (isJSON(response.data)) {
							resolve(response.data)
						} else {
							resolve(false)
						}
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
	// -------------------------------------------------------------------------
	// 3. Get followers list

	/**
	 *
	 *
	 * @param {string} [accessToken=null]
	 * @param {number} [offset=0]
	 * @param {number} [count=20]
	 * @returns
	 * @memberof zaloOfficalAccount
	 */
	getFollowers(offset = 0, count = 20, access_token = null) {
		console.log('getFollowers')

		let url_api = `${urlAPI}getfollowers`
		let data_push = {
			access_token: null,
			data: {
				offset: offset,
				count: count
			}
		}

		if(validate.accessToken(access_token)) {
			data_push.access_token = access_token
		} else {
			data_push.access_token = this.default_access_token
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

	// 4. Get list recent chat

	/**
	 *
	 *
	 * @param {string} [accessToken=null]
	 * @param {number} [offset=0]
	 * @param {number} [count=10]
	 * @returns
	 * @memberof zaloOfficalAccount
	 */
	getRecentChatList(offset = 0, count = 10, access_token = null) {
		console.log('getListRecentChat')

		let url_api = `${urlAPI}listrecentchat`

		let data_push = {
			access_token: null,
			data: {
				offset: offset,
				count: count
			}
		}

		if(validate.accessToken(access_token)) {
			data_push.access_token = access_token
		} else {
			data_push.access_token = this.default_access_token
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

	// 5. Get conversation with followers

	/**
	 *
	 *
	 * @param {string} [accessToken=null]
	 * @param {string} [user_id='']
	 * @param {number} [offset=0]
	 * @param {number} [count=10]
	 * @returns
	 * @memberof zaloOfficalAccount
	 */
	getConversation(user_id = '', offset = 0, count = 10, access_token = null) {
		console.log('getConversation')

		if(!validate.accessToken(access_token)) {
			access_token = this.default_access_token
		}

		if (!validate.userId(user_id)) {
			return false;
		} else {
			let url_api = `${urlAPI}conversation?access_token=${access_token}&data={"user_id"=${user_id},"offset"=${offset},"count"=${count}}`
			return new Promise(resolve => {
				axios.get(`${url_api}`)
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
	}

	// III. Tags
	// 1. Get tags list of OA
	/**
	 *
	 *
	 * @param {string} [access_token=null]
	 * @returns
	 * @memberof zaloOfficalAccount
	 */
	getTagsOfOA(access_token = null) {
		console.log('getTagsOfOA')

		let url_api = `${urlAPI}tag/gettagsofoa`
		let data_push = {
			access_token: null
		}

		if(validate.accessToken(access_token)) {
			data_push.access_token = access_token
		} else {
			data_push.access_token = this.default_access_token
		}

		return new Promise(resolve => {
			axios.get(`${url_api}`, {
					params: data_push,
					transformResponse: data => JSONbigString.parse(data)
				})
				.then(response => {
					console.log(response.status);
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

	// 2. Set tag to follower

	/**
	 *
	 *
	 * @param {string} [access_token=null]
	 * @param {string} [user_id='']
	 * @param {string} [tag_name='']
	 * @returns
	 * @memberof zaloOfficalAccount
	 */
	setTagToFollower(user_id = '', tag_name = '', access_token = null) {
		console.log('setTagToFollower')

		let url_api = null

		// Setup access_token
		if (validate.accessToken(access_token)) {
			url_api = `${urlAPI}tag/tagfollower?access_token=${access_token}`
		} else {
			url_api = `${urlAPI}tag/tagfollower?access_token=${this.default_access_token}`
		}

		if (!validate.userId(user_id)) {
			return false
		} else if (!validate.text(tag_name)) {
			return false
		} else {
			let data_push = {
				user_id: user_id,
				tag_name: tag_name
			}

			return new Promise(resolve => {
				axios.post(`${url_api}`, data_push)
					.then(response => {
						console.log(response.status);
						if (response.status == 200) {
							//console.log(response.data)
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

	}

	// 3. Remove follower form tag

	/**
	 *
	 *
	 * @param {string} [access_token=null]
	 * @param {string} [user_id='']
	 * @param {string} [tag_name='']
	 * @returns
	 * @memberof zaloOfficalAccount
	 */
	removeFollowerFormTag(user_id = '', tag_name = '', access_token = null) {
		console.log('removeFollowerFormTag')

		let url_api = null

		// Setup access_token
		if (validate.accessToken(access_token)) {
			url_api = `${urlAPI}tag/rmfollowerfromtag?access_token=${access_token}`
		} else {
			url_api = `${urlAPI}tag/rmfollowerfromtag?access_token=${this.default_access_token}`
		}

		if (!validate.userId(user_id)) {
			return false
		} else if (!validate.text(tag_name)) {
			return false
		} else {
			return new Promise(resolve => {
				axios.post(`${url_api}`, {
						user_id: user_id,
						tag_name: tag_name
					})
					.then(response => {
						console.log(response.status);
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


	}

	// 4. Remove tag

	/**
	 *
	 *
	 * @param {string} [access_token=null]
	 * @param {string} [tag_name='']
	 * @returns
	 * @memberof zaloOfficalAccount
	 */
	removeTag(tag_name = '', access_token = null) {
		console.log('removeTag')

		let url_api = null

		// Setup access_token
		if (validate.accessToken(access_token)) {
			url_api = `${urlAPI}tag/rmtag?access_token=${access_token}`
		} else {
			url_api = `${urlAPI}tag/rmtag?access_token=${this.default_access_token}`
		}

		if(!validate.text(tag_name)) {
			return false
		} else {
			return new Promise(resolve => {
				axios.post(`${url_api}`, {
						tag_name: tag_name
					})
					.then(response => {
						console.log(response.status);
						if (response.status == 200) {
							//console.log(response.data)
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

	}


	// IV. Register & remove IP

	// 1. Register
	// TODO: { errorCode: -212, errorMsg: 'oa has not registed this api' } }
	/**
	 *
	 *
	 * @param {string} [access_token=null]
	 * @param {string} [ip='']
	 * @param {string} [name='']
	 * @returns
	 * @memberof zaloOfficalAccount
	 */
	registerIp(ip = '', name = '', access_token = null) {
		console.log('registerIp')

		let url_api = `${urlAPI}registerip?access_token=${access_token}`

		console.log(url_api);
		return new Promise(resolve => {
			axios.post(url_api, {
					ip: ip,
					name: name
				})
				.then(response => {
					console.log(response.status);
					if (response.status == 200) {
						//console.log(response.data)
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

	// 2. Remove
	// TODO:  test { errorCode: -212, errorMsg: 'oa has not registed this api' }
	/**
	 *
	 *
	 * @param {string} [access_token=null]
	 * @param {string} [ip='']
	 * @param {string} [name='']
	 * @returns
	 * @memberof zaloOfficalAccount
	 */
	removeIp(ip = '', name = '', access_token = null) {
		console.log('registerIp')

		let url_api = `${urlAPI}removeip?access_token=${access_token}`

		console.log(url_api);
		return new Promise(resolve => {
			axios.post(url_api, {
					ip: ip,
					name: name
				})
				.then(response => {
					console.log(response.status);
					if (response.status == 200) {
						//console.log(response.data)
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

	// V. Configure menu for OA

	/**
	 *
	 *
	 * @param {string} [access_token=null]
	 * @param {Object[]} buttons
	 * @returns
	 * @memberof zaloOfficalAccount
	 */

	configureMenuOA(buttons = [], access_token = null) {
		console.log('configureMenuOA')

		let url_api = null

		// Setup access_token
		if (validate.accessToken(access_token)) {
			url_api = `${urlAPI}menu?access_token=${access_token}`
		} else {
			url_api = `${urlAPI}menu?access_token=${this.default_access_token}`
		}

		if(!validate.buttons(buttons)) {
			return false
		} else {
			return new Promise(resolve => {
				axios.post(`${url_api}`, {
						offical_account_menu: buttons
					})
					.then(response => {
						//console.log(response.status);
						if (response.status == 200) {
							//console.log(response.data)
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


	}
	// VI. Group

	// 1. Get groups of OA
	/**
	 *
	 *
	 * @param {string} [access_token='']
	 * @returns
	 * @memberof zaloOfficalAccount
	 */
	getGroupsOfOA(access_token = null) {
		console.log('getGroupsOfOA')

		let url_api = `${urlAPI}group/getgroupsofoa`
		let data_push = {
			access_token: access_token
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

	// 2. Get group infomation
	// TODO: Chưa có group_id để test
	/**
	 *
	 *
	 * @param {string} [accessToken='']
	 * @param {number} [group_id='']
	 * @returns
	 * @memberof zaloOfficalAccount
	 */
	getGroup(access_token = '', group_id = '') {
		console.log('getGroup')

		let url_api = `${urlAPI}group/getgroup`
		let data_push = {
			access_token: access_token,
			data: {
				group_id: group_id
			}
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

	// 3. Send message to group

	/**
	 *
	 *
	 * @param {string} [access_token='']
	 * @param {string} [user_id='']
	 * @param {string} [tag_name='']
	 * @returns
	 * @memberof zaloOfficalAccount
	 */
	sendMessageToGroup(access_token = '', tag_name = '', user_id = '') {
		console.log('removeFollowerFormTag')

		let url_api = `${urlAPI}message?access_token=${access_token}`

		console.log(url_api);
		return new Promise(resolve => {
			axios.post(url_api, {
					user_id: user_id,
					tag_name: tag_name
				})
				.then(response => {
					console.log(response.status);
					if (response.status == 200) {
						//console.log(response.data)
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
}

module.exports = zaloOfficalAccount