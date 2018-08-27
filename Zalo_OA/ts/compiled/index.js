// Define constants
const token = 'Hsfk0JQ6f5bARsW0D8-kM4HWO0C_byik4JnTQ0wIa5ar11PNAhIGUbSx85XcYBPiTHquK7FoYdv9QWn7BOB6T50LKKrslSntKX5uSNIzupTY2Nuo7fMn8Gu_9Yy2lv8c9L8MO1_la4W6SrvkUE7EHW9HNqa7kPWF4H0SIMg_iXL11IGkVBEeCte05Ibgav80R78g84kSk090F1uPNRAkFbuiQH11iD48RXzw9r7rwHf0II8cOFQB1Hf0AbWS_f134NTNH0pvt7KYL4D7J5T9sVvhFPsZN0';
const user_id = '2258325342460503795';
import ZaloOA from './appZaloOA';
const ZOA = new ZaloOA(token);
// TESTING ZONE
let data = null;
data = ZOA.sendTextMessage(user_id, 'Hello').then((result) => {
}).catch((err) => {
});
//console.log(data)
