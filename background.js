var urls = [];

browser.runtime.onConnect.addListener(function(port) {
    for (var i = 0; i < urls.length; i++) {
        port.postMessage({"req": urls[i]});
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
