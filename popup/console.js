var port = browser.runtime.connect();
var output = document.getElementById("output");//.innerHTML =  m.req + ;
var btnClear = document.getElementById("clear");
var btnInter = document.getElementById("intercept");

port.onMessage.addListener(function(m) {
    console.log("Received from bagkround");
    output.innerHTML = m.req + output.innerHTML;
});

function clearReq() {
    output.innerHTML = "<ul></ul>";
    browser.runtime.sendMessage({"msg": "clear"});
}

function intercept()  {
    browser.runtime.sendMessage({"msg": "intercept"});
}

btnClear.addEventListener("click", clearReq, false);
btnInter.addEventListener("click", intercept, false);

window.addEventListener('click',function(e){
    if(e.target.href!==undefined){
        browser.tabs.create({url:e.target.href});
    }
});
