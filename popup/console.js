var port = browser.runtime.connect();

port.onMessage.addListener(function(m) {
    console.log("Received from bagkround");
    console.log(m.req);
    var output = document.getElementById("output");//.innerHTML =  m.req + ;
    output.innerHTML = m.req + output.innerHTML;

});
window.addEventListener('click',function(e){
    if(e.target.href!==undefined){
        browser.tabs.create({url:e.target.href})
    }
});
