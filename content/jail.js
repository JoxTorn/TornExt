(function(){
    
//console.log('jail');


const jail = document.querySelector('.user-info-list-wrap');

if(jail){
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
            title:'Jail Filter',
            colapsable: true,
            flex: true
        }
    )

    widget.container.classList.add('my-margin-top10');
    widget.container.classList.add('my-margin-bottom10');
    widget.body.classList.add('my-padding-top10');
    widget.body.classList.add('my-padding-bottom10');

    var filterTime = 0;
    var filterLvl = 0;
    var quickBust = false;
    var quickBail = false;

    myDiv.appendChild(widget.container);

    var formWrap = createElement('div');
    //formWrap.classList.add('my-float-right');

    var txtmaxlvl = createElement('input');
    txtmaxlvl.id = 'maxlvl';
    txtmaxlvl.type = 'number';
    txtmaxlvl.min = 1;
    txtmaxlvl.max = 100;
    txtmaxlvl.classList.add('my-input-jail');
    txtmaxlvl.classList.add('my-margin-left10');
    txtmaxlvl.addEventListener('change', (e) => {
        filterLvl = e.target.value == 0 ? 0 : parseInt(e.target.value);
        saveJailConfig();
        filterJail();
    });
    var lblmaxlvl = createElement('label');
    lblmaxlvl.for = 'maxlvl';
    lblmaxlvl.classList.add('my-margin-left10');
    lblmaxlvl.classList.add('my-variable-text');
    lblmaxlvl.setAttribute('data-textbig','Max level');
    lblmaxlvl.setAttribute('data-textsmall','Level');

    var txtmaxtime = createElement('input');
    txtmaxtime.id = 'maxtime';
    txtmaxtime.type = 'text';
    txtmaxtime.classList.add('my-input-jail');
    txtmaxtime.classList.add('my-margin-left10');
    txtmaxtime.addEventListener('change', (e) => {
        filterTime = parseTime(e.target.value);//e.target.value != '' ? parseTime(e.target.value) : 0;
        saveJailConfig();
        filterJail();
    });
    var lblmaxtime = createElement('label');
    lblmaxtime.for = 'maxtime';
    lblmaxtime.classList.add('my-margin-left10');
    lblmaxtime.classList.add('my-variable-text');
    lblmaxtime.setAttribute('data-textbig','Max time');
    lblmaxtime.setAttribute('data-textsmall','Time');

    var cbquickBust = createElement('input');
    cbquickBust.id = 'quickBust';
    cbquickBust.type = 'checkbox';
    //cbquick.classList.add('my-input-jail');
    cbquickBust.classList.add('my-margin-left10');
    cbquickBust.addEventListener('change', (e) => {
        quickBust = e.target.checked;//e.target.value != '' ? parseTime(e.target.value) : 0;
        saveJailConfig();
        filterJail();
    });
    var lblquickBust = createElement('label');
    lblquickBust.for = 'quickBust';
    lblquickBust.classList.add('my-margin-left10');
    lblquickBust.classList.add('my-variable-text');
    lblquickBust.setAttribute('data-textbig','Quick bust');
    lblquickBust.setAttribute('data-textsmall','Q bust');

    var cbquickBail = createElement('input');
    cbquickBail.id = 'quickBail';
    cbquickBail.type = 'checkbox';
    //cbquick.classList.add('my-input-jail');
    cbquickBail.classList.add('my-margin-left10');
    cbquickBail.addEventListener('change', (e) => {
        quickBail = e.target.checked;//e.target.value != '' ? parseTime(e.target.value) : 0;
        saveJailConfig();
        filterJail();
    });
    var lblquickBail = createElement('label');
    lblquickBail.for = 'quickBail';
    lblquickBail.classList.add('my-margin-left10');
    lblquickBail.classList.add('my-variable-text');
    lblquickBail.setAttribute('data-textbig','Quick bail');
    lblquickBail.setAttribute('data-textsmall','Q bail');

    formWrap.appendChild(lblquickBail);
    formWrap.appendChild(cbquickBail);

    formWrap.appendChild(lblquickBust);
    formWrap.appendChild(cbquickBust);

    formWrap.appendChild(lblmaxtime);
    formWrap.appendChild(txtmaxtime);

    formWrap.appendChild(lblmaxlvl);
    formWrap.appendChild(txtmaxlvl);

    widget.body.appendChild(formWrap);

    JailPromise = TornExtStorage.get('Jail');
    JailPromise.then((e) => {
        if(e.Jail){
            filterTime = e.Jail.filterTime;
            filterLvl = e.Jail.filterLvl;
            quickBust = e.Jail.quickBust;
            quickBail = e.Jail.quickBail;
        }

        document.getElementById('maxlvl').value = filterLvl;
        document.getElementById('maxtime').value = filterTime;
        document.getElementById('quickBust').checked = quickBust;
        document.getElementById('quickBail').checked = quickBail;

        filterJail();
    })

    function saveJailConfig(){
        savejail = TornExtStorage.set({'Jail': {'filterTime' : filterTime, 'filterLvl' : filterLvl, 'quickBust' : quickBust, 'quickBail' : quickBail}});
    }

    /*JAIL FILTER*/
    function filterJail(){
        const prisoners = jail.querySelectorAll('.user-info-list-wrap > li');
    
        for(prisoner of prisoners){
            l = prisoner.querySelector('.level'),
            t = prisoner.querySelector('.time');

            if(l && t) {
                var level = parseInt(l.lastChild.textContent);
                var time = parseTime(t.lastChild.textContent.trim());
                /*
                console.log(l,t);
        
                console.log(l.lastChild.textContent,t.lastChild.textContent, parseTime(t.lastChild.textContent.trim()));
                */
                //prisoner.style.display = 'none'; //for hide

                if(filterTime && time > filterTime || filterLvl && level > filterLvl){
                    prisoner.style.display = 'none';
                }
                else {
                    prisoner.style.removeProperty('display');
                }
            }
        }

        setQuickLink();
    }
    
    function setQuickLink(){
        var linkBust = document.querySelectorAll('a.bust');
        var linkBail = document.querySelectorAll('a.bye');

        var keyworkBust = 'step=breakout';
        var keyworkBail = 'step=buy';
        var keywordPage = 'jailview.php';

        for(bust of linkBust){
            var split = bust.href.split(keyworkBust);
            var newLink = split[0] + keyworkBust + (quickBust ? '1' : '');
            split = newLink.split(keywordPage);
            newLink = keywordPage + split[1];
            bust.href = newLink;
        }

        for(bail of linkBail){
            var split = bail.href.split(keyworkBail);
            var newLink = split[0] + keyworkBail + (quickBail ? '1' : '');
            split = newLink.split(keywordPage);
            newLink = keywordPage + split[1];
            bail.href = newLink;
        }
    }

    function parseTime(timeStr) {
        const timeRegEx = /(?:(\d+)h?)?[^\d]*(?:(\d+)m?)?/
        let time = 0;
        const regexTime = timeStr.match(timeRegEx);
        if (regexTime) {
            const [timeStr, hours, minutes] = regexTime;
            hours && (time += 60 * parseInt(hours)), minutes && (time += parseInt(minutes))
        }
        return time;
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
                if(mutation.addedNodes.length > 0){
                    for(const node of mutation.addedNodes){
                        if(node.tagName == 'LI'){
                            filterJail();
                            break;//if at least one node is found, all will be checked so no point in loop anymore
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

    targetNode = jail;

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    // Later, you can stop observing
    //observer.disconnect();
}

})();