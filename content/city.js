(function(){
    
//console.log('city');

var isColapsed = false; //from storage

CityPromise = TornExtStorage.get('CityFinds');
CityPromise.then((e) => {
    if(e.CityFinds){
        isColapsed = e.CityFinds.Colapsed;
    }
    findItemsOnMap();
})

function findItemsOnMap(){

    var map = document.getElementById('map');

    if(map){

        function createElement(tag){
            return document.createElement(tag);
        }

        function insertAfter(element, after){
            after.parentNode.insertBefore(element, after.nextSibling);
        }

        function toggleHinglite(isColapsed){
            //widget.toggleContainer.classList.contains('my-hide') ? map.classList.remove('highlight-city-finds') : map.classList.add('highlight-city-finds');
            isColapsed ? map.classList.remove('highlight-city-finds') : map.classList.add('highlight-city-finds');
            savecityfinds = TornExtStorage.set({'CityFinds': {'Colapsed' : isColapsed}});
        }

        function checkFoundItems(){
            imageList = map.querySelectorAll('.leaflet-marker-pane img[src*="torn.com/images/items/"]');
            if(imageList && imageList.length > 0){
                var Msg = 'Nice! There ' +  (imageList.length == 1 ? 'is ' : 'are ') + imageList.length.toString() + ' item' + (imageList.length == 1 ? ' ' : 's ') + 'around city:';
                var firstItem = true;
                for(image of imageList){
                    image.src = image.src.replace('small.png', 'large.png');
                    imageSrcArr = image.src.split('/');
                    if(firstItem){
                        Msg += ': ';
                        firstItem = false;
                    }
                    else{
                        Msg += ', ';
                    }
                    Msg += '<a href=/imarket.php#/p=shop&type=' + imageSrcArr[imageSrcArr.length-2] + '>' + TornExtGlobal.items.get_by_id(parseInt(imageSrcArr[imageSrcArr.length-2])).name + '</a>';
                }
            }
            else {
                var Msg = 'Sorry, There are no items in city';
            }
            var p = createElement('p');
            p.innerHTML = Msg;


            widget.body.classList.add('my-padding-top10');
            widget.body.classList.add('my-padding-right10');
            widget.body.classList.add('my-padding-bottom10');
            widget.body.classList.add('my-padding-left10');
            widget.body.innerHTML = '';
            widget.body.appendChild(p);

            if(myDiv.innerHTML == ''){
                myDiv.appendChild(widget.container);
            } 
        }

        var container = document.querySelector('.content-title');

        var myDiv = document.createElement('div');
        myDiv.id = 'JoxDiv';

        insertAfter(myDiv, container);

        if(!isColapsed){map.classList.add('highlight-city-finds');}

        var widget = TornExtGlobal.Widget(
            {
                title:'City Finds',
                title_small:'City Finds',
                colapsable: true,
                colapsed: isColapsed,
                toggleCallback : toggleHinglite
            }
        )

        //myDiv.appendChild(widget.container);

        // Options for the observer (which mutations to observe)
        var config = { 
            attributes: false,
            characterData: false,
            childList: true,
            subtree: true,
            attributeOldValue: false,
            characterDataOldValue: false };

        // Callback function to execute when mutations are observed
        var callback = function(mutationsList) {
            for(var mutation of mutationsList) {
                if (mutation.type == 'childList') {
                    if(mutation.addedNodes.length > 0){
                        for(const node of mutation.addedNodes){
                            if(node.tagName == 'IMG'){
                                if(node.src.indexOf('images/items/') > 0){
                                    checkFoundItems();
                                    break;
                                }
                            }
                        }
                    }

                    if(mutation.removedNodes.length > 0){
                        for(const node of mutation.addedNodes){
                            if(node.tagName == 'IMG'){
                                if(node.src.indexOf('images/items/') > 0){
                                    checkFoundItems();
                                    break;
                                }
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

        targetNode = map;

        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);

        // Later, you can stop observing
        //observer.disconnect();

    }
}

})();