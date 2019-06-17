
function load(url) {
    return fetch("https://github.com" + url).then(function (r) {
        return r.body;
    });
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        let url = request.search;
        console.log(request.search);
        sendResponse({count: load(url).length});
        return true;
    });