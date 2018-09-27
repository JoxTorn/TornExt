(function(){

//console.log('faction');

var API_KEY = false;

TornStatsPromise = TornExtStorage.get('LinkTornStats');
TornStatsPromise.then((e) => {
    if(e.LinkTornStats){
        APIKeyPromise = TornExtStorage.get('APIkey');
        APIKeyPromise.then((e) => {
            if(e.APIkey){
                API_KEY = e.APIkey;
            }
        })
    }
})

function createElement(tag){
    return document.createElement(tag);
}

function insertAfter(element, after){
    after.parentNode.insertBefore(element, after.nextSibling);
}

var crimes = document.getElementById('faction-crimes');

var container = document.querySelector('.content-wrapper');

var myDiv = document.createElement('div');
myDiv.id = 'JoxDiv';

container.appendChild(myDiv);

var widget = TornExtGlobal.Widget(
    {
        title:'OC Helper',
        colapsable: true
    }
)

var formOpen = false; //this indicate that form is visible
var filterNNB = false;
var filterRdy = false;

var spacer = document.createElement('hr');
spacer.classList.add('page-head-delimiter');
spacer.classList.add('my-margin-top10');
spacer.classList.add('my-margin-bottom10');

myDiv.appendChild(spacer);
myDiv.appendChild(widget.container);

var formWrap = createElement('div');
formWrap.classList.add('my-float-right');

var cbopen = createElement('input');
cbopen.id = 'openavailable';
cbopen.type = 'checkbox';
cbopen.classList.add('my-margin-left10');
cbopen.checked = filterRdy;
cbopen.addEventListener('change', (e) => {
    filterRdy = e.target.checked;
    saveOCConfig();
    openReadyCrimes();
});
var lblavail = createElement('label');
lblavail.for = 'openavailable';
lblavail.classList.add('my-margin-left10');
lblavail.classList.add('my-variable-text');
lblavail.setAttribute('data-textbig','Open 100% Ready crimes');
lblavail.setAttribute('data-textsmall','Open Ready');

var cbNNB = createElement('input');
cbNNB.id = 'showNNB';
cbNNB.type = 'checkbox';
cbNNB.classList.add('my-margin-left10');
cbNNB.checked = filterNNB;
cbNNB.addEventListener('change', (e) => {
    filterNNB = e.target.checked;
    saveOCConfig();
    showTornStatsNNB();
});
var lblnnb = createElement('label');
lblnnb.for = 'showNNB';
lblnnb.classList.add('my-margin-left10');
lblnnb.classList.add('my-variable-text');
lblnnb.setAttribute('data-textbig','Show Torn Stats NNB');
lblnnb.setAttribute('data-textsmall','TS NNB');

formWrap.appendChild(lblnnb);
formWrap.appendChild(cbNNB);

formWrap.appendChild(lblavail);
formWrap.appendChild(cbopen);

widget.header.appendChild(formWrap);

showhideWidget();


OCPromise = TornExtStorage.get('OC');
OCPromise.then((e) => {
    if(e.OC){
        filterNNB = e.OC.filterNNB;
        filterRdy = e.OC.filterRdy;
    }

    document.getElementById('openavailable').checked = filterRdy;
    document.getElementById('showNNB').checked = filterNNB;

    openReadyCrimes();
    showTornStatsNNB();
})

function saveOCConfig(){
    saveOC = TornExtStorage.set({'OC': {'filterRdy' : filterRdy, 'filterNNB' : filterNNB}});
}

function openReadyCrimes(){
    if (filterRdy) {
        const readyMembers = crimes.querySelectorAll('.crimes-list > .item-wrap > .item > .status > .t-green');
        for (const member of readyMembers) {
            const crime = member.closest('.item-wrap');
            crime && !crime.querySelector('.stat.t-red') && crime.classList.add('active');
        }
    }
}

function showTornStatsNNB(){

    var crime_wrap = document.querySelectorAll('.faction-crimes-wrap');

    if(API_KEY){

        if(filterNNB && crime_wrap){
            var dataSource = `https://www.tornstats.com/api.php?key=${API_KEY}&action=crimes`; //&t=totalStats


            //Ovo treba da bude uslovno ako je dodat div u gym
            var tornstatsData = fetch(dataSource, {method: 'get', headers: void 0, body: void 0}).catch((e) => {
                console.log('error:',e);
                throw e
            }).then((e) => e.json().catch((e) => {
                throw e
            })).then((e) => {
                if (!e) throw e;
                else if (e.error) throw e.error;
                return e
            })

            tornstatsData.then((e) => {
                
                if(Object.keys(e).length){
                    const list = crimes.querySelectorAll('.plans-wrap .plans-list > li');

                    var allOldNNB = !crimes.querySelectorAll('.my-faction-nnb');
                    if(allOldNNB){
                        for(var oldNNB of allOldNNB){
                            oldNNB.remove();
                        }
                    }
                    

                    for(li of list){
                        const input = li.querySelector('input');
                        if(!input){continue;}
                        var member = parseInt(input.value);
                        const offencesLI = li.querySelector('.offences');
                        const memberLI = li.querySelector('.member');

                        if(e.members[member]){
                            if(offencesLI){
                                const success = 3 * e.members[member].crime_success + (e.members[member].psych_degree ? 10 : 0) + (e.members[member].federal_judge ? 10 : 0);
                                
                                var nnbLI = document.createElement('li');
                                nnbLI.classList.add('my-faction-nnb');
                                nnbLI.title = e.members[member].verified ? 'Verified' : 'Unverified';
                                nnbLI.innerHTML = `NNB: ${e.members[member].natural_nerve} (+${success}% success)${e.members[member].verified?'':' *'}`;
                                //offencesLI.parentNode.insertBefore(nnbLI, offencesLI);
                                
                            //offencesLI.appendChild(document.createTextNode(`NNB: ${e.members[member].natural_nerve} (+${success}% success)${e.members[member].verified?'':' *'}`));
                            //offencesLI.innerHTML =  `NNB: ${e.members[member].natural_nerve} (+${success}% success)${e.members[member].verified?'':' *'}`;
                            insertAfter(nnbLI, offencesLI);
                            offencesLI.style.maxWidth = '100px';
                            memberLI.style.maxWidth = '200px';
                            }
                        }
                        else{
                            //No data for member
                            
                            if(offencesLI){
                                var nnbLI = document.createElement('li');
                                nnbLI.classList.add('my-faction-nnb');
                                insertAfter(nnbLI, offencesLI);
                                offencesLI.style.maxWidth = '100px';
                                memberLI.style.maxWidth = '200px';
                            }
                            
                        }
                        
                    }
                }
                
            });
        }
    }
}

function showhideWidget(){
    if(crimes){
        myDiv.style.display = crimes.style.display;
        
        if(myDiv.style.display == 'block'){
            //Only run this code on for display
            if(!formOpen){
                setTimeout(()=>{
                    openReadyCrimes();
                    showTornStatsNNB();
                }, 100);
            }
            formOpen = true;
        }
        else{
            formOpen = false;
        }
    }
    else{
        myDiv.style.display = 'none';
    }
}

// Options for the observer (which mutations to observe)
var config = { 
    attributes: true,
    characterData: false,
    childList: false,
    subtree: true,
    attributeOldValue: false,
    characterDataOldValue: false };

// Callback function to execute when mutations are observed
var callback = function(mutationsList) {
    for(var mutation of mutationsList) {
        if (mutation.type == 'attributes') {
            if(mutation.target.id == 'faction-crimes'){ 
                showhideWidget();
            }
        }
        /*
        if (mutation.type == 'childList') {
            if(mutation.addedNodes.length > 0){
                for(const node of mutation.addedNodes){
                    if(node && node.classList && node.classList.contains('faction-crimes-wrap ')){
                        //
                    }
                }
            }
        }
        */
    }
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

targetNode = container;

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// Later, you can stop observing
//observer.disconnect();


function injectScript(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
}
injectScript( chrome.extension.getURL('/content/factionupgrades.js'), 'html');

})();