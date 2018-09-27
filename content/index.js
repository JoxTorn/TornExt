(function(){
    
//console.log('index');

var API_KEY = false;

function insertAfter(element, after){
    after.parentNode.insertBefore(element, after.nextSibling);
}

function createElement(tag){
    return document.createElement(tag);
}

/*************************************************************/
//TRAVEL

const travelAgencyMarket = document.querySelectorAll('.travel-agency-market .item-info-wrap');
if(travelAgencyMarket.length){
    const msg = Array.prototype.find.call(document.querySelectorAll('.msg'), (msg) => msg.textContent.includes('You are in')).querySelectorAll('.bold');

    if(msg.length == 4){
        const [country, money, bought, maxBuy] = msg;
        numMoney = parseInt(money.textContent.replace(/[^\d]/g, ''));
        numBought = parseInt(bought.textContent);
        numMaxBuy = parseInt(maxBuy.textContent);

        console.log(country, money, bought, maxBuy);
        console.log(numMoney, numBought, numMaxBuy);

        const market = document.querySelectorAll('.travel-agency-market .item-info-wrap');
        
        var btnWrap = createElement('div');
        var btn = createElement('button');
        btn.innerHTML = 'MAX';
        btnWrap.classList.add('my-float-right');
        btnWrap.appendChild(btn);
        btn.addEventListener('click', function(e){
            if(e.target == this){

                Array.prototype.forEach.call(market, (item) => {
                    const stock = item.querySelector('.stck-amount'),
                        textbox = item.querySelector('input[name=amount]'),
                        price = item.querySelector('.c-price'),
                        numStock = parseInt(stock.textContent.replace(/[^\d]/g, '')),
                        numPrice = parseInt(price.textContent.replace(/[^\d]/g, '')),
                        
                        maxBuy = Math.min(Math.floor(numMoney / numPrice), numStock, numMaxBuy - numBought);
        
                    textbox.value = maxBuy, textbox.dispatchEvent(new Event('blur'))
                })
            }
        })

        var widget = TornExtGlobal.Widget(
            {
                title:'',
                colapsable: true
            }
        )
        
        widget.header.appendChild(btnWrap);

        var container = document.querySelector('.content-title');

        var myDiv = document.createElement('div');
        myDiv.id = 'JoxDiv';
        
        insertAfter(myDiv, container);

        myDiv.appendChild(widget.container);
    
        //UPDATE TRAVEL HUB

        const header = document.querySelector('.header').classList,
        destination = [{
            name: 'mexico',
            title: 'Mexico'
        }, {
            name: 'cayman-islands',
            title: 'Cayman Islands'
        }, {
            name: 'canada',
            title: 'Canada'
        }, {
            name: 'hawaii',
            title: 'Hawaii'
        }, {
            name: 'uk',
            title: 'United Kingdom'
        }, {
            name: 'argentina',
            title: 'Argentina'
        }, {
            name: 'switzerland',
            title: 'Switzerland'
        }, {
            name: 'japan',
            title: 'Japan'
        }, {
            name: 'china',
            title: 'China'
        }, {
            name: 'uae',
            title: 'UAE'
        }, {
            name: 'south-africa',
            title: 'South Africa'
        }].find((destination) => header.contains(destination.name));


        console.log('Updating Market Data...');
        widget.title.innerHTML = 'Updating Market Data... ';

        const items = Array.prototype.map.call(market, (item) => {
            const id = item.querySelector('input[name=amount]').id,
                stock = item.querySelector('.stck-amount').textContent,
                price = item.querySelector('.c-price').textContent;
            return {
                item_id: parseInt(id.slice(5)),
                units: parseInt(stock.replace(/[^\d]/g, '')),
                price: parseInt(price.replace(/[^\d]/g, ''))
            }
        });

        var data = {};
        data[destination.name] = items;
        console.log(JSON.stringify(data));


        //console.log(`https://api.doctorn.rocks/travel-hub/destinations/${b.name}`,c);
        //console.log(JSON.stringify(c));

        /*
        fetch(`https://api.doctorn.rocks/travel-hub/destinations/${destination.name}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(items)
        }).then((response) => {
            response.ok ? widget.title.innerHTML = 'Travel Hub updated!' : widget.title.innerHTML = 'Travel Hub update failed.';
        })
        */

       fetch(`https://torntravelhub.000webhostapp.com/travelhub.php`, {
            method: 'POST',
            /*
            headers: {
                "Content-Type": 'application/json'
            },
            */
            body: JSON.stringify(data)
        }).then((response) => {
            response.ok ? widget.title.innerHTML = 'Market data updated! ' : widget.title.innerHTML = 'Market data update failed. ';
        }).catch((e) => {
            console.log(e);
        })
    }

}

/**************************************************************/

/*************************************************************/
//BATTLESTATS



const bsBox = document.querySelector('.sortable-box .battle');

if(bsBox){

    const bsBoxRows = bsBox.querySelectorAll('li:not(.last)');

    var myDiv = document.createElement('div');
    myDiv.id = 'JoxDiv';

    bsBox.appendChild(myDiv);


    EfectiveBattleStats();

    TornStatsPromise = TornExtStorage.get('LinkTornStats');
    TornStatsPromise.then((e) => {
        if(e.LinkTornStats){
            APIKeyPromise = TornExtStorage.get('APIkey');
            APIKeyPromise.then((e) => {
                if(e.APIkey){
                    API_KEY = e.APIkey;
                    TornStatsGraph();
                }
            })
        }
    })


    function EfectiveBattleStats(){
        var bs = [];

        for (const row of bsBoxRows) {
            const name = row.querySelector('.divider').textContent.trim();
            const value = parseInt(row.querySelector('.desc').textContent.replace(/[ ,]/g, ''));
            if(row.querySelector('.mod') && row.querySelector('.mod').textContent.trim()){
                const modifier = parseInt(row.querySelector('.mod').textContent.trim().replace(/−/g, '-'), 10);
                const total = parseInt(value * (1 + modifier / 100), 10);
                bs.push({
                    name: name,
                    value: value,
                    modifier: modifier,
                    total: total
                });
            }
        }

        //saberem sve element
        bs.push({
            name: 'Total',
            value: 0,
            modifier: 0,
            total: bs.reduce((accumulator, currentValue) => { return accumulator + currentValue.total}, 0)
        });

        var ul = document.createElement('ul');
        ul.classList.add('info-cont-wrap');

        for(const stat of bs){

            var textNode = document.createTextNode('\n\t\t\t'); //Ovo je bitno radi poravnanja stranice (e jebem li ga)

            var li = document.createElement('li');

            var spanName = document.createElement('span');
            spanName.classList.add('divider');
            spanName.innerHTML = '<span>' + stat.name + '</span>';

            var spanValue = document.createElement('span');
            spanValue.classList.add('desc');
            spanValue.innerHTML = formatNumber(stat.total,0,3);

            var spanMod = document.createElement('span');
            spanMod.classList.add('mod');
            spanMod.innerHTML = '';

            li.appendChild(spanName);
            li.appendChild(textNode);
            li.appendChild(spanValue);
            li.appendChild(spanMod);

            ul.appendChild(li);
        }

        //myDiv.appendChild(ul);

        var widgetStats = TornExtGlobal.Widget(
            {
                title:'Effective battle stats',
                title_small:'Effective battle stats',
                colapsable: true
            }
        )

        widgetStats.body.appendChild(ul);
        myDiv.appendChild(widgetStats.container);
        
    }


    function TornStatsGraph(){
        canvas = document.createElement('canvas');
        canvas.id = 'chart';



        var dataSource = `https://www.tornstats.com/api.php?action=getStatGraph&key=${API_KEY}&t=${Date.now()}`; //&t=totalStats

        var tornstatsData = fetch(dataSource, {method: 'get', headers: void 0, body: void 0}).catch((e) => {
            throw e
        }).then((e) => e.json().catch((e) => {
            throw e
        })).then((e) => {
            if (!e) throw e;
            else if (e.error) throw e.error;
            return e
        })



        tornstatsData.then((e) => {

            var isChrome = false;
            if(typeof browser === 'undefined' || browser === null){isChrome = true};

            console.log(e)

            var labels = [];
            var strength = [];
            var defense = [];
            var speed = [];
            var dexterity = [];
            var total = [];

            for(var peace of e.data){
                labels.push(isChrome ? new Date(peace.timestamp * 1000) : new Date(peace.timestamp * 1000).toLocaleDateString());
                strength.push(peace.strength);
                defense.push(peace.defense);
                speed.push(peace.speed);
                dexterity.push(peace.dexterity);
                total.push(peace.strength + peace.defense + peace.speed + peace.dexterity);
            }

            var chartConfig = {
                type:"line",
                data:{
                    labels: labels,//["January","February","March","April","May","June","July"],
                    datasets:[
                        {
                            label:"Strength",
                            data:strength,//[65,59,80,81,56,55,40],
                            fill:false,
                            borderColor: "#3366cc",
                            backgroundColor: "#3366cc",
                        },
                        {
                            label:"Defense",
                            data:defense,//[65,59,80,81,56,55,40],
                            fill:false,
                            borderColor: "#dc3912",
                            backgroundColor: "#dc3912",
                        },
                        {
                            label:'Speed',
                            data:speed,//[65,59,80,81,56,55,40],
                            fill:false,
                            borderColor: "#ff9900",
                            backgroundColor: "#ff9900",
                        },
                        {
                            label:"Dexterity",
                            data:dexterity,//[65,59,80,81,56,55,40],
                            fill:false,
                            borderColor: "#109618",
                            backgroundColor: "#109618"
                        }, 
                        {
                            label: "Total",
                            data: total,
                            fill:false,
                            borderColor: "#990099",
                            backgroundColor: "#990099",
                            hidden: true
                        }
                    ]
                },
                options:{
                    elements: {
                        point:{
                            radius: 0
                        }
                    },
                    layout: {
                        padding: {
                            top: 20,
                            right: 0,
                            bottom: 5,
                            left: 10
                        }
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            usePointStyle: false
                        },
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                        /*,
                        xAxes: [{
                            //type : 'time',
                            time: {
                                unit: 'month'
                            }
                        }]
                        */
                    },
                    responsive: true,
                    maintainAspectRatio: true,
                    tooltips: {
                        mode: "index",
                        position: "average",
                        intersect: false,
                        caretSize: 0,
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var label = data.datasets[tooltipItem.datasetIndex].label || '';

                                if (label) {
                                    label += ': ';
                                }
                                label += tooltipItem.yLabel.toLocaleString();
                                return label;
                            }
                        }
                    }
                }
            }
            if(isChrome){
                chartConfig.options.scales.xAxes = [{
                    type : 'time',
                    time: {
                        unit: 'month'
                    }
                }]
            }
            else{
                chartConfig.options.scales.xAxis = [{
                    //type : 'time', //this simply dont work on Firefox
                    time: {
                        unit: 'month'
                    }
                }]
            }
            var myLineChart = new Chart(canvas, chartConfig);
        });



        //myDiv.appendChild(canvas);
        var widgetGraph = TornExtGlobal.Widget(
            {
                title:'Torn Stats Graph',
                title_small:'Torn Stats Graph',
                colapsable: true
            }
        )

        widgetGraph.body.appendChild(canvas);
        myDiv.appendChild(widgetGraph.container);
    }

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

TornExtGlobal.ajaxComplete = function(e,xhr,settings){
    console.log('MyAjaxComplete',e,xhr,settings);
}

})();