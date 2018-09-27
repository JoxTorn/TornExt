window.onload = windowOnLoad;

function windowOnLoad(){
    crateForm();
}

function crateForm(){
    var div = document.getElementById('container');

    //ALLIGHN TORN LEFT

    var cbTornLeft = document.createElement('input');
    cbTornLeft.id = 'AlignTornLeft';
    cbTornLeft.type = 'checkbox';
    cbTornLeft.style.width = '20px';
    cbTornLeft.style.height = '20px';
    cbTornLeft.addEventListener('change', function(e){
        save = TornExtStorage.set({'AlignTornLeft': e.target.checked});
    })

    var lblTornLeft = document.createElement('label');
    lblTornLeft.for = 'AlignTornLeft';
    lblTornLeft.innerHTML = 'Align Torn Left';

    TornLeftPromise = TornExtStorage.get('AlignTornLeft');
    TornLeftPromise.then((e) => {
        if(e.AlignTornLeft){
            cbTornLeft.checked = e.AlignTornLeft;
        }
        else{
            cbTornLeft.checked = false;
        }
    })

    div.appendChild(cbTornLeft);
    div.appendChild(lblTornLeft);

    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('br'));

    //LINK WITH TORNSTATS

    var cbTornStats = document.createElement('input');
    cbTornStats.id = 'LinkTornStats';
    cbTornStats.type = 'checkbox';
    cbTornStats.style.height = '20px';
    cbTornStats.style.width = '20px';
    cbTornStats.addEventListener('change', function(e){
        save = TornExtStorage.set({'LinkTornStats': e.target.checked});
    })

    var lblTornStats = document.createElement('label');
    lblTornStats.for = 'LinkTornStats';
    lblTornStats.innerHTML = 'Link with Torn Stats - warning: this option will send your API key to tornstats';

    TornStatsPromise = TornExtStorage.get('LinkTornStats');
    TornStatsPromise.then((e) => {
        if(e.LinkTornStats){
            cbTornStats.checked = e.LinkTornStats;
        }
        else{
            cbTornStats.checked = false;
        }
    })

    div.appendChild(cbTornStats);
    div.appendChild(lblTornStats);

    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('br'));

    //FORUM - HIDE NEGATIV KARMA
    
    var cbForumHide = document.createElement('input');
    cbForumHide.id = 'ForumHide';
    cbForumHide.type = 'checkbox';
    cbForumHide.style.height = '20px';
    cbForumHide.style.width = '20px';
    cbForumHide.addEventListener('change', function(e){
        save = TornExtStorage.set({'ForumHide': e.target.checked});
    })

    var lblForumHide = document.createElement('label');
    lblForumHide.for = 'ForumHide';
    lblForumHide.innerHTML = 'Hide forum post with negativ karma';

    ForumHidePromise = TornExtStorage.get('ForumHide');
    ForumHidePromise.then((e) => {
        if(e.ForumHide){
            cbForumHide.checked = e.ForumHide;
        }
        else{
            cbForumHide.checked = false;
        }
    })

    div.appendChild(cbForumHide);
    div.appendChild(lblForumHide);
}