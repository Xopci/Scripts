const url = `https://act.10010.com/SigninApp/signin/daySign`;
const method = `POST`;
const headers = {
'Accept' : `application/json, text/plain, */*`,
'Origin' : `https://img.client.10010.com`,
'Connection' : `keep-alive`,
'Cookie' : $prefs.valueForKey("LianTongUser"),
'Content-Type' : `application/x-www-form-urlencoded`,
'Host' : `act.10010.com`,
'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148           unicom{version:iphone_c@8.0900}{systemVersion:dis}{yw_code:}`,
'Referer' : `https://img.client.10010.com/SigininApp/index.html`,
'Accept-Language' : `zh-cn`,
'Accept-Encoding' : `gzip, deflate, br`
};
const body = ``;

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
};

$task.fetch(myRequest).then(response => {
    console.log(response.statusCode + "\n\n" + response.body);
	let obj = JSON.parse(response.body);
	if (obj.status == 0000) {
		$notify('[联通签到]', '', `获得${obj.data.signMessage}`);
	} else if (obj.status == 0002) {
		$notify('[联通签到]', '', '重复签到');
	} else {
		$notify('[联通签到]', '', '签到失败,请查看日志!')
		console.log(response.body);
	}
    $done();
}, reason => {
    console.log(reason.error);
    $done();
});
