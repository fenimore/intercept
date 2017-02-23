var port = browser.runtime.connect({greeting: "yup"});

port.onMessage.addListener(function(m) {
    console.log("Received from bagkround");
    console.log(m.greeting);
});

console.log("Slected");

document.findElementById("output").innerHTML = "Hello";


function logURL(requestDetails) {
    console.log("Loadn" +  requestDetails.method + requestDetails.type);
    console.log("Loading: " + requestDetails.url);
}

browser.webRequest.onBeforeRequest.addListener(
    logURL,
    {urls: ["<all_urls>"]}
);
