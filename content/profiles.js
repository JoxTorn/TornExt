(function(){
    
    //console.log('profiles');

var API_KEY = false;

var SelectedStats = [];

var search = window.location.search.slice(1)
const regexp = /([^&=]+)=?([^&]*)/g;
var data = {}
for (let field; filed = regexp.exec(search);) data[decodeURIComponent(filed[1])] = decodeURIComponent(filed[2]);

var profiles = document.querySelector('.profile-wrapper');

var myDiv = document.createElement('div');
myDiv.id = 'JoxDiv';
myDiv.classList.add('my-flex-container');

var widget = TornExtGlobal.Widget(
    {
        title:'Torn Stats Spy Report',
        title_small:'Torn Stats Spy Report',
        colapsable: true,
        flex: true
    }
)
widget.container.classList.add('my-margin-top10');

myDiv.appendChild(widget.container);



TornStatsPromise = TornExtStorage.get('LinkTornStats');
TornStatsPromise.then((e) => {
    if(e.LinkTornStats){
        APIKeyPromise = TornExtStorage.get('APIkey');
        APIKeyPromise.then((e) => {
            if(e.APIkey){
                API_KEY = e.APIkey;
                
                profiles.appendChild(myDiv);
                getStats();
            }
        })
    }
})


function getStats(){

    var dataSource = `https://www.tornstats.com/api.php?action=spy&key=${API_KEY}&target=${data.XID}`;
    
    var tornstatsData = fetch(dataSource, {method: 'get', headers: void 0, body: void 0}).catch((e) => {
        throw e
    }).then((e) => e.json().catch((e) => {
        throw e
    })).then((e) => {
        if (!e) throw e;
        else if (e.error) throw e.error;
        return e
    })
    
    
    tornstatsData.then((TornStats) => {
    
        console.log(TornStats);

        //var debugdata = '{"compare":{"status":true,"data":{"Xanax Taken":{"amount":233,"difference":397},"Refills":{"amount":39,"difference":172},"Defends Won":{"amount":55,"difference":321},"Defends Lost":{"amount":3313,"difference":1367},"Networth":{"amount":206747011,"difference":7916132772},"Ecstasy Taken":{"amount":22,"difference":39}},"message":"https:\/\/www.tornstats.com\/compare.php?id=1979566"},"timestamp":"1535392006","spy":{"type":"personal-spy","status":false,"message":"Spy not found."},"attacks":{"status":true,"message":"Looking for attacks.","data":["You Hospitalized Barry_Allen at 27\/08\/18 18:23:37 PM","You Hospitalized Barry_Allen at 27\/08\/18 04:32:34 AM","You Hospitalized Barry_Allen at 26\/08\/18 04:45:31 AM"]}}';
        //TornStats = JSON.parse(debugdata);
        //console.log(TornStats);

        widget.body.innerHTML = ''; //clear
    
        var panelLeft = document.createElement('div');
        panelLeft.classList.add('my-flex');
        //panelLeft.classList.add('my-hide');
        panelLeft.id = 'personalStats';
    
        var panelRight = document.createElement('div');
        panelRight.classList.add('my-flex');
        //panelRight.classList.add('my-hide');
        panelRight.id = 'spyStats';

        var panelStatsLeft = document.createElement('div');
        panelStatsLeft.classList.add('my-flex');
        panelStatsLeft.classList.add('my-hide');
        panelStatsLeft.id = 'selecedStats';
    
        var panelStatsRight = document.createElement('div');
        panelStatsRight.classList.add('my-flex');
        panelStatsRight.classList.add('my-hide');
        panelStatsRight.id = 'otherStats';
    
        var linkCompare = document.createElement('a');
        linkCompare.href = TornStats.compare.message;
        linkCompare.innerHTML = 'View full comparation';
    
        var tableCompare = document.createElement('table');
        tableCompare.classList.add('table-style');
        var tableSpy = document.createElement('table');
        tableSpy.classList.add('table-style');
        var tableAttacks = document.createElement('table');
        tableAttacks.classList.add('table-style');
    
    
        /*PERSONAL STATS COMPARE*/
        var headerCompare = document.createElement('tr');
        var headerCompare1 = document.createElement('th');
        var headerCompare2 = document.createElement('th');
        var headerCompare3 = document.createElement('th');
    
        headerCompare1.innerHTML = 'Personal Stats';
        headerCompare2.innerHTML = 'Target';
        headerCompare3.innerHTML = 'You';
    
        headerCompare.appendChild(headerCompare1);
        headerCompare.appendChild(headerCompare2);
        headerCompare.appendChild(headerCompare3);
    
        tableCompare.appendChild(headerCompare);
    
        if(TornStats.compare.status){

            SelectedStats = [];

            for(var stat in TornStats.compare.data){
                SelectedStats.push(TornExtGlobal.personalStats.get_by_name(stat));
            }
    
            console.log('selected stats', SelectedStats)
    
            for(var i in TornStats.compare.data){
                var rowCompare = document.createElement('tr');
                var rowCompare1 = document.createElement('td');
                var rowCompare2 = document.createElement('td');
                var rowCompare3 = document.createElement('td');
    
                rowCompare1.innerHTML = i;
                rowCompare2.innerHTML = formatNumber(TornStats.compare.data[i].amount,0,3);
                rowCompare3.innerHTML = TornStats.compare.data[i].difference <= 0 ? formatNumber(TornStats.compare.data[i].difference,0,3) : '+' + formatNumber(TornStats.compare.data[i].difference,0,3);
                var color = TornStats.compare.data[i].difference < 0 ? 'red' : TornStats.compare.data[i].difference > 0 ? 'green' : undefined;
                if(color){rowCompare3.style.color = color};
    
                rowCompare.appendChild(rowCompare1);
                rowCompare.appendChild(rowCompare2);
                rowCompare.appendChild(rowCompare3);
    
                tableCompare.appendChild(rowCompare);
            }
    
            var rowComapreLink = document.createElement('tr');
            var rowComapreLink1 = document.createElement('td');
            rowComapreLink1.setAttribute('colspan',3);
            rowComapreLink1.style.textAlign = 'center';
    
            rowComapreLink1.appendChild(linkCompare);
    
            rowComapreLink.appendChild(rowComapreLink1);
    
            tableCompare.appendChild(rowComapreLink);
        }
        else {
            var rowCompare = document.createElement('tr');
            var rowCompare1 = document.createElement('td');
    
            rowCompare1.innerHTML = TornStats.compare.message;
            rowCompare1.setAttribute('colspan',3);
    
            rowCompare.appendChild(rowCompare1);
    
            tableCompare.appendChild(rowCompare);
        }
    
        panelLeft.appendChild(tableCompare);
        
    
        /*SPY COMPARE*/
        var headerSpy = document.createElement('tr');
        var headerSpy1 = document.createElement('th');
    
        var SpyType = {
            "faction-spy" : "Faction Spy",
            "personal-spy" : "Personal Spy",
            "faction-share" : "Faction Share"
        }
    
        headerSpy1.innerHTML = TornStats.spy.status ? SpyType[TornStats.spy.type] + ' - ' + TornStats.spy.difference : 'Latest Spy';
        headerSpy1.setAttribute('colspan',3);
        headerSpy1.classList.add('left-text');
    
        headerSpy.appendChild(headerSpy1);
    
        tableSpy.appendChild(headerSpy);
    
        //console.log(TornStats);
    
        if(TornStats.spy.status){
            var color = {
                strength : TornStats.spy.deltaStrength < 0 ? 'red' : TornStats.spy.deltaStrength > 0 ? 'green' : undefined,
                defense : TornStats.spy.deltaDefense < 0 ? 'red' : TornStats.spy.deltaDefense > 0 ? 'green' : undefined,
                speed : TornStats.spy.deltaSpeed < 0 ? 'red' : TornStats.spy.deltaSpeed > 0 ? 'green' : undefined,
                dexterity : TornStats.spy.deltaDexterity < 0 ? 'red' : TornStats.spy.deltaDexterity > 0 ? 'green' : undefined,
                total : TornStats.spy.deltaTotal < 0 ? 'red' : TornStats.spy.deltaTotal > 0 ? 'green' : undefined,
                score : TornStats.spy.target_score > TornStats.spy.your_score ? 'red' : TornStats.spy.your_score > TornStats.spy.target_score ? 'green' : undefined
            };
            /*Strength*/
            var rowSpyStrength = document.createElement('tr');
            var rowSpyStrength1 = document.createElement('td');
            var rowSpyStrength2 = document.createElement('td');
            var rowSpyStrength3 = document.createElement('td');
    
            rowSpyStrength1.innerHTML = "Strength";
            rowSpyStrength2.innerHTML = formatNumber(TornStats.spy.strength,0,3);
            rowSpyStrength3.innerHTML = TornStats.spy.deltaStrength <= 0 ? formatNumber(TornStats.spy.deltaStrength,0,3) : '+' + formatNumber(TornStats.spy.deltaStrength,0,3); 
            if(color.strength){rowSpyStrength3.style.color = color.strength};
    
            rowSpyStrength.appendChild(rowSpyStrength1);
            rowSpyStrength.appendChild(rowSpyStrength2);
            rowSpyStrength.appendChild(rowSpyStrength3);
    
            tableSpy.appendChild(rowSpyStrength);
    
            /*Defense*/
            var rowSpyDefense = document.createElement('tr');
            var rowSpyDefense1 = document.createElement('td');
            var rowSpyDefense2 = document.createElement('td');
            var rowSpyDefense3 = document.createElement('td');
    
            rowSpyDefense1.innerHTML = "Defense";
            rowSpyDefense2.innerHTML = formatNumber(TornStats.spy.defense,0,3);
            rowSpyDefense3.innerHTML = TornStats.spy.deltaDefense <= 0 ? formatNumber(TornStats.spy.deltaDefense,0,3) : '+' + formatNumber(TornStats.spy.deltaDefense,0,3);
            if(color.defense){rowSpyDefense3.style.color = color.defense};
    
            rowSpyDefense.appendChild(rowSpyDefense1);
            rowSpyDefense.appendChild(rowSpyDefense2);
            rowSpyDefense.appendChild(rowSpyDefense3);
    
            tableSpy.appendChild(rowSpyDefense);
    
            /*Speed*/
            var rowSpySpeed = document.createElement('tr');
            var rowSpySpeed1 = document.createElement('td');
            var rowSpySpeed2 = document.createElement('td');
            var rowSpySpeed3 = document.createElement('td');
    
            rowSpySpeed1.innerHTML = "Speed";
            rowSpySpeed2.innerHTML = formatNumber(TornStats.spy.speed,0,3);
            rowSpySpeed3.innerHTML = TornStats.spy.deltaSpeed <= 0 ? formatNumber(TornStats.spy.deltaSpeed,0,3) : '+' + formatNumber(TornStats.spy.deltaSpeed,0,3);
            if(color.speed){rowSpySpeed3.style.color = color.speed};
    
            rowSpySpeed.appendChild(rowSpySpeed1);
            rowSpySpeed.appendChild(rowSpySpeed2);
            rowSpySpeed.appendChild(rowSpySpeed3);
    
            tableSpy.appendChild(rowSpySpeed);
    
            /*Dexterity*/
            var rowSpyDexterity = document.createElement('tr');
            var rowSpyDexterity1 = document.createElement('td');
            var rowSpyDexterity2 = document.createElement('td');
            var rowSpyDexterity3 = document.createElement('td');
    
            rowSpyDexterity1.innerHTML = "Dexterity";
            rowSpyDexterity2.innerHTML = formatNumber(TornStats.spy.dexterity,0,3);
            rowSpyDexterity3.innerHTML = TornStats.spy.deltaDexterity <= 0 ? formatNumber(TornStats.spy.deltaDexterity,0,3) : '+' + formatNumber(TornStats.spy.deltaDexterity,0,3);
            if(color.dexterity){rowSpyDexterity3.style.color = color.dexterity};
    
            rowSpyDexterity.appendChild(rowSpyDexterity1);
            rowSpyDexterity.appendChild(rowSpyDexterity2);
            rowSpyDexterity.appendChild(rowSpyDexterity3);
    
            tableSpy.appendChild(rowSpyDexterity);
    
            /*Total*/
            var rowSpyTotal = document.createElement('tr');
            var rowSpyTotal1 = document.createElement('td');
            var rowSpyTotal2 = document.createElement('td');
            var rowSpyTotal3 = document.createElement('td');
    
            rowSpyTotal1.innerHTML = "Total";
            rowSpyTotal2.innerHTML = formatNumber(TornStats.spy.total,0,3);
            rowSpyTotal3.innerHTML = TornStats.spy.deltaTotal <= 0 ? formatNumber(TornStats.spy.deltaTotal,0,3) : '+' + formatNumber(TornStats.spy.deltaTotal,0,3);
            if(color.total){rowSpyTotal3.style.color = color.total};
    
            rowSpyTotal.appendChild(rowSpyTotal1);
            rowSpyTotal.appendChild(rowSpyTotal2);
            rowSpyTotal.appendChild(rowSpyTotal3);
    
            tableSpy.appendChild(rowSpyTotal);
    
            /*Score*/
            var rowSpyScore = document.createElement('tr');
            var rowSpyScore1 = document.createElement('td');
            var rowSpyScore2 = document.createElement('td');
            var rowSpyScore3 = document.createElement('td');
    
            rowSpyScore1.innerHTML = "<strong>Score</strong>";
            rowSpyScore2.innerHTML = '<strong>' + formatNumber(TornStats.spy.target_score,0,3) + '</strong>';
            rowSpyScore3.innerHTML = '<strong>' + formatNumber(TornStats.spy.your_score,0,3) + '</strong>';
            if(color.score){rowSpyScore3.style.color = color.score};
    
            rowSpyScore.appendChild(rowSpyScore1);
            rowSpyScore.appendChild(rowSpyScore2);
            rowSpyScore.appendChild(rowSpyScore3);
    
            tableSpy.appendChild(rowSpyScore);
        }
        else {
            var rowSpy = document.createElement('tr');
            var rowSpy1 = document.createElement('td');
    
            rowSpy1.innerHTML = TornStats.spy.message;
            rowSpy1.setAttribute('colspan',3);
    
            rowSpy.appendChild(rowSpy1);
    
            tableSpy.appendChild(rowSpy);
        }
    
        panelRight.appendChild(tableSpy);
    
        /*ATTACKS*/
        var headerAttacks = document.createElement('tr');
        var headerAttacks1 = document.createElement('th');
        headerAttacks1.classList.add('left-text');
     
        headerAttacks1.innerHTML = 'Recent Attacks';
     
        headerAttacks.appendChild(headerAttacks1);
    
        tableAttacks.appendChild(headerAttacks);
     
        if(TornStats.attacks.status){
     
            for(var i in TornStats.attacks.data){
                var rowAttacks = document.createElement('tr');
                var rowAttacks1 = document.createElement('td');
     
                rowAttacks1.innerHTML = TornStats.attacks.data[i];
     
                rowAttacks.appendChild(rowAttacks1);
     
                tableAttacks.appendChild(rowAttacks);
            }
     
        }
        else {
            var rowAttacks = document.createElement('tr');
            var rowAttacks1 = document.createElement('td');
     
            rowAttacks1.innerHTML = TornStats.attacks.message;
            rowAttacks1.setAttribute('colspan',3);
     
            rowAttacks.appendChild(rowAttacks1);
     
            tableAttacks.appendChild(rowAttacks);
        }

        var rowSettings = document.createElement('tr');
        var rowSettings1 = document.createElement('td');
        rowSettings1.classList.add('my-padding-top10');
        rowSettings1.classList.add('my-padding-right10');
        rowSettings1.classList.add('my-padding-bottom10');
        rowSettings1.classList.add('my-padding-left10');
    
        var btn = document.createElement('button');
        btn.innerHTML = 'SETTINGS';
        btn.classList.add('my-btn');
        btn.classList.add('my-width100');
        btn.addEventListener('click', (e) => {
            panelLeft.classList.add('my-hide');
            panelRight.classList.add('my-hide');
            panelStatsLeft.classList.remove('my-hide');
            panelStatsRight.classList.remove('my-hide');
        })
        rowSettings1.appendChild(btn);
        
        rowSettings1.setAttribute('colspan',3);
    
        rowSettings.appendChild(rowSettings1);
    
        tableAttacks.appendChild(rowSettings);
     
        panelRight.appendChild(tableAttacks);
    
    
        widget.body.appendChild(panelLeft);
        widget.body.appendChild(panelRight);


        /*SELCTED STATS*/
        drawSelectedStats(panelStatsLeft);

        /*NOT selected STATS*/
        drawOtherdStats(panelStatsRight);

        widget.body.appendChild(panelStatsLeft);
        widget.body.appendChild(panelStatsRight);
    
    });
}

function drawSelectedStats(container) {
    var tableStats = document.createElement('table');
    tableStats.classList.add('table-style');
    tableStats.id = 'tableStatsSelected';

    var headerStats = document.createElement('tr');
    var headerStats1 = document.createElement('th');

    headerStats1.innerHTML = 'Selected Personal Stats';

    headerStats.appendChild(headerStats1);

    tableStats.appendChild(headerStats);

    for(var stat of SelectedStats){
        var rowStats = document.createElement('tr');
        var rowStats1 = document.createElement('td');

        rowStats1.innerHTML = stat.name;
        rowStats1.setAttribute('data-id', stat.key);
        rowStats1.classList.add('my-hover');

        rowStats1.addEventListener('click', function(e) {
            //alert(e.target.dataset.id);
            if(e.target == this){
                
                var tabeleSelented = document.getElementById('tableStatsNotSelected');
                var tabeleNotSelented = document.getElementById('tableStatsSelected');
                
                if(e.target.parentNode.parentNode == tabeleSelented){
                    //ADD STAT
                    if(SelectedStats.map((e)=>{return e.key}).indexOf(e.target.dataset.id) < 0){
                        SelectedStats.push(TornExtGlobal.personalStats.get_by_id(e.target.dataset.id));
                    }
                    e.target.parentNode.remove();
                    tabeleNotSelented.appendChild(e.target.parentNode);
                }
                else{
                    //REMOVE STAT
                    for (var i = SelectedStats.length-1; i >= 0; i--) {
                        if (SelectedStats[i].key === e.target.dataset.id) {
                            SelectedStats.splice(i, 1);
                            break;       //<-- Uncomment  if only the first term has to be removed
                        }
                    }
                    e.target.parentNode.remove();
                    tabeleSelented.appendChild(e.target.parentNode);
                }
                
            }
        })

        rowStats.appendChild(rowStats1);

        tableStats.appendChild(rowStats);
    }
    
    container.classList.add('my-height200');
    container.classList.add('my-overflow-y');
    container.appendChild(tableStats);
}

function drawOtherdStats(container){
    var tableStats = document.createElement('table');
    tableStats.classList.add('table-style');
    tableStats.id = 'tableStatsNotSelected';

    var headerStats = document.createElement('tr');
    var headerStats1 = document.createElement('th');

    headerStats1.innerHTML = 'Not Selected Personal Stats';

    headerStats.appendChild(headerStats1);

    tableStats.appendChild(headerStats);

    let difference = TornExtGlobal.personalStats.filter(x => !SelectedStats.includes(x));

    for(stat of difference){
        var rowStats = document.createElement('tr');
        var rowStats1 = document.createElement('td');

        rowStats1.innerHTML = stat.name;
        rowStats1.setAttribute('data-id', stat.key);
        rowStats1.classList.add('my-hover');

        rowStats1.addEventListener('click', function(e) {
            if(e.target == this){
                
                var tabeleSelented = document.getElementById('tableStatsNotSelected');
                var tabeleNotSelented = document.getElementById('tableStatsSelected');
                
                if(e.target.parentNode.parentNode == tabeleSelented){
                    //ADD STAT
                    if(SelectedStats.map((e)=>{return e.key}).indexOf(e.target.dataset.id) < 0){
                        SelectedStats.push(TornExtGlobal.personalStats.get_by_id(e.target.dataset.id));
                    }
                    e.target.parentNode.remove();
                    tabeleNotSelented.appendChild(e.target.parentNode);
                }
                else{
                    //REMOVE STAT
                    for (var i = SelectedStats.length-1; i >= 0; i--) {
                        if (SelectedStats[i].key === e.target.dataset.id) {
                            SelectedStats.splice(i, 1);
                            break;       //<-- Uncomment  if only the first term has to be removed
                        }
                    }
                    e.target.parentNode.remove();
                    tabeleSelented.appendChild(e.target.parentNode);
                }
                
            }
        })

        rowStats.appendChild(rowStats1);
        
        tableStats.appendChild(rowStats);
    }

    var div = document.createElement('div');
    div.classList.add('my-height200');
    div.classList.add('my-overflow-y');
    div.appendChild(tableStats)

    var footer = document.createElement('div');
    var btn = document.createElement('button');
    btn.id = 'saveBtn';
    btn.innerHTML = 'SAVE';
    btn.classList.add('my-btn');
    btn.classList.add('my-width100');
    btn.onclick = saveSelectedStats;

    footer.appendChild(btn);

    container.appendChild(div);
    container.appendChild(footer);
}

function saveSelectedStats(){
    var dataSource = `https://www.tornstats.com/api.php?key=${API_KEY}&action=setSettings&spy=1&comparespy=1&comparepersonal=1&personalstats=`;
    var isFirst = true;
    for(var ss of SelectedStats){
        dataSource += (isFirst ? '' : ',') + ss.key;
        isFirst = false;
    }

    var btn = document.getElementById('saveBtn');
    btn.innerHTML = 'Updating Torn Stats data...';
    
    var tornstatsData = fetch(dataSource, {method: 'get', headers: void 0, body: void 0}).catch((e) => {
        throw e
    }).then((e) => e.json().catch((e) => {
        throw e
    })).then((e) => {
        if (!e) throw e;
        else if (e.error) throw e.error;
        return e
    })
    
    
    tornstatsData.then((TornStats) => {
        getStats();
    });
}

/**
 * formatNumber(num, dec, sep)
 * 
 * @param number  num: number to format
 * @param integer dec: length of decimal
 * @param integer sep: length of sections
 */
function formatNumber(num, dec, sep) {
    num = Number(num);
    var re = '\\d(?=(\\d{' + (sep || 3) + '})+' + (dec > 0 ? '\\.' : '$') + ')';
    return num.toFixed(Math.max(0, ~~dec)).replace(new RegExp(re, 'g'), '$&,');
}

})();