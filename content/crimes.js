(function(){
    
//console.log('crimes');


var myDiv = document.createElement('div');
myDiv.id = 'JoxDiv';


var crimes = document.querySelector('.content-title');
crimes.parentNode.insertBefore(myDiv, crimes.nextSibling);

var selectedCrimes = [];

/*
selectedCrimes.push('jacket');
selectedCrimes.push('thorough-robbery');
selectedCrimes.push('stealth-virus');
selectedCrimes.push('warehouse');
selectedCrimes.push('steal-a-parked-car');
*/

// Select the node that will be observed for mutations
//var targetNode = document.querySelector('.content-wrapper');
var targetNode = myDiv.parentNode;


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
            //console.log('A child node has been added or removed.',mutation);
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
                    if(node.classList.contains('content-title')){
                        //console.log('Yeee, can inert myself again...');
                        node.parentNode.insertBefore(myDiv, node.nextSibling);
                        break;
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

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// Later, you can stop observing
//observer.disconnect();


if(document.querySelector('.captcha')){
    console.log('Got Captcha, should remove my div...');
    myDiv.remove();
}


var container = document.createElement('div');

container.classList.add('crime-container');


var widget = TornExtGlobal.Widget(
    {
        title:'Fast crimes',
        title_small:'Fast crimes',
        colapsable: true
    }
)

widget.body.appendChild(container);

var spacer = document.createElement('hr');
spacer.classList.add('page-head-delimiter');
spacer.classList.add('my-margin-top10');
spacer.classList.add('my-margin-bottom10');

myDiv.appendChild(widget.container);
myDiv.appendChild(spacer);

var btn = document.createElement('button');
btn.id = 'showAllCrimes';
btn.innerHTML = 'SHOW ALL CRIMES';
btn.classList.add('my-btn');
btn.classList.add('my-width100');
btn.addEventListener('click', function(e){
    if(e.target == this){
        var allCrimes = document.getElementById('allCrimes');

        if(allCrimes.classList && allCrimes.classList.contains('my-hide')){
            allCrimes.classList.remove('my-hide')
            this.innerHTML = 'HIDE ALL CRIMES';
        }
        else{
            allCrimes.classList.add('my-hide')
            this.innerHTML = 'SHOW ALL CRIMES';
        }
    }
});

widget.footer.appendChild(btn);

var quickCrimes = document.createElement('div');
quickCrimes.classList.add('my-width100');
quickCrimes.classList.add('crime-container');
quickCrimes.id = 'quickCrimes';

container.appendChild(quickCrimes)


SelectedCrimesPromise = TornExtStorage.get('SelectedCrimes');

SelectedCrimesPromise.then((e) => {
    if(e.SelectedCrimes){
        selectedCrimes = e.SelectedCrimes;
    }
    
    createCrimeForm(quickCrimes);

    cerateCrimeSelection(container);
});

function createCrimeForm(container){

    container.innerHTML = '';

    //var shortcutCrimes = TornExtGlobal.crimes.filter(x => selectedCrimes.includes(x.id));
    var shortcutCrimes = selectedCrimes.map((x) => {return TornExtGlobal.crimes.filter(y => x == y.id)[0]});

    for(var crime of shortcutCrimes){
        createCrimeAction(crime, container);
    }
}

function createCrimeAction(crime, container){
    //FORMA JE OBAVEZNA
    var crimeForm = document.createElement('form');
    crimeForm.setAttribute('method', 'post');
    crimeForm.setAttribute('action','crimes.php?step=docrime' + crime.type);
    crimeForm.name = 'crimes';
    crimeForm.classList.add('crime-form');

    //HIDDEN POLJE JE OBAVEZNO
    var crimeNerve = document.createElement('input');
    crimeNerve.value = crime.nerve;
    crimeNerve.type = 'hidden';
    crimeNerve.name = 'nervetake';

    //RADIO JE OBAVEZAN
    var crimeRadio = document.createElement('input');
    crimeRadio.id = crime.id;
    crimeRadio.value = crime.value;
    crimeRadio.classList.add('radio-css','without-label');
    crimeRadio.type = 'radio';
    crimeRadio.name = 'crime';

    //UL je obavezan sa klasom item -- bez ovoga nece da radi akcija clikc
    var ul = document.createElement('ul');
    ul.classList.add('item'); //OVO JE SUPER BITNO kalsa item
    ul.classList.add('crime-style');
    var li = document.createElement('li');
    var img = document.createElement('img');
    img.width = 30;
    img.height = 30;
    img.src = `/images/crimes/${crime.image}.png`;
    var text = document.createTextNode(crime.title + ' (' + crime.nerve + ' nerve)');

    ul.appendChild(li);
    li.appendChild(img);
    li.appendChild(text);
    li.appendChild(crimeRadio);

    crimeForm.appendChild(crimeNerve);
    crimeForm.appendChild(ul);

    container.appendChild(crimeForm);
}

function cerateCrimeSelection(container){

    var allCrimes = document.createElement('div');
    allCrimes.classList.add('my-width100');
    allCrimes.classList.add('my-hide');
    allCrimes.classList.add('crime-style-nohover');
    allCrimes.id = 'allCrimes';

    for(var crimeGroup in TornExtGlobal.crimeGroups){

        var div = document.createElement('div');
        div.classList.add('my-width100');
        var divHeader = document.createElement('div');
        divHeader.classList.add('my-width70');
        divHeader.classList.add('crime-style');
        divHeader.classList.add('my-margin-auto');
        divHeader.classList.add('my-flex-center');
        var table = document.createElement('table');
        table.classList.add('my-width70');
        table.classList.add('my-margin-auto');
        table.classList.toggle('my-hide');

        divHeader.addEventListener('click', function(e){
            if(e.target == this){
                var tbl = this.parentNode.querySelector('table');
                tbl.classList.toggle('my-hide');
            }
        })

        var img = document.createElement('img');
        img.width = 30;
        img.height = 30;
        img.style.marginRight = '5px';
        img.src = `/images/crimes/${TornExtGlobal.crimeGroups[crimeGroup].image}.png`;

        divHeader.appendChild(img);
        divHeader.appendChild(document.createTextNode(TornExtGlobal.crimeGroups[crimeGroup].title + ` (${TornExtGlobal.crimeGroups[crimeGroup].nerve} nerve)`));

        crimeInGroup = TornExtGlobal.crimes.filter((x) => {return x.nerve == TornExtGlobal.crimeGroups[crimeGroup].nerve})

        for(var crime of crimeInGroup){
            var row = document.createElement('tr');
            row.classList.add('my-margin-auto');
            row.style.margin = '5px';
            var colname = document.createElement('td');
            colname.classList.add('my-flex-center');
            colname.style.padding = '5px';

            var cb = document.createElement('input');
            cb.classList.add('my-checkbox-big');
            cb.type = 'checkbox';
            cb.dataset.id = crime.id;
            cb.addEventListener('change',function(e){
                if(e.target == this){
                    if(e.target.checked){
                        if(!selectedCrimes.includes(e.target.dataset.id)){
                            selectedCrimes.push(e.target.dataset.id);
                        }
                    }
                    else{
                        selectedCrimes.splice(selectedCrimes.indexOf(e.target.dataset.id), 1);
                    }
                    savecrimes = TornExtStorage.set({'SelectedCrimes': selectedCrimes});
                    createCrimeForm(quickCrimes);
                }
            })

            var img = document.createElement('img');
            img.width = 30;
            img.height = 30;
            img.style.marginRight = '5px';
            img.src = `/images/crimes/${crime.image}.png`;

            
            colname.appendChild(cb);
            colname.appendChild(img);
            colname.appendChild(document.createTextNode(crime.title + ' (' + crime.nerve + ' nerve)'));

            if(selectedCrimes.filter((x)=>{return x == crime.id}).length > 0){
                cb.checked = true;
            }
            else{
                cb.checked = false;
            }

            row.appendChild(colname);
            table.appendChild(row);
        }

        
        div.appendChild(divHeader);
        div.appendChild(table);
        allCrimes.appendChild(div);
        container.appendChild(allCrimes);
    }
}

})();