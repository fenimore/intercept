//var port = browser.runtime.connect();
var urls = [];
var intercept = false;

browser.runtime.onConnect.addListener(function(p) {
    if (intercept) {
        p.postMessage({"on": "true"});
    } else if (!intercept) {
        p.postMessage({"on": "false"});
    }
    if (urls.length > 0) {
        for (var i = 0; i < urls.length; i++) {
            p.postMessage({"req": urls[i]});
        }
    }
});

browser.runtime.onMessage.addListener(function(m) {
    console.log(m.msg);
    switch (m.msg) {
    case "clear":
        urls = [];
    case "intercept":
        intercept = !intercept;
    }
});

function logURL(req) {
    if (!intercept) {
        return;
    }
    var result = "<li><small>"+ req.method
        + " [<span class=status>" + req.statusCode + "</span>] "
        + " [<span class=type>" + req.type + "</span>] "
        + "</small><br>    <a target=_blank href=" + req.url + ">"
        + req.url + "</a><br></li>";
    urls.push(result);
}

browser.webRequest.onHeadersReceived.addListener(
  logURL,
  {urls: ["<all_urls>"]}
);
