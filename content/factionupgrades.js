(function(){
    
    function onAjaxComplete(e,xhr,settings){
        //console.log('MyAjaxComplete',e,xhr,settings);

        var Contributors = [];
        var Total = 0;

        var factionRegex = /^.*factions\.php\?rfcv=(\d+).*$/;
        var sentData = (settings.data != undefined ? settings.data.split("&") : "");
        if (factionRegex.test(settings.url)) {
            if(sentData[0] == "step=upgradeConfirm"){
                var response = JSON.parse(xhr.responseText);
                //console.log(response);
    
                Contributors = [];
                Total = 0;
    
                for(var cols in response.contributors){
                    for(var rows in response.contributors[cols]){
                        Contributors.push(
                            {userid:response.contributors[cols][rows].userid,
                             playername:response.contributors[cols][rows].playername,
                             total:Number(response.contributors[cols][rows].total.replace(",","")),
                             exmember:response.contributors[cols][rows].exmember,
                             challenge:response.contributors[cols][rows].challenge,
                            }
                        );
                        Total += Number(response.contributors[cols][rows].total.replace(",",""));
                    }
                }
    
                //console.log(Contributors);
                var styles = {
                    marginLeft: '5px',
                    color: '#00acac',
                    cursor: 'pointer'
                };
                $(".contributors-links").after($('<span>',{'class' : 'contributors-export'}).css(styles).click(ExportContributors).append($('<span>',{'class': 'show-all', html: "Export CSV"})));
                if($(".challenge-progress")[0].innerText.length == 0 && Total > 0){
                    $(".challenge-progress")[0].innerText = ` (Completed: ${formatNumber(Total,0,3)})`;
                }
            }
    
        }

        function ExportContributors(){
            exportToCSVFile(Contributors);
        }
         
        function exportToCSVFile(arrayToExport) {
            let dataStr = "";
        
        
            for(var i=0; i<arrayToExport.length; i++){
        
                if(i == 0){
                    var j = 0;
                    for(var dataheader in arrayToExport[i]){
                        dataStr += (j==0 ? "" : ",") + dataheader;
                        j++;
                    }
                    dataStr += "\n";
                }
        
                var x = 0;
                for(var data in arrayToExport[i]){
                    dataStr += (x == 0 ? "" : ",") + (typeof arrayToExport[i][data] === 'string' ? "\"" : "") + arrayToExport[i][data] + (typeof arrayToExport[i][data] === 'string' ? "\"" : "");
                    x++;
                }
                dataStr += "\n";
        
            }
        
            let dataUri = 'data:text/csv;charset=utf-8,'+ encodeURIComponent(dataStr);
        
            let exportFileDefaultName = 'data.csv';
        
            let linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
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

    }

    $(document).ajaxComplete(
        function(e,xhr,settings){
            onAjaxComplete(e,xhr,settings);
        }
    );
})()




