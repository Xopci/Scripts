
/**
 * @fileoverview Example to compose HTTP request
 * and handle the response.
 *
 */

let obj = JSON.parse($response.body);
let name = obj.data.userData.nickname;
$prefs.setValueForKey(name, 'ksuser')
console.log(name);
$done();

