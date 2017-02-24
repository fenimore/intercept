//var port = browser.runtime.connect();
var urls = [];
var intercept = false;
var selectedType = "all";

browser.runtime.onConnect.addListener(function(p) {
    if (intercept) {
        p.postMessage({"on": "true"});
    } else if (!intercept) {
        p.postMessage({"on": "false"});
    }
    console.log("OnCon" + selectedType);
    p.postMessage({"selectedType": selectedType});
    if (urls.length > 0) {
        for (var u of urls) {
            p.postMessage({"req": u});
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

    if (m.selectedType){
        console.log("Selected Typed" + m.selectedType);
        selectedType = m.selectedType;
    }

});

function logURL(req) {
    if (!intercept) {
        return;
    }
    console.log("Selected" + selectedType + req.type);
    if (selectedType !== "all" && req.type !== selectedType) {
        return;
    }

    var result = "<li><small>"+ req.method
        + " [<span class=status>" + req.statusCode + "</span>] "
        + " [<span class=type>" + req.type + "</span>] "
        + "</small><br>    <a target=_blank href=" + req.url + ">"
        + req.url + "</a><br></li>";
    // FIXME: leaves undefined somewhere
    console.log(result);
    urls.push(result);
}

browser.webRequest.onHeadersReceived.addListener(
  logURL,
  {urls: ["<all_urls>"]}
);
