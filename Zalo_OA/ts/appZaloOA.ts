import * as _ from 'lodash'
import validate from './validate'
import * as axios from 'axios'
import * as jsonBigInt from 'json-bigint'
import { rejects } from 'assert';
const JSONbigString = jsonBigInt({
	"storeAsString": true
})

const secretKey = '20GmfUL3GukSLOF33EU4'
const urlAPI = 'https://openapi.zalo.me/v2.0/oa/'


// Self define functions:
let isJSON = (str) => {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

export default class zaloOfficalAccount {
	default_access_token = null;
	expired_time = 5000; // miliseconds

	constructor(access_token = null) {
		if (_.isString(access_token)) {
			console.log(`Constructor ZaloOA: access_token is valid`);
			this.default_access_token = access_token;
		} else {
			if (_.isNull(access_token)) {
				console.log(`Constructor ZaloOA: access_token is NULL`);
			} else {
				console.log(`Constructor ZaloOA: access_token is not a string`);
			}
		}
	}

	sendTextMessage(user_id: string = '', text: string = '', access_token: string = null): Promise<any> {
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
			return Promise.reject(new Error('user_id is invalid'));
		} else if (!validate.text(text)) {
			return Promise.reject(new Error('text is invalid'));
		} else {
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

	sendSingleLinkMessage(user_id: string = '', title: string = '', subtitle: string = '', image_url: string = '', url: string = '', access_token: string = null): Promise<any> {
		console.log('sendSingleLinkMessage')

		let url_api = ``;
		// Setup access_token
		if (validate.accessToken(access_token)) {
			url_api = `${urlAPI}message?access_token=${access_token}`
		} else {
			url_api = `${urlAPI}message?access_token=${this.default_access_token}`
		}

		//console.log(url_api)

		if (!validate.singleLink(title, subtitle, image_url, url)) {
			return Promise.reject(new Error('link is invalid'));
		} else {
			console.log(url_api);
			return new Promise(resolve => {
				axios.default.post(url_api, {
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
							// if (isJSON(response.data)) {
							// 	resolve(response.data)
							// } else {
							// 	resolve(false)
							// }
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

	sendMultiLinkMessage(user_id: string = '', list_link: Array<Object> = [], access_token: string = null) {
		console.log('sendMultiLinkMessage')

		let url_api = ``;
		// Setup access_token
		if (validate.accessToken(access_token)) {
			url_api = `${urlAPI}message?access_token=${access_token}`
		} else {
			url_api = `${urlAPI}message?access_token=${this.default_access_token}`
		}

		//console.log(url_api)

		if (!validate.userId(user_id)) {
			return Promise.reject(new Error('user_id is invalid'));
		} else if (!validate.multiLink(list_link)) {
			return Promise.reject(new Error('list_link is invalid'));
		} else {
			return new Promise((resolve, reject) => {
				axios.default.post(url_api, {
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

							// if (isJSON(response.data)) {
							// 	resolve(response.data)
							// } else {
							// 	reject(false)
							// }
							resolve(response.data)
						} else {
							reject(new Error(`Status: ${response.status} Get data fail`))
						}
					})
					.catch(error => {
						console.error(error)
						reject(new Error(error))
					})
			})
		}
	}

	sendUserRequestMessage(user_id: string = '', text: string = '', title: string = '', subtitle: string = '', image_url: string = '', access_token: string = null): Promise<any> {
		console.log('sendUserRequestMessage')

		let url_api = ``;
		// Setup access_token
		if (validate.accessToken(access_token)) {
			url_api = `${urlAPI}message?access_token=${access_token}`
		} else {
			url_api = `${urlAPI}message?access_token=${this.default_access_token}`
		}

		if (!validate.userRequest(text, title, subtitle, image_url)) {
			return Promise.reject(new Error('userRequest is invalid'))
		} else {
			return new Promise((resolve, reject) => {
				axios.default.post(url_api, {
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
						if (response.status == 200) {
							//console.log(response.data)
							resolve(response.data)
						} else {
							reject(new Error(`Status: ${response.status} Get data fail`))
						}
					})
					.catch(error => {
						reject(new Error(error))
					})
			})
		}
	}

	getProfile(user_id: string = '', access_token: string = null) {
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
			return Promise.reject(new Error('user_id is invalid'));
		} else {
			data_push.data.user_id = user_id

			return new Promise((resolve, reject) => {
				axios.default.get(`${url_api}`, {
					params: data_push,
					transformResponse: data => JSONbigString.parse(data)
				})
					.then(response => {
						console.log(response.status);
						if (response.status == 200) {
							//console.log(response.data)
							resolve(response.data)
						} else {
							reject(new Error(`Status: ${response.status} Get data fail`))
						}
					})
					.catch(error => {
						reject(new Error(error))
					})
			})
		}
	}

	getOA(access_token: string = null) {
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

		return new Promise((resolve, reject) => {
			axios.default.get(`${url_api}`, {
				params: data_push,
				transformResponse: data => JSONbigString.parse(data)
			})
				.then(response => {
					console.log(response.status);
					if (response.status == 200) {
						//console.log(response.data)
						resolve(response.data)
					} else {
						reject(new Error(`Status: ${response.status} Get data fail`))
					}
				})
				.catch(error => {
					reject(new Error(error))
				})
		})
	}

	getFollowers(offset: number = 0, count: number = 20, access_token: string = null) {
		console.log('getFollowers')

		let url_api = `${urlAPI}getfollowers`
		let data_push = {
			access_token: null,
			data: {
				offset: offset,
				count: count
			}
		}

		if (validate.accessToken(access_token)) {
			data_push.access_token = access_token
		} else {
			data_push.access_token = this.default_access_token
		}

		return new Promise((resolve, reject) => {
			axios.default.get(`${url_api}`, {
				params: data_push,
				transformResponse: data => JSONbigString.parse(data)
			})
				.then(response => {
					console.log(response.status);
					if (response.status == 200) {
						//console.log(response.data)
						resolve(response.data)
					} else {
						reject(new Error(`Status: ${response.status} Get data fail`))
					}
				})
				.catch(error => {
					reject(new Error(error))
				})
		})
	}

	getRecentChatList(offset: number = 0, count: number = 10, access_token: string = null) {
		console.log('getListRecentChat')

		let url_api = `${urlAPI}listrecentchat`

		let data_push = {
			access_token: null,
			data: {
				offset: offset,
				count: count
			}
		}

		if (validate.accessToken(access_token)) {
			data_push.access_token = access_token
		} else {
			data_push.access_token = this.default_access_token
		}

		return new Promise((resolve, reject) => {
			axios.default.get(`${url_api}`, {
				params: data_push,
				transformResponse: data => JSONbigString.parse(data)
			})
				.then(response => {
					console.log(response.status);
					if (response.status == 200) {
						//console.log(response.data)
						resolve(response.data)
					} else {
						reject(new Error(`Status: ${response.status} Get data fail`))
					}
				})
				.catch(error => {
					reject(new Error(error))
				})
		})
	}

	getConversation(user_id: string = '', offset: number = 0, count: number = 10, access_token: string = null) {
		console.log('getConversation')

		if (!validate.accessToken(access_token)) {
			access_token = this.default_access_token
		}

		if (!validate.userId(user_id)) {
			return false;
		} else {
			let url_api = `${urlAPI}conversation?access_token=${access_token}&data={"user_id"=${user_id},"offset"=${offset},"count"=${count}}`
			return new Promise((resolve, reject) => {
				axios.default.get(`${url_api}`)
					.then(response => {
						console.log(response.status);
						if (response.status == 200) {
							//console.log(response.data)
							resolve(response.data)
						} else {
							reject(new Error(`Status: ${response.status} Get data fail`))
						}
					})
					.catch(error => {
						reject(new Error(error))
					})
			})
		}
	}

	getTagsOfOA(access_token: string = null) {
		console.log('getTagsOfOA')

		let url_api = `${urlAPI}tag/gettagsofoa`
		let data_push = {
			access_token: null
		}

		if (validate.accessToken(access_token)) {
			data_push.access_token = access_token
		} else {
			data_push.access_token = this.default_access_token
		}

		return new Promise((resolve, reject) => {
			axios.default.get(`${url_api}`, {
				params: data_push,
				transformResponse: data => JSONbigString.parse(data)
			})
				.then(response => {
					console.log(response.status);
					if (response.status == 200) {
						//console.log(response.data)
						resolve(response.data)
					} else {
						reject(new Error(`Status: ${response.status} Get data fail`))
					}
				})
				.catch(error => {
					reject(new Error(error))
				})
		})
	}

	setTagToFollower(user_id: string = '', tag_name: string = '', access_token: string = null) {
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

			return new Promise((resolve, reject) => {
				axios.default.post(`${url_api}`, data_push)
					.then(response => {
						console.log(response.status);
						if (response.status == 200) {
							//console.log(response.data)
							resolve(response.data)
						} else {
							reject(new Error(`Status: ${response.status} Get data fail`))
						}
					})
					.catch(error => {
						reject(new Error(error))
					})
			})
		}
	}

	removeFollowerFormTag(user_id: string = '', tag_name: string = '', access_token: string = null) {
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
			return new Promise((resolve, reject) => {
				axios.default.post(`${url_api}`, {
					user_id: user_id,
					tag_name: tag_name
				})
					.then(response => {
						console.log(response.status);
						if (response.status == 200) {
							//console.log(response.data)
							resolve(response.data)
						} else {
							reject(new Error(`Status: ${response.status} Get data fail`))
						}
					})
					.catch(error => {
						reject(new Error(error))
					})
			})
		}
	}

	removeTag(tag_name: string = '', access_token: string = null) {
		console.log('removeTag')

		let url_api = null

		// Setup access_token
		if (validate.accessToken(access_token)) {
			url_api = `${urlAPI}tag/rmtag?access_token=${access_token}`
		} else {
			url_api = `${urlAPI}tag/rmtag?access_token=${this.default_access_token}`
		}

		if (!validate.text(tag_name)) {
			return false
		} else {
			return new Promise((resolve, reject) => {
				axios.default.post(`${url_api}`, {
					tag_name: tag_name
				})
					.then(response => {
						console.log(response.status);
						if (response.status == 200) {
							//console.log(response.data)
							resolve(response.data)
						} else {
							reject(new Error(`Status: ${response.status} Get data fail`))
						}
					})
					.catch(error => {
						reject(new Error(error))
					})
			})
		}
	}

	registerIp(ip: string = '', name: string = '', access_token: string = null) {
		console.log('registerIp')

		let url_api = `${urlAPI}registerip?access_token=${access_token}`

		console.log(url_api);
		return new Promise((resolve, reject) => {
			axios.default.post(url_api, {
				ip: ip,
				name: name
			})
				.then(response => {
					console.log(response.status);
					if (response.status == 200) {
						//console.log(response.data)
						resolve(response.data)
					} else {
						reject(new Error(`Status: ${response.status} Get data fail`))
					}
				})
				.catch(error => {
					reject(new Error(error))
				})
		})
	}

	removeIp(ip: string = '', name: string = '', access_token: string = null) {
		console.log('registerIp')

		let url_api = `${urlAPI}removeip?access_token=${access_token}`

		console.log(url_api);
		return new Promise((resolve, reject) => {
			axios.default.post(url_api, {
					ip: ip,
					name: name
				})
				.then(response => {
					console.log(response.status);
					if (response.status == 200) {
						//console.log(response.data)
						resolve(response.data)
					} else {
						reject(new Error(`Status: ${response.status} Get data fail`))
					}
				})
				.catch(error => {
					reject(new Error(error))
				})
		})
	}

	configureMenuOA(buttons: Array<Object> = [], access_token: string = null) {
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
			return new Promise((resolve, reject) => {
				axios.default.post(`${url_api}`, {
						offical_account_menu: buttons
					})
					.then(response => {
						console.log(response.status);
						if (response.status == 200) {
							//console.log(response.data)
							resolve(response.data)
						} else {
							reject(new Error(`Status: ${response.status} Get data fail`))
						}
					})
					.catch(error => {
						reject(new Error(error))
					})
			})
		}
	}

	getGroupsOfOA(access_token: string = null) {
		console.log('getGroupsOfOA')

		let url_api = `${urlAPI}group/getgroupsofoa`
		let data_push = {
			access_token: access_token
		}

		return new Promise((resolve, reject) => {
			axios.default.get(`${url_api}`, {
					params: data_push,
					transformResponse: data => JSONbigString.parse(data)
				})
				.then(response => {
					console.log(response.status);
					if (response.status == 200) {
						//console.log(response.data)
						resolve(response.data)
					} else {
						reject(new Error(`Status: ${response.status} Get data fail`))
					}
				})
				.catch(error => {
					reject(new Error(error))
				})
		})
	}

	getGroup(group_id: string = '', access_token: string = null) {
		console.log('getGroup')

		let url_api = `${urlAPI}group/getgroup`
		let data_push = {
			access_token: access_token,
			data: {
				group_id: group_id
			}
		}

		return new Promise((resolve, reject) => {
			axios.default.get(`${url_api}`, {
					params: data_push,
					transformResponse: data => JSONbigString.parse(data)
				})
				.then(response => {
					console.log(response.status);
					if (response.status == 200) {
						//console.log(response.data)
						resolve(response.data)
					} else {
						reject(new Error(`Status: ${response.status} Get data fail`))
					}
				})
				.catch(error => {
					reject(new Error(error))
				})
		})
	}

	sendMessageToGroup(tag_name: string = '', user_id: string = '', access_token: string = '') {
		console.log('removeFollowerFormTag')

		let url_api = `${urlAPI}message?access_token=${access_token}`

		console.log(url_api);
		return new Promise((resolve, reject) => {
			axios.default.post(url_api, {
					user_id: user_id,
					tag_name: tag_name
				})
				.then(response => {
					console.log(response.status);
					if (response.status == 200) {
						//console.log(response.data)
						resolve(response.data)
					} else {
						reject(new Error(`Status: ${response.status} Get data fail`))
					}
				})
				.catch(error => {
					reject(new Error(error))
				})
		})
	}
}