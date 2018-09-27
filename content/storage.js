(function(){
    window.TornExtStorage = new class{
        constructor(){
            this.isChrome = false;
            if(typeof browser === 'undefined' || browser === null){this.isChrome = true};
        }
        set(values){
            if(!this.isChrome){
                return browser.storage.local.set(values);
            }
            else{
                return new Promise(function(resolve) {
                    chrome.storage.local.set(values, function(){
                        resolve();
                    });
                });
            };
        }
        get(keys){
            if(!this.isChrome){
                return browser.storage.local.get(keys);
            }
            else{
                return new Promise(function(resolve) {
                    chrome.storage.local.get(keys, function(result){
                        resolve(result);
                    });
                });
            }
        }
        remove(keys){
            if(!this.isChrome){
                return browser.storage.local.remove(keys);
            }
            else{
                return new Promise(function(resolve) {
                    chrome.storage.local.remove(keys, function(){
                        resolve();
                    });
                });
            }
        }
        clear(){
            if(!this.isChrome){
                return browser.storage.local.clear();
            }
            else{
                return new Promise(function(resolve) {
                    chrome.storage.local.clear(function(){
                        resolve();
                    });
                });
            }
        }
    }
})()