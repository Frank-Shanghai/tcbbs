import { SHA1 } from "./SHA1";

// 下面是<React进阶之路>书中提供的API Clound Web API 相关信息，可用账户有 jack/123456, steve/123456
// const AppId = "A6053788184630";
// const AppKey = "8B3F5860-2646-2C47-DC50-39106919B260";

// 下面是我自己实现的一个API Cloud Web API, 可用账户有 Frank/sa, TC/sa
const AppId = 'A6032109929200';
const AppKey = '22DAAB12-777A-D941-BF0A-46EDD8C70138';
var now = Date.now();
const secureAppKey = SHA1(AppId + 'UZ' + AppKey + 'UZ' + now) + '.' + now;

const headers = new Headers({
    "X-APICloud-AppId": AppId,
    "X-APICloud-AppKey": secureAppKey,
    "Accept": "application/json",
    "Content-Type": "application/json"
});

function get(url) {
    // uset the new js function fetch here instead of jquery ajax
    // return a promise
    return fetch(url, {
        method: "GET",
        headers: headers
    }).then(response => {
        return handleResponse(url, response);
    }).catch(err => {
        // TODO: Actually here only handled the network issue, error as 404 would be handled
        // https://www.cnblogs.com/libin-1/p/6853677.html
        console.error(`Request failed. Url = ${url}. Message = ${err}`);
        // promise reject时的error message, 这里可以包含更多的信息
        return {error: {message: "Request failed."}};
    });
}

function post(url, data){
    return fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    }).then(response => {
        return handleResponse(url, response);
    }).catch(err => {
        console.error(`Request failed. Url = ${url}. Message = ${err}`);
        return {error: {message: "Request failed."}};
    });
}

function put(url, data){
    return fetch(url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data)
    }).then(response => {
        return handleResponse(url, response);
    }).catch(err => {
        console.error(`Request failed. Url = ${url}. Message = ${err}`);
        return {error: {message: "Request Failed."}}
    });
}


// fetch对非OK时的处理，可以参考https://www.cnblogs.com/libin-1/p/6853677.html
// TODO: Not handle all the possible errors. refer to youdao note, or https://www.cnblogs.com/libin-1/p/6853677.html
function handleResponse(url, response){
    if(response.status < 500){
        return response.json();
    }
    else{
        console.error(`Request failed. Ulr = ${url}. Message = ${response.statusText}`);
        // promise resolve时的error message, 虽是reloved, 但其实是resolve状态。因为fetch只reject network error
        return {error: {message: "Request failed due to server error."}};
    }
}

export {get, post, put}