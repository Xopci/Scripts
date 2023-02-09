const $ = init();
let ksSign = JSON.parse($.read('ksck'));

if (ksSign) {
    sign()
}

function sign() {
    let req = {};
    ksSign.forEach((item) => {
		let headers = item.headers;
        let url = item.url;
        let userName = item.userName;
        req = {
            url: url,
            headers: headers
        }
        $.get(req, (err, resp, data) => {
            let obj = JSON.parse(data);
            if (obj.result == 1) {
                $.notify('[快手签到]', userName, obj.data.nebulaSignInPopup.title);
                $.log(`========${userName}========\n\n[快手签到]\n\n💰${obj.data.nebulaSignInPopup.subTitle}💰\n\n================\n`);
            } else if (obj.result == 10901) {
                $.notify('[快手签到]', userName, '重复签到!');
                $.log(obj.error_msg);
            } else {
                $.notify('[快手签到]', '', '请手动签到一次!');
                console.log(data)
            }
        })
    })
    $done();
}

function init(){const isRequest=typeof $request!="undefined";const isSurge=typeof $httpClient!="undefined";const isQuanX=typeof $task!="undefined";const log=(message)=>console.log(message);const notify=(title,subtitle,message)=>{if(isQuanX)$notify(title,subtitle,message);if(isSurge)$notification.post(title,subtitle,message)};const write=(value,key)=>{if(isQuanX)return $prefs.setValueForKey(value,key);if(isSurge)return $persistentStore.write(value,key)};const read=(key)=>{if(isQuanX)return $prefs.valueForKey(key);if(isSurge)return $persistentStore.read(key)};const get=(options,callback)=>{if(isQuanX){if(typeof options=="string")options={url:options};options["method"]="GET";$task.fetch(options).then(response=>{response["status"]=response.statusCode; callback(null,response,response.body)},reason=>callback(reason.error,null,null))};if(isSurge)$httpClient.get(options,callback)};const post=(options,callback)=>{if(isQuanX){if(typeof options=="string")options={url:options};options["method"]="POST";$task.fetch(options).then(response=>{response["status"]=response.statusCode; callback(null,response,response.body)},reason=>callback(reason.error,null,null))};if(isSurge)$httpClient.post(options,callback)};const end=()=>{if(isQuanX)isRequest?$done({}):"";if(isSurge)isRequest?$done({}):$done()};return{isRequest,isQuanX,isSurge,notify,write,read,get,post,end,log}};
