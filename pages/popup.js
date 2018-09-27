window.onload = windowOnLoad;

var APIkey = null;
var UserData = {};
var timer = null;


function windowOnLoad(){
    checkForAPIkey();
}

function checkForAPIkey(){
    APIkeyPromise = TornExtStorage.get('APIkey');

    APIkeyPromise.then((e) => {
        APIkey = e.APIkey;
        if(APIkey){
            displayUserForm();
        }
        else{
            displeyAPIForm();
        }
    })
}

function displeyAPIForm(){
    var div = document.getElementById('container');

    //var label = document.createElement('label');
    var input = document.createElement('input');
    var button = document.createElement('input');

    //label.htmlFor = 'apikey';
    //label.innerHTML = 'API Key ';
    
    input.id = 'apikey';
    input.type = 'text';
    input.placeholder = 'API key';

    button.value = 'Save';
    button.type = 'button';
    button.onclick = saveAPIkey;

    div.innerHTML = '';
    //div.appendChild(label);
    div.appendChild(input);
    div.appendChild(button);
    input.focus();

    var button3 = document.createElement('input');
    button3.value = 'Options';
    button3.type = 'button';
    button3.onclick = opneOptionForm;
    
    div.appendChild(button3);
}

function displayUserForm(){
    var container = document.getElementById('container');

    container.innerHTML = "";

    var divUser = document.createElement('div');
    divUser.id = "userData";

    var loader1 = document.createElement('div');
    loader1.classList.add('loader');

    divUser.appendChild(loader1);
    container.appendChild(divUser);

    var button1 = document.createElement('input');
    button1.value = 'Update';
    button1.type = 'button';
    button1.onclick = updateUserData;

    container.appendChild(button1);

    var button2 = document.createElement('input');
    button2.value = 'Remove API key';
    button2.type = 'button';
    button2.onclick = removeAPIkey;
    
    container.appendChild(button2);

    var button3 = document.createElement('input');
    button3.value = 'Options';
    button3.type = 'button';
    button3.onclick = opneOptionForm;
    
    container.appendChild(button3);

    updateUserData();
}

function opneOptionForm(){
    window.open('options.html');
}

function displayUserData(){
    
    //div.innerHTML = JSON.stringify(UserData); 

    if(UserData){
        if(UserData.error){
            displayError(UserData.error, 'userData');
        }
        else{
            var div = document.getElementById('userData');

            div.innerHTML = '';
            
            var h3 = document.createElement('h3');
            h3.innerHTML = UserData.name + " [" + UserData.player_id + "]";
            div.appendChild(h3);
            div.appendChild(createField('status', 'Status', UserData.status[0]), "https://www.torn.com/profiles.php?XID=" + UserData.player_id);

            var divNotifications = document.createElement('div');
            divNotifications.style.margin = '20px auto';
            divNotifications.style.textAlign = 'center';
            divNotifications.appendChild(createField('messages', 'Messages', UserData.notifications.messages, "https://www.torn.com/messages.php"));
            divNotifications.appendChild(createField('events', 'Events', UserData.notifications.events, "https://www.torn.com/events.php"));
            divNotifications.appendChild(createField('awards' ,'Awards', UserData.notifications.awards, "https://www.torn.com/awards.php"));
            //divNotifications.appendChild(createField('competition','Competition',UserData.notifications.competition));
            div.appendChild(divNotifications);

            var divCooldowns = document.createElement('div');
            divCooldowns.style.margin = '20px auto';
            divCooldowns.style.textAlign = 'center';
            divCooldowns.appendChild(createField('drug', 'Drug', secondsToTimeString(UserData.cooldowns.drug)));
            divCooldowns.appendChild(createField('medical', 'Medical', secondsToTimeString(UserData.cooldowns.medical)));
            divCooldowns.appendChild(createField('booster', 'Booster', secondsToTimeString(UserData.cooldowns.booster)));
            div.appendChild(divCooldowns);

            div.appendChild(createBar("energy", UserData.energy.current, UserData.energy.maximum, "lime", "Energy " + UserData.energy.current + "/" + UserData.energy.maximum, secondsToTimeString(UserData.energy.ticktime) + ` (${secondsToTimeString(UserData.energy.fulltime)})`, "https://www.torn.com/gym.php"));
            div.appendChild(createBar("nerve", UserData.nerve.current, UserData.nerve.maximum, "red", "Nerve " + UserData.nerve.current + "/" + UserData.nerve.maximum, secondsToTimeString(UserData.nerve.ticktime) + ` (${secondsToTimeString(UserData.nerve.fulltime)})`, "https://www.torn.com/crimes.php"));
            div.appendChild(createBar("happy", UserData.happy.current, UserData.happy.maximum, "yellow", "Happy " + UserData.happy.current + "/" + UserData.happy.maximum, secondsToTimeString(UserData.happy.ticktime) + ` (${secondsToTimeString(UserData.happy.fulltime)})`, "https://www.torn.com/properties.php"));
            div.appendChild(createBar("life", UserData.life.current, UserData.life.maximum, "blue", "Life " + UserData.life.current + "/" + UserData.life.maximum, secondsToTimeString(UserData.life.ticktime) + ` (${secondsToTimeString(UserData.life.fulltime)})`, "https://www.torn.com/hospitalview.php"));

            if(UserData.travel.time_left > 0){
                div.appendChild(createBar("travel", (UserData.travel.timestamp - UserData.travel.departed) - UserData.travel.time_left,  UserData.travel.timestamp - UserData.travel.departed, "purple", "Traveling to " + UserData.travel.destination, secondsToTimeString(UserData.travel.time_left)));
            }

            var divMoney = document.createElement('div');
            divMoney.style.margin = '20px auto';
            divMoney.style.textAlign = 'center';
            divMoney.appendChild(createField('money', 'Money', formatNumber(UserData.money_onhand,0,3), "https://www.torn.com/index.php"));
            divMoney.appendChild(createField('points', 'Points', formatNumber(UserData.points,0,3), "https://www.torn.com/index.php"));
            divMoney.appendChild(createField('vault' ,'Vault', formatNumber(UserData.vault_amount,0,3), "https://www.torn.com/properties.php"));
            div.appendChild(divMoney);

            if(UserData.faction.faction_name != ""){
                var divFaction = document.createElement('div');
                var divChain = document.createElement('div');
                divFaction.style.margin = '20px auto';
                divChain.style.margin = '20px auto';
                divFaction.appendChild(createField('faction', 'Faction', UserData.faction.faction_name, "https://www.torn.com/factions.php"));
                if(UserData.chain.current > 0){
                    divChain.appendChild(createField('chainCurrent', 'Chain', UserData.chain.current));
                    if(UserData.chain.timeout != 0){
                        divChain.appendChild(createField('chainTimeout', 'Chain timeout', secondsToTimeString(UserData.chain.timeout)));
                    }
                    if(UserData.chain.cooldown != 0){
                        divChain.appendChild(createField('chainCooldown', 'Chain cooldown', secondsToTimeString(UserData.chain.cooldown)));
                    }
                }
                div.appendChild(divFaction);
                div.appendChild(divChain);
            }

            timer = setInterval(updateTime,1000);
        }
    }
    else{
        updateUserData();
    }
}

function updateTime(){
    /*
    var enetryTimer = false;
    var nerveTimer = false;
    var happyTimer = false;
    var lifeTimer = false;
    var travelTimer = false;
    var OCTimer = false;
    var chainTimeoutTimer = false;
    var chainCooldownTimer = false;
    */
    
    //if(UserData.energy.ticktime > 0){
        UserData.energy.ticktime--;
        UserData.energy.fulltime--;
        UserData.energy.ticktime = UserData.energy.ticktime < 0 ? 0 : UserData.energy.ticktime;
        UserData.energy.fulltime = UserData.energy.fulltime < 0 ? 0 : UserData.energy.fulltime;
        document.getElementById('energyTime').innerHTML = secondsToTimeString(UserData.energy.ticktime) + ` (${secondsToTimeString(UserData.energy.fulltime)})`;
        //enetryTimer = true;
    //}
    //if(UserData.nerve.ticktime > 0){
        UserData.nerve.ticktime--;
        UserData.nerve.fulltime--;
        UserData.nerve.ticktime = UserData.nerve.ticktime < 0 ? 0 : UserData.nerve.ticktime;
        UserData.nerve.fulltime = UserData.nerve.fulltime < 0 ? 0 : UserData.nerve.fulltime;
        document.getElementById('nerveTime').innerHTML = secondsToTimeString(UserData.nerve.ticktime) + ` (${secondsToTimeString(UserData.nerve.fulltime)})`;
        //nerveTimer = true;
    //}
    //if(UserData.happy.ticktime > 0){
        UserData.happy.ticktime--;
        UserData.happy.fulltime--;
        UserData.happy.ticktime = UserData.happy.ticktime < 0 ? 0 : UserData.happy.ticktime;
        UserData.happy.fulltime = UserData.happy.fulltime < 0 ? 0 : UserData.happy.fulltime;
        document.getElementById('happyTime').innerHTML = secondsToTimeString(UserData.happy.ticktime) + ` (${secondsToTimeString(UserData.happy.fulltime)})`;
        //happyTimer = true;
    //}
    //if(UserData.life.ticktime > 0){
        UserData.life.ticktime--;
        UserData.life.fulltime--;
        UserData.life.ticktime = UserData.life.ticktime < 0 ? 0 : UserData.life.ticktime;
        UserData.life.fulltime = UserData.life.fulltime < 0 ? 0 : UserData.life.fulltime;
        document.getElementById('lifeTime').innerHTML = secondsToTimeString(UserData.life.ticktime) + ` (${secondsToTimeString(UserData.life.fulltime)})`;
        //lifeTimer = true;
    //}
    if(UserData.travel.time_left > 0){
        UserData.travel.time_left--;
        document.getElementById('travelTime').innerHTML = secondsToTimeString(UserData.travel.time_left);
        //travelTimer = true;
    }
    if(UserData.cooldowns.medical > 0){
        UserData.cooldowns.medical--;
        document.getElementById('medicalValue').innerHTML = secondsToTimeString(UserData.cooldowns.medical);
        //enetryTimer = true;
    }
    if(UserData.cooldowns.booster > 0){
        UserData.cooldowns.booster--;
        document.getElementById('boosterValue').innerHTML = secondsToTimeString(UserData.cooldowns.booster);
        //enetryTimer = true;
    }
    if(UserData.cooldowns.drug > 0){
        UserData.cooldowns.drug--;
        document.getElementById('drugValue').innerHTML = secondsToTimeString(UserData.cooldowns.drug);
        //enetryTimer = true;
    }
    if(UserData.chain.timeout > 0){
        UserData.chain.timeout--;
        document.getElementById('chainTimeoutValue').innerHTML = secondsToTimeString(UserData.chain.timeout);
        //chainTimeoutTimer = true;
    }
    if(UserData.chain.cooldown > 0){
        UserData.chain.cooldown--;
        document.getElementById('travelTime').innerHTML = secondsToTimeString(UserData.chain.cooldown);
        //chainCooldownTimer = true;
    }
    /*
    if(
        (UserData.energy.ticktime == 0 && enetryTimer) || 
        (UserData.nerve.ticktime == 0 && nerveTimer) ||
        (UserData.happy.ticktime == 0 && happyTimer) ||
        (UserData.life.ticktime == 0 && lifeTimer) ||
        (UserData.travel.time_left == 0 && travelTimer) ||
        (UserData.chain.timeout == 0 && chainTimeoutTimer) ||
        (UserData.chain.cooldown == 0 && chainCooldownTimer) 
    ){
        clearInterval(timer);
        updateUserData();
    }
    */
}

function updateUserData(){
    clearInterval(timer);
    ajax('GET', 'https://api.torn.com/user/?selections=profile,notifications,bars,cooldowns,travel,money&key=' + APIkey, '', pareseUserData);
}

function pareseUserData(status, responseText){
    var obj = JSON.parse(responseText);
    if(obj.error){
        UserData.error = obj.error.error;
    }
    else{
        UserData.error = null;
        UserData = obj;
    }

    displayUserData();
}

function createField(id, label, value, link){
    var span = document.createElement('span');
    span.id = id;
    span.innerHTML = label + " : ";
    span.classList.add('hoverShadow');

    var strong = document.createElement('strong');
    strong.id = id + 'Value';
    //strong.style.fontWeight = "bold";
    strong.innerHTML = value;

    span.appendChild(strong);

    if(link){
        span.onclick = function(){window.open(link, '_blank')};
    }

    return span;
}

function createBar(id, current, maximum, color, text, time, link){

    var percent = (current / maximum) * 100;
    if(percent > 100){
        percent = 100;
    }

    var divContainer = document.createElement('div');
    divContainer.id = id;
    divContainer.classList.add('hoverShadow');

    var spanText = document.createElement('span');
    spanText.id = id + "Text";
    spanText.style.cssFloat = "left";
    spanText.innerHTML = text;

    var spanTime = document.createElement('span');
    spanTime.id = id + "Time";
    spanTime.style.cssFloat = "right";
    spanTime.innerHTML = time;

    var divBarContainer = document.createElement('div');
    divBarContainer.id = id + "BarContainer";
    divBarContainer.style.border = "thin solid black";
    divBarContainer.style.clear = "both";

    var divBar = document.createElement('div');
    divBar.id = id + "Bar";
    divBar.style.backgroundColor = color;
    divBar.style.width = percent + "%";
    divBar.style.height = '10px';

    divBarContainer.appendChild(divBar);

    divContainer.appendChild(spanText);
    divContainer.appendChild(spanTime);
    divContainer.appendChild(divBarContainer);

    if(link){
        divContainer.onclick = function(){window.open(link, '_blank')};
    }

    return divContainer;
}

/*
function saveUserAndAPIkey(status, responseText){
    var obj = JSON.parse(responseText);
    var msgText = null;

    if(obj.error){
        displayError("Error: " + obj.error.error, 'container');
    }
    else{
        localStorage.setItem('APIkey', APIkey);
        displayUserForm();
    }
}

function saveAPIkey(){
    var newAPIkey = document.getElementById('apikey').value;
    if(newAPIkey){
        APIkey = newAPIkey;
        ajax('GET', 'https://api.torn.com/user/?selections=basic&key=' + APIkey, '', saveUserAndAPIkey);
    }
    else{
        displayError("Error: No API key supplied!", 'container');
    }
}
*/

function saveAPIkey(){
    var newAPIkey = document.getElementById('apikey').value;
    if(newAPIkey){
        APIkey = newAPIkey;
        saveapi = TornExtStorage.set({'APIkey': APIkey});
        saveapi.then((e) => {displayUserForm()});
    }
    else{
        displayError("Error: No API key supplied!", 'container');
    }
}

function removeAPIkey(){
    removeapi = TornExtStorage.remove("APIkey");

    removeapi.then((e) => {checkForAPIkey()});
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

function displayError(msgText, element){
    var p = document.getElementById('displayError');

    if(p){
        p.innerHTML = msgText;
    }
    else{
        var div = document.getElementById(element);
        
        p = document.createElement('p');
        p.id = 'displayError';
        p.classList.add('red');
        p.innerHTML = msgText;

        div.appendChild(p);
    }
}

function ajax(method, url, data, callback, caller){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            callback(this.status, this.responseText, caller);
        }
    };
    xhttp.open(method, url, true);
    /*xhttp.setRequestHeader("Content-type", "application/json");*/
    xhttp.send(JSON.stringify(data));
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