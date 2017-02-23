//var port = browser.runtime.connect();
var urls = [];

browser.runtime.onConnect.addListener(function(p) {
    for (var i = 0; i < urls.length; i++) {
        p.postMessage({"req": urls[i]});
    }

});

browser.runtime.onMessage.addListener(function(m) {
    if (m.msg === "clear") {
        urls = [];
    }

});




function logURL(req) {
    var result = "<li><small>"+ req.method +
        " [<span class=status>" + req.statusCode + "</span>] " +
        req.type  +
        "</small><br>    <a target=_blank href=" + req.url + ">" + req.url + "</a><br></li>";
    urls.push(result);
}

browser.webRequest.onHeadersReceived.addListener(
  logURL,
  {urls: ["<all_urls>"]}
);
