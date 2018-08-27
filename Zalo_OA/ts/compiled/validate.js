import * as validator from 'validator';
import * as _ from 'lodash';
class Validate {
    constructor() {
    }
    accessToken(access_token) {
        if (_.isString(access_token) && !_.isEmpty(access_token)) {
            //console.log('Validate: access_token is valid');
            return true;
        }
        else {
            console.log('Validate: access_token is not a string or empty');
            return false;
        }
    }
    text(text) {
        if (_.isString(text)) {
            return true;
        }
        else {
            //console.log('Validate: text is not a string');
            return false;
        }
    }
    url(url) {
        if (validator.isURL(url)) {
            return true;
        }
        else {
            return false;
        }
    }
    userId(id) {
        if (_.isString(id) && !_.isEmpty(id)) {
            //console.log('Validate: user_id is valid');
            return true;
        }
        else {
            console.log('Validate: user_id is not a string or empty');
            return false;
        }
    }
    singleLink(title, subtitle, image_url, url) {
        let check_title = false;
        let check_subtitle = false;
        let check_image_url = false;
        let check_url = false;
        if (_.isString(title)) {
            check_title = true;
        }
        else {
            console.log("Validate: check_title is not a string");
        }
        if (_.isString(subtitle)) {
            check_subtitle = true;
        }
        else {
            console.log("Validate: subtitle is not a string");
        }
        if (validator.isURL(image_url)) {
            check_image_url = true;
        }
        else {
            console.log("Validate: image_url is not a valid url");
        }
        if (validator.isURL(url)) {
            check_url = true;
        }
        else {
            console.log("Validate: url is not a valid url");
        }
        if (check_title && check_subtitle && check_image_url && check_url) {
            return true;
        }
        else {
            return false;
        }
    }
    multiLink(list_link) {
        if (!_.isArray(list_link)) {
            console.log("Validate: list_link is not an array");
            return false;
        }
        else {
            list_link.forEach(link => {
                if (_.isEqual(Object.keys(link), ['title', 'subtitle', 'image_url', 'default_action'])) {
                    if (_.isEqual(Object.keys(link.default_action), ['type', 'url'])) {
                        if (!this.singleLink(link.title, link.subtitle, link.image_url, link.default_action.url)) {
                            return false;
                        }
                        else {
                            return true;
                        }
                    }
                    else {
                        console.log("Validate: Missing type or url field");
                        return false;
                    }
                    // if(!this.singleLink(link.title, link.subtitle, link.image_url, link.default_action.url)) {
                    //     return false
                    // }
                    //console.log(link)
                }
                else {
                    console.log("Validate: Missing fields of link ");
                    return false;
                }
            });
            return true;
        }
    }
    userRequest(text, title, subtitle, image_url) {
        let check_text = false;
        let check_title = false;
        let check_subtitle = false;
        let check_image_url = false;
        if (_.isString(text)) {
            check_text = true;
        }
        else {
            console.log("Validate: text is not a string");
        }
        if (_.isString(title)) {
            check_title = true;
        }
        else {
            console.log("Validate: check_title is not a string");
        }
        if (_.isString(subtitle)) {
            check_subtitle = true;
        }
        else {
            console.log("Validate: subtitle is not a string");
        }
        if (validator.isURL(image_url)) {
            check_image_url = true;
        }
        else {
            console.log("Validate: image_url is not a valid url");
        }
        if (check_text && check_title && check_subtitle && check_image_url) {
            return true;
        }
        else {
            return false;
        }
    }
    buttons(buttons) {
        if (_.isArray(buttons)) {
            if (buttons.length < 4) {
                for (let i = 0; i < buttons.length; i++) {
                    if (Object.keys(buttons[i])[0] === 'call_to_actions') {
                        // console.log(Object.keys(buttons[i])[0])
                        let parent_button = buttons[i]["call_to_actions"][0];
                        //console.log(Object.keys(parent_button) )
                        if (_.isEqual(Object.keys(parent_button), ['title', 'type', 'call_to_actions'])) {
                            if (!this.text(parent_button['title']) || parent_button['type'] !== 'oa.action.parent' || !_.isArray(parent_button['call_to_actions'])) {
                                return false;
                            }
                            else {
                                let child_button = parent_button['call_to_actions'];
                                for (let j = 0; j < child_button.length; j++) {
                                    if (_.isEqual(Object.keys(child_button[j]), ['title', 'type', 'payload']) || _.isEqual(Object.keys(child_button[j]), ['title', 'type', 'url'])) {
                                        if (!this.text(child_button[j].title)) {
                                            return false;
                                        }
                                        if (child_button[j].type !== 'oa.open.phone' && child_button[j].type !== 'oa.open.url' && child_button[j].type !== 'oa.query.show') {
                                            return false;
                                        }
                                        if (_.isEqual(Object.keys(child_button[j]), ['title', 'type', 'payload'])) {
                                            if (_.isString(child_button[j].payload)) {
                                                return true;
                                            }
                                            else {
                                                return false;
                                            }
                                        }
                                        else {
                                            if (validator.isURL(child_button[j].url)) {
                                                console.log(child_button[j].url);
                                                return true;
                                            }
                                            else {
                                                return false;
                                            }
                                        }
                                    }
                                    else {
                                        return false;
                                    }
                                }
                            }
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        return false;
                    }
                }
            }
            else {
                console.log("Validate: Maximum number of parent button is 3. \nYou've been setting up " + buttons.length + " buttons");
                return false;
            }
        }
        else {
            return false;
        }
    }
}
const validate = new Validate();
export default validate;
