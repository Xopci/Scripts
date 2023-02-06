const signKey = 'ksck';
const boxKey = 'ksboxck';
const app = '快手极速版';
const signUrl = '/nebula/sign/sign?';
const boxUrl = '/rest/n/nebula/box/explore?';
const url = $request.url;
const $ = init();

if (url.indexOf(signUrl) > -1) getCookie(signKey, signUrl);
if (url.indexOf(boxUrl) > -1 ) getCookie(boxKey, boxUrl);

function getCache(mode) {
    let cache = mode == 'ksck' ? $.read(signKey) || '[]' : $.read(boxKey) || '[]';
    $.log(cache);
    // let arr = typeof cache == 'string' ? new Array(cache) : []
    
    return JSON.parse(cache);
}

function getCookie(key, index) {
    try {
        if ($request.headers && url.indexOf(index) > -1) {
            let CV = $request.headers["Cookie"] || $request.headers["cookie"];
            if (CV.match(/userId=\w+;/)) {
                let user = $.read('ksuser');
                let cookieVal = $request.headers;
                let userName = CV.match(/userId=(\w+);/)[1];
                let cookiesData = getCache(key);
                let updateCookiesData = [...cookiesData];
                let updateIndex;
                let CookieName = "【账号】";
                console.log(cookiesData);
                let updateCodkie = cookiesData.find((item, index) => {
                    let ck = item.headers.Cookie;
                    var Account = ck ? ck.match(/userId=(\w+);/) ? ck.match(/userId=(\w+);/)[1] : null : null;
                    const verify = userName === Account;
                    if (verify) {
                        updateIndex = index;
                    }
                    return verify;
                });
                let tipPrefix = "";
                if (updateCodkie) {
                    updateCookiesData[updateIndex].headers = cookieVal;
                    updateCookiesData[updateIndex].url = url;
                    CookieName = `【账号${updateIndex + 1}】`;
                    tipPrefix = `更新${app}`;
                } else {
                    updateCookiesData.push({
                        userName: user,
                        url: url,
                        headers: cookieVal
                    });
                    tipPrefix = `写入${app}`
                }
                const cacheValue = JSON.stringify(updateCookiesData, null, "\t");
                $.write(cacheValue, key);
                $.notify(
                    "用户名: " + user,
                    key,
                    tipPrefix + CookieName + "Cookie成功 🎉"
                );

            } else {
                $.notify(`写入${app}Cookie失败`, "", "请查看脚本内说明, 登录网页获取 ‼️");
            }
            $done();
            return;
        } else {
            $.notify(`写入${app}Cookie失败`, "", "请检查匹配URL或配置内脚本类型 ‼️");
        }
    } catch (err) {
        $.write("", key);
        $.notify(`写入${app}Cookie失败`, "", "已尝试清空历史Cookie, 请重试 ⚠️");
        console.log(
            `\n写入${app}Cookie出现错误 ‼️\n${JSON.stringify(
            err
            )}\n\n${err}\n\n${JSON.stringify($request.headers)}\n`
        );
    }
    $done();
}


function init(){const isRequest=typeof $request!="undefined";const isSurge=typeof $httpClient!="undefined";const isQuanX=typeof $task!="undefined";const log=(message)=>console.log(message);const notify=(title,subtitle,message)=>{if(isQuanX)$notify(title,subtitle,message);if(isSurge)$notification.post(title,subtitle,message)};const write=(value,key)=>{if(isQuanX)return $prefs.setValueForKey(value,key);if(isSurge)return $persistentStore.write(value,key)};const read=(key)=>{if(isQuanX)return $prefs.valueForKey(key);if(isSurge)return $persistentStore.read(key)};const get=(options,callback)=>{if(isQuanX){if(typeof options=="string")options={url:options};options["method"]="GET";$task.fetch(options).then(response=>{response["status"]=response.statusCode; callback(null,response,response.body)},reason=>callback(reason.error,null,null))};if(isSurge)$httpClient.get(options,callback)};const post=(options,callback)=>{if(isQuanX){if(typeof options=="string")options={url:options};options["method"]="POST";$task.fetch(options).then(response=>{response["status"]=response.statusCode; callback(null,response,response.body)},reason=>callback(reason.error,null,null))};if(isSurge)$httpClient.post(options,callback)};const end=()=>{if(isQuanX)isRequest?$done({}):"";if(isSurge)isRequest?$done({}):$done()};return{isRequest,isQuanX,isSurge,notify,write,read,get,post,end,log}};
