(function(){
    
//console.log('gym');

var API_KEY = false;

const gym = document.getElementById('gymroot');

var myDiv = document.createElement('div');
myDiv.id = 'JoxDiv';


var isChrome = false;

var labels = [];
var strength = [];
var defense = [];
var speed = [];
var dexterity = [];
var total = [];

var canvasWidth;


TornStatsPromise = TornExtStorage.get('LinkTornStats');
TornStatsPromise.then((e) => {
    if(e.LinkTornStats){
        APIKeyPromise = TornExtStorage.get('APIkey');
        APIKeyPromise.then((e) => {
            if(e.APIkey){
                API_KEY = e.APIkey;
                showGym();
            }
        })
    }
})

function showGym(){

    if(gym){

        //totalStats from gym 
        //const totalStats = ['strengthTotal', 'defenceTotal', 'speedTotal', 'dexterityTotal'].reduce((a, b) => a + parseInt(document.getElementById(b).textContent.replace(/[ ,]/g, '')), 0);


        var dataSource = `https://www.tornstats.com/api.php?action=getStatGraph&key=${API_KEY}&t=${Date.now()}`; //&t=totalStats


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

            if(typeof browser === 'undefined' || browser === null){isChrome = true};

            //console.log(e)

            for(var peace of e.data){
                labels.push(isChrome ? new Date(peace.timestamp * 1000) : new Date(peace.timestamp * 1000).toLocaleDateString());
                strength.push(peace.strength);
                defense.push(peace.defense);
                speed.push(peace.speed);
                dexterity.push(peace.dexterity);
                total.push(peace.strength + peace.defense + peace.speed + peace.dexterity);
            }

            drawChart();
        });

        function drawChart(){

            canvas.width = canvas.offsetWidth;

            var lblStrength = canvas.offsetWidth > 600 ? "Strength" : "Str";
            var lblDefense = canvas.offsetWidth > 600 ? "Defense" : "Def";
            var lblSpeed = canvas.offsetWidth > 600 ? "Speed" : "Spe";
            var lblDexterity = canvas.offsetWidth > 600 ? "Dexterity" : "Dex";
            var lblTotal = canvas.offsetWidth > 600 ? "Total" : "Total";

            var chartConfig = {
                type:"line",
                data:{
                    labels: labels,//["January","February","March","April","May","June","July"],
                    datasets:[
                        {
                            label: lblStrength,
                            data:strength,//[65,59,80,81,56,55,40],
                            fill:false,
                            borderColor: "#3366cc",
                            backgroundColor: "#3366cc",
                        },
                        {
                            label:lblDefense,
                            data:defense,//[65,59,80,81,56,55,40],
                            fill:false,
                            borderColor: "#dc3912",
                            backgroundColor: "#dc3912",
                        },
                        {
                            label:lblSpeed,
                            data:speed,//[65,59,80,81,56,55,40],
                            fill:false,
                            borderColor: "#ff9900",
                            backgroundColor: "#ff9900",
                        },
                        {
                            label:lblDexterity,
                            data:dexterity,//[65,59,80,81,56,55,40],
                            fill:false,
                            borderColor: "#109618",
                            backgroundColor: "#109618"
                        }, 
                        {
                            label: lblTotal,
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
                        //position: 'right',
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

            chartConfig.options.legend.position = canvas.offsetWidth > 600 ? 'right': 'bottom';

            var myLineChart = new Chart(canvas, chartConfig);
        }


        gym.appendChild(myDiv);

        var widgetGraph = TornExtGlobal.Widget(
            {
                title:'Torn Stats Graph',
                title_small:'Torn Stats Graph',
                colapsable: true
            }
        )

        canvas = document.createElement('canvas');
        canvas.id = 'chart';
        canvas.style.width = '100%';

        widgetGraph.body.appendChild(canvas);

        canvasWidth = canvas.offsetWidth;
        
        window.addEventListener('resize',function(x) {
            if(canvasWidth != canvas.offsetWidth){
                console.log('redraw chart');
                drawChart();
                canvasWidth = canvas.offsetWidth;
            }
        })

        var spacer = document.createElement('hr');
        spacer.classList.add('page-head-delimiter');
        spacer.classList.add('my-margin-top10');
        spacer.classList.add('my-margin-bottom10');

        myDiv.appendChild(spacer);
        myDiv.appendChild(widgetGraph.container);

        var p = document.createElement('p');
        p.id = 'updateResult';
        p.classList.add('my-padding-top10');
        p.classList.add('my-padding-right10');
        //p.classList.add('my-padding-bottom10');
        p.classList.add('my-padding-left10');
        p.classList.add('my-hide');

        var btn = document.createElement('button');
        btn.id = 'sendToTornStats';
        btn.innerHTML = 'SUBMIT CHANGES TO TORN STATS';
        btn.classList.add('my-btn');
        btn.classList.add('my-width100');
        btn.addEventListener('click', function(e){
            if(e.target == this){
                var p = document.getElementById('updateResult');

                e.target.innerHTML = 'UPDATING TORN STATS...'

                var dataSource = `https://www.tornstats.com/api.php?action=recordStats&key=${API_KEY}`; //&t=totalStats

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
                    
                    console.log(e)

                    if(e.status){
                        
                        const st = e.deltaStrength, de = e.deltaDefense, sp = e.deltaSpeed, dx = e.deltaDexterity;
                        const stats = [(st ? strong(formatNumber(st,0,3)) + ' strength' : ''), (de ? strong(formatNumber(de,0,3)) + ' defense' : ''), (sp ? strong(formatNumber(sp,0,3)) + ' speed' : ''), (dx ? strong(formatNumber(dx,0,3)) + ' dexterity' : '')].filter(x => {return x.length}).join(' and ');
                        const total = st + de + sp + dx;

                        var msg = total ? `You have gained ${stats} (${formatNumber(total,0,3)} total) since your last update ${e.age}` : `No stats gain since your last since your last update ${e.age}`;

                        console.log(msg);

                        p.innerHTML = msg;
                    }
                    else{
                        p.innerHTML = e.message;
                    }

                    btn.innerHTML = 'SUBMIT CHANGES TO TORN STATS';
                    p.classList.remove('my-hide');
                });
            }
        });


        widgetGraph.footer.appendChild(btn);
        widgetGraph.footer.appendChild(p);
        widgetGraph.footer.classList.add('my-footer-separated');
        
        widgetGraph.footer.classList.add('my-padding-top10');
        widgetGraph.footer.classList.add('my-padding-right10');
        widgetGraph.footer.classList.add('my-padding-bottom10');
        widgetGraph.footer.classList.add('my-padding-left10');
    }
}

function strong(string){
    return `<strong>${string}</strong>`
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