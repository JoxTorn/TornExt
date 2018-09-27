/*
var isChrome = false;
if(typeof browser === 'undefined' || browser === null){isChrome = true};

if(isChrome){
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.msg == "factionUpgrades"){
                factionUpgrades(sender.tab.id);
            }
    })
}
else{
    browser.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.msg == "factionUpgrades"){
                factionUpgrades(sender.tab.id);
            }
    })
}


function factionUpgrades(tabId){     
    if(isChrome){
        chrome.tabs.executeScript(tabId, {file: 'content/factionupgrades.js', runAt: 'document_end'});
    }
    else{
        browser.tabs.executeScript(tabId, {file: 'content/factionupgrades.js', runAt: 'document_end'});
    }
}

*/