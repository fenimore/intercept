var port = browser.runtime.connect();
var output = document.getElementById("output");//.innerHTML =  m.req + ;
var btn = document.getElementById("clear");

port.onMessage.addListener(function(m) {
    console.log("Received from bagkround");
    output.innerHTML = m.req + output.innerHTML;
});

function clearReq() {
    console.log("Send");
    output.innerHTML = "<ul></ul>";
    browser.runtime.sendMessage({"msg": "clear"});
    port.postMessage({"msg": "clear"});
}

btn.addEventListener("click", clearReq, false);

window.addEventListener('click',function(e){
    if(e.target.href!==undefined){
        browser.tabs.create({url:e.target.href});
    }
});
