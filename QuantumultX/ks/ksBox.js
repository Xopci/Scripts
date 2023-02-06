const $ = init();
const ksBox = JSON.parse($.read('ksboxck'));
if (ksBox) {
    box();
    $.end();
} else {
    $.notify('[快手宝箱]', '没有账号⚠️', '')
}

function box() {
	let req = {};
    ksBox.forEach((item) => {
        let headers = item.headers;
        let url = item.url;
        let userName = item.userName;
        req = {
            url: url,
            headers: headers
        }
        $.get(req, (err, resp, data) => {
			let obj = JSON.parse(data);
            console.log(err)
            if (obj.data.commonAwardPopup) {
                $.notify('[快手宝箱]', userName, `获得${obj.data.commonAwardPopup.awardAmount}金币!`);
                $.log(`======== ${userName} ========\n\n快手宝箱\n\n获得💰${obj.data.commonAwardPopup.awardAmount}💰金币\n\n================\n`);
            } else if (obj.result == 1) {
                //$.notify('[快手宝箱]', userName, '重复签到!');
                $.log(`========= ${userName} ========\n\n⚠️未到领取时间⚠️\ndata================\n`);
            } else {
                $.notify('[快手宝箱]', userName, '请手动获取ck和ns')
            }
        });

    })
    $done();
}

function init(){const isRequest=typeof $request!="undefined";const isSurge=typeof $httpClient!="undefined";const isQuanX=typeof $task!="undefined";const log=(message)=>console.log(message);const notify=(title,subtitle,message)=>{if(isQuanX)$notify(title,subtitle,message);if(isSurge)$notification.post(title,subtitle,message)};const write=(value,key)=>{if(isQuanX)return $prefs.setValueForKey(value,key);if(isSurge)return $persistentStore.write(value,key)};const read=(key)=>{if(isQuanX)return $prefs.valueForKey(key);if(isSurge)return $persistentStore.read(key)};const get=(options,callback)=>{if(isQuanX){if(typeof options=="string")options={url:options};options["method"]="GET";$task.fetch(options).then(response=>{response["status"]=response.statusCode; callback(null,response,response.body)},reason=>callback(reason.error,null,null))};if(isSurge)$httpClient.get(options,callback)};const post=(options,callback)=>{if(isQuanX){if(typeof options=="string")options={url:options};options["method"]="POST";$task.fetch(options).then(response=>{response["status"]=response.statusCode; callback(null,response,response.body)},reason=>callback(reason.error,null,null))};if(isSurge)$httpClient.post(options,callback)};const end=()=>{if(isQuanX)isRequest?$done({}):"";if(isSurge)isRequest?$done({}):$done()};return{isRequest,isQuanX,isSurge,notify,write,read,get,post,end,log}};
