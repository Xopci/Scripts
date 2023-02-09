/*
[mitm]
hostname = nebula.kuaishou.com

[rewrite_local]
^https:\/\/nebula\.kuaishou\.com\/rest\/n\/nebula\/activity\/earn\/overview\/basicInfo? url script-response-body https://raw.githubusercontent.com/Xopci/Scripts/main/QuantumultX/Task/ks/ksname.js
^https:\/\/nebula\.kuaishou\.com\/rest\/n\/nebula\/(sign|box)\/(sign\?|explore.*?isOpen=true) url script-response-body https://raw.githubusercontent.com/Xopci/Scripts/main/QuantumultX/Task/ks/ksExtraCookies.js

[task_local]
0 30 7 * * ? https://raw.githubusercontent.com/Xopci/Scripts/main/QuantumultX/Task/ks/ksSign.js, tag=ks签到, enabled=true
0 0/20 * * * ? https://raw.githubusercontent.com/Xopci/Scripts/main/QuantumultX/Task/ks/ksBox.js, tag=ks宝箱, enabled=true

*/

let obj = JSON.parse($response.body);
let name = obj.data.userData.nickname;
$prefs.setValueForKey(name, 'ksuser')
console.log(name);
$done();

