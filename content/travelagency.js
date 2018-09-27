(function(){
    
//console.log('travelagency');

var travelAgency = document.querySelector('.travel-agency');
var container = document.querySelector('.content-wrapper');

var myDiv = document.createElement('div');
myDiv.id = 'JoxDiv';
myDiv.classList.add('travle-hub-div');

container.appendChild(myDiv);

if(/*travelAgency*/container){
    /*travelAgency*/container.addEventListener('click', (e) => {

        //console.log(e);
        /*
        const t = parseInt(e.target.dataset.id, 10),
            a = this.get('destinations').find((e) => e.id === t);
        a && this.select(a)
        */

        //prikazem podatke
        var destination = destinations.find(destination => destination.id == e.target.dataset.id);
        var country = destination ? destination.name : false;
        if(country){

            const city = document.querySelector(`.country[data-id="${e.target.dataset.id}"]`);
            for(var c of document.querySelectorAll('.country')){
                c.classList.remove('my-selected');
            }
            city.classList.add('my-selected');

            var div = document.querySelector('.items-container');
            div.innerHTML = '';

            var table = document.createElement('table');
            table.classList.add('table-style');

            var header = document.createElement('tr');
            var header1 = document.createElement('th');
            var header2 = document.createElement('th');
            var header3 = document.createElement('th');

            header1.innerHTML = 'Item';
            header2.innerHTML = 'Quantity';
            header3.innerHTML = 'Price';

            header.appendChild(header1);
            header.appendChild(header2);
            header.appendChild(header3);

            table.appendChild(header);
            
            if(stocks[country]){
                for(const item of stocks[country].supplies){
                    /*
                    var li = document.createElement('li');
                    li.innerHTML = 'Item: ' + item.item_id.toString() + ' Units:' + item.units.toString() + ' Price:' + item.price.toString()
                    div.appendChild(li);
                    */

                    var row = document.createElement('tr');
                    var row1 = document.createElement('td');
                    var row2 = document.createElement('td');
                    var row3 = document.createElement('td');

                    row1.innerHTML = TornExtGlobal.items.get_by_id(item.item_id).name;
                    row2.innerHTML = formatNumber(item.units,0,3);
                    row3.innerHTML = formatNumber(item.price,0,3);

                    row.appendChild(row1);
                    row.appendChild(row2);
                    row.appendChild(row3);

                    switch(TornExtGlobal.items.get_by_id(item.item_id).type){
                        case 'Drug':
                            row.style.backgroundColor = '#ffdd99';
                            break;
                        case 'Flower':
                            row.style.backgroundColor = '#33cc80';
                            break;
                        case 'Plushie':
                            row.style.backgroundColor = '#66ccff';
                            break;
                        default:
                            
                    }

                    table.appendChild(row);
                }
                var row = document.createElement('tr');
                var row1 = document.createElement('td');
                row1.setAttribute('colspan',3);
                
                var dateNow = Date.now() / 1000; //Convert to minutes
                var dateUpdated = stocks[country].timestamp;

                var lastUpdate = dateNow - dateUpdated;
                row1.innerHTML = '<strong>Last update ' + secondsToTimeString(lastUpdate) + ' minutes ago</strong>';
                row.appendChild(row1);
                table.appendChild(row);

            }
            else{
                var row = document.createElement('tr');
                var row1 = document.createElement('td');
                row1.setAttribute('colspan',3);
                
                row1.innerHTML = '<strong>No data...</strong>';
                row.appendChild(row1);
                table.appendChild(row);
            }
            
            div.appendChild(table);
            
        }
        
    });
}

var stocks = {}; //WebSocker updatuje ovu varijablu

var cities = document.querySelectorAll('[aria-expanded=true] > .raceway');
var destinations =  [
    {
    id: 2,
    name: 'mexico',
    title: 'Mexico',
    full_title: 'Mexico - Ciudad Juarez',
    supplies: [],
    timestamp: Date.now()
}, {
    id: 12,
    name: 'cayman-islands',
    title: 'Cayman Islands',
    full_title: 'Cayman Islands - George Town',
    supplies: [],
    timestamp: Date.now()
}, {
    id: 9,
    name: 'canada',
    title: 'Canada',
    full_title: 'Canada - Toronto',
    supplies: [],
    timestamp: Date.now()
}, {
    id: 3,
    name: 'hawaii',
    title: 'Hawaii',
    full_title: 'Hawaii - Honolulu',
    supplies: [],
    timestamp: Date.now()
}, {
    id: 10,
    name: 'uk',
    title: 'United Kingdom',
    full_title: 'United Kingdom - London',
    supplies: [],
    timestamp: Date.now()
}, {
    id: 7,
    name: 'argentina',
    title: 'Argentina',
    full_title: 'Argentina - Buenos Aires',
    supplies: [],
    timestamp: Date.now()
}, {
    id: 8,
    name: 'switzerland',
    title: 'Switzerland',
    full_title: 'Switzerland - Zurich',
    supplies: [],
    timestamp: Date.now()
}, {
    id: 5,
    name: 'japan',
    title: 'Japan',
    full_title: 'Japan - Tokyo',
    supplies: [],
    timestamp: Date.now()
}, {
    id: 6,
    name: 'china',
    title: 'China',
    full_title: 'China - Beijing',
    supplies: [],
    timestamp: Date.now()
}, {
    id: 11,
    name: 'uae',
    title: 'UAE',
    full_title: 'UAE - Dubai',
    supplies: [],
    timestamp: Date.now()
}, {
    id: 4,
    name: 'south-africa',
    title: 'South Africa',
    full_title: 'South Africa - Johannesburg',
    supplies: [],
    timestamp: Date.now()
}]


var nav = document.createElement('nav');

var ul = document.createElement('ul');

//for(var i = 0; i < destinations.length; i++){
for(const destination of destinations){
    //if(cities[i].dataset.race){
        var li = document.createElement('li');
        li.dataset.race = destination.name;
        li.dataset.id = destination.id;
        li.addEventListener('click', (e) => {
            //console.log(e);
            //console.log(e.target.dataset.race);
            const city = document.querySelector(`[aria-expanded=true] > .raceway[data-id="${e.target.dataset.id}"]`);
            //console.log(city);
            city && city.click();
            for(var c of document.querySelectorAll('.country')){
                c.classList.remove('my-selected');
            }
            e.target.classList.add('my-selected');
        }, {capture:true});
        li.classList.add('country');

        var img = document.createElement('i')
        img.classList.add(`icon-${destination.name}`);

        var text = document.createTextNode("\t\t\t" + destination.title);

        li.appendChild(img);
        li.appendChild(text);

        ul.appendChild(li);
    //}
}

var section = document.createElement('section');
section.classList.add('items-container');
//section.innerHTML = 'Something...';

var widget = TornExtGlobal.Widget(
    {
        title:'Item Market Abroad',
        title_small:'Item Market Abroad',
        colapsable: true,
        flex: true
    }
)
widget.container.classList.add('my-margin-top10');

nav.appendChild(ul);
widget.body.appendChild(nav);
widget.body.appendChild(section);

//var spacer = document.createElement('hr');
//spacer.classList.add('page-head-delimiter');
//spacer.classList.add('my-margin-top10');
//spacer.classList.add('my-margin-bottom10');

//myDiv.appendChild(spacer);
myDiv.appendChild(widget.container);

/*
var ws = new WebSocket('wss://api.doctorn.rocks/travel-hub/live');
ws.onmessage = function (event) {
    var travledata = JSON.parse(event.data)

    for(destination of travledata){

        stocks[destination.destination] = {
            supplies  : destination.supplies,
            timestamp : destination.timestamp
        }
    }
}
*/
var dataSource = `https://torntravelhub.000webhostapp.com/travelhub.php`;

var travelhubData = fetch(dataSource, {method: 'get', headers: void 0, body: void 0}).catch((e) => {
    throw e
}).then((e) => e.json().catch((e) => {
    throw e
})).then((e) => {
    if (!e) throw e;
    else if (e.error) throw e.error;
    return e
})

travelhubData.then((e) => {
    var travledata = e;

    for(destination in travledata){

        stocks[destination] = {
            supplies  : travledata[destination].supplies,
            timestamp : travledata[destination].timestamp
        }
    }
})

var question = document.querySelector('.travel-confirm > .travel-question > .q-wrap');
var ocTextIndex = question ? question.innerHTML.indexOf('Note: An organised crime') : false;
if(ocTextIndex !== false && ocTextIndex > -1){
    //debugger;
    console.log(question.innerHTML.toString().substr(ocTextIndex, question.innerHTML.toString().length - 1));
    setTimeout(function(){alert(question.innerHTML.toString().substr(ocTextIndex, question.innerHTML.toString().length - 1))},500);
}
else{
    //debugger;
    console.log('no OC note', ocTextIndex);
    //setTimeout(function(){alert('no OC')},500);
}



/**
 * formatNumber(num, dec, sep)
 * 
 * @param integer n: length of decimal
 * @param integer x: length of sections
 */
function formatNumber(num, dec, sep) {
    num = Number(num);
    var re = '\\d(?=(\\d{' + (sep || 3) + '})+' + (dec > 0 ? '\\.' : '$') + ')';
    return num.toFixed(Math.max(0, ~~dec)).replace(new RegExp(re, 'g'), '$&,');
}

function secondsToTimeString(seconds){
    var totalSeconds = parseInt(seconds);
    var time = "";
    if(totalSeconds > 3600){
        var hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        time += hours + "h ";
    }
    if(totalSeconds > 60 || time != ""){
        var minutes = Math.floor(totalSeconds / 60);
        totalSeconds %= 60;
        time += minutes + "m ";
    }

    time += totalSeconds + "s";

    return time;
}

})();