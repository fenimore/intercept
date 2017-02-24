var port = browser.runtime.connect();
var output = document.getElementById("output");//.innerHTML =  m.req + ;
var btnClear = document.getElementById("clear");
var btnInter = document.getElementById("intercept");
var btnExport = document.getElementById("export");
var e = document.getElementById("selectedType");
var selectedType = e.options[e.selectedIndex].value;
var on = false;

port.onMessage.addListener(function(m) {
    if (m.on === "true") {
        on = true;
    } else if (m.on === "false") {
        on = false;
    }
    if (m.selectedType){
        selectedType = m.selectedType;
    }
    for (var i = 0; i < e.options.length; i++) {
        if (e.options[i].value === selectedType) {
            e.selectedIndex = i;
            break;
        }
    }

    setIntercept(on);
    if (m.req) {
        output.innerHTML = m.req + output.innerHTML;
    }
});

function clearReq() {
    output.innerHTML = "";
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

document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('select[id="selectedType"]').onchange=function(event) {
        selectedType = event.target.value;
        browser.runtime.sendMessage({"selectedType": selectedType.trim()});
    };
},false);
