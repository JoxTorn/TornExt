(function(){
//console.log('bounties');

var filterOK = false;
var filterLvl = 0;

function createElement(tag){
    return document.createElement(tag);
}

function insertAfter(element, after){
    after.parentNode.insertBefore(element, after.nextSibling);
}


var container = document.querySelector('.content-title');

var myDiv = document.createElement('div');
myDiv.id = 'JoxDiv';

insertAfter(myDiv, container);

var widget = TornExtGlobal.Widget(
    {
        title:'Bounties Filter',
        colapsable: true
    }
)

myDiv.appendChild(widget.container);

var formWrap = createElement('div');
formWrap.classList.add('my-float-right');

var txtmaxlvl = createElement('input');
txtmaxlvl.id = 'maxlvl';
txtmaxlvl.type = 'number';
txtmaxlvl.min = 1;
txtmaxlvl.max = 100;
txtmaxlvl.classList.add('my-input-jail');
txtmaxlvl.classList.add('my-margin-left10');
txtmaxlvl.addEventListener('change', (e) => {
    filterLvl = e.target.value == 0 ? 0 : parseInt(e.target.value);
    saveBountiesConfig();
    filterBounties();
});
var lblmaxlvl = createElement('label');
lblmaxlvl.for = 'maxlvl';
lblmaxlvl.classList.add('my-margin-left10');
lblmaxlvl.classList.add('my-variable-text');
lblmaxlvl.setAttribute('data-textbig','Max level');
lblmaxlvl.setAttribute('data-textsmall','Level');

var cbOK = createElement('input');
cbOK.id = 'statusOK';
cbOK.type = 'checkbox';
//cbOK.classList.add('my-input-jail');
cbOK.classList.add('my-margin-left10');
cbOK.addEventListener('change', (e) => {
    filterOK = e.target.checked;
    saveBountiesConfig();
    filterBounties();
});
var lblok = createElement('label');
lblok.for = 'statusOK';
lblok.classList.add('my-margin-left10');
lblok.classList.add('my-variable-text');
lblok.setAttribute('data-textbig','Only available');
lblok.setAttribute('data-textsmall','Available');

formWrap.appendChild(lblok);
formWrap.appendChild(cbOK);

formWrap.appendChild(lblmaxlvl);
formWrap.appendChild(txtmaxlvl);

widget.header.appendChild(formWrap);


BountiesPromise = TornExtStorage.get('Bounties');
BountiesPromise.then((e) => {
    if(e.Bounties){
        filterOK = e.Bounties.filterOK;
        filterLvl = e.Bounties.filterLvl;
    }

    document.getElementById('maxlvl').value = filterLvl;
    document.getElementById('statusOK').checked = filterOK;

    filterBounties();
})


function saveBountiesConfig(){
    savebounties = TornExtStorage.set({'Bounties': {'filterOK' : filterOK, 'filterLvl' : filterLvl}});
}


/*FILTER BOUNTIES*/

function filterBounties(){
    const bounties = document.querySelectorAll('.bounties-list > li');
    
    for(const bountie of bounties){
        const level = bountie.querySelector('.level');
        if (level) {
            const lvl = parseInt(level.lastChild.textContent);
            var OK = bountie.querySelector('.status .t-green')
            if(filterLvl && lvl > filterLvl){
                bountie.style.display = 'none';
            }
            else {
                if(filterOK && !OK){
                    bountie.style.display = 'none';
                }
                else{
                    bountie.style.removeProperty('display')
                }
            }
        }
    }
}


// Options for the observer (which mutations to observe)
var config = { 
    attributes: false,
    characterData: false,
    childList: true,
    subtree: false,
    attributeOldValue: false,
    characterDataOldValue: false };

// Callback function to execute when mutations are observed
var callback = function(mutationsList) {
    for(var mutation of mutationsList) {
        if (mutation.type == 'childList') {

            if(mutation.removedNodes.length > 0){
                for(const node of mutation.removedNodes){
                    if(node.id == 'JoxDiv'){
                        //console.log('Upsss, Got removed...');
                        break;
                    }
                }
            }

            if(mutation.addedNodes.length > 0){
                for(const node of mutation.addedNodes){
                    if(node && node.classList && node.classList.contains('newspaper-wrap')){
                        filterBounties();
                    }
                    if(node && node.classList && node.classList.contains('content-title')){
                        //console.log('Yeee, can inert myself again...');
                        node.parentNode.insertBefore(myDiv, node.nextSibling);
                    }
                }
            }
        }
        else if (mutation.type == 'attributes') {
            //console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

targetNode = container.parentNode;

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// Later, you can stop observing
//observer.disconnect();

})();