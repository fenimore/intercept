var port = browser.runtime.connect();
var output = document.getElementById("output");//.innerHTML =  m.req + ;
var btnClear = document.getElementById("clear");
var btnInter = document.getElementById("intercept");
var btnExport = document.getElementById("export");
var on = false;

port.onMessage.addListener(function(m) {
    if (m.on === "true") {
        on = true;
    } else if (m.on === "false") {
        on = false;
    }
    setIntercept(on);
    output.innerHTML = m.req + output.innerHTML;
});

function clearReq() {
    output.innerHTML = "<ul></ul>";
    browser.runtime.sendMessage({"msg": "clear"});
}

function setIntercept(t) {
    if (t) {
        document.getElementById("intercept").innerHTML = "stop intercept";
    } else {
        document.getElementById("intercept").innerHTML = "start intercept";
    }
}

function intercept() {
    browser.runtime.sendMessage({"msg": "intercept"});
    on = !on;
    setIntercept(on);
}

function exp() {
    var prom = browser.browserAction.getPopup({});
    prom.then(function(p) {
        browser.tabs.create({url:p});
    });
}

btnClear.addEventListener("click", clearReq, false);
btnInter.addEventListener("click", intercept, false);
btnExport.addEventListener("click", exp, false);
