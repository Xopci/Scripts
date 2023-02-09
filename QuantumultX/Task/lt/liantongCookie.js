/*
[mitm]
hostname = m.client.10010.com

[rewrite_local]
^https:\/\/m\.client\.10010\.com\/mobileService\/customer\/query\/getMyUnicomDateTotle url script-response-body https://raw.githubusercontent.com/Xopci/Scripts/main/QuantumultX/Task/lt/liantongCookie.js

[task_local]
0 30 7 * * ? https://raw.githubusercontent.com/Xopci/Scripts/main/QuantumultX/Task/lt/liantongQd.js, tag=联通签到, enabled=true

*/


if ($request.url.indexOf("/mobileService/customer/query/getMyUnicomDateTotle") != -1) {
  getCookie("联通cookie","LianTongUser");
  $done({});
}

function getCookie(name,key) {
  let cookie = $request.headers.Cookie;
  let getKey = key => $prefs.valueForKey(key);
  let save = (cookie,key) => $prefs.setValueForKey(cookie,key);
  if (cookie && getKey(key)) {
    cookie != getKey(key) ? (save(cookie,key),$notify(name,"更新cookie成功!")) : console.log(name + "目前cookie一致");
  }else {
    cookie != undefined ? (save(cookie,key), $notify(name,"获取cookie成功")) : $notify(name,"获取cookie失败");
  }
  $done();
}

