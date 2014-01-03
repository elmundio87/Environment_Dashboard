setPreviewPicture = function(ipAddress){

    if(ipAddress == "???"){
        $("#preview").attr("src","/assets/offline.png")
    }
    else
    {
        $("#preview").css("background-image","url(/vm/screenshot?ipAddress=" + ipAddress + "&req=" + (new Date).valueOf() + ")")
    }

};

$("#search-vms").keyup(function() {
    var rows = $("#table_container table").find("tr").hide();
    var data = this.value.split(" ");
    $.each(data, function(i, v) {
        rows.filter(":contains('" + v + "')").show();
    });
});

$( document ).ready(function() {


    roster = {};

    roster.clear = function(){
        localStorage.removeItem("roster");
    };

    roster.getRosterFromCache = function(){
        return JSON.parse(localStorage.getItem("roster"))
    };

    roster.timeRemaining = function(){
        return  roster.getRosterFromCache().timestamp - new Date().getTime() ;
    };

    roster.isExpired = function(){
        var configuration = roster.getRosterFromCache();

        if(!configuration){
            return true;
        }

        return roster.timeRemaining() < 0;

    };

    roster.getRoster = function(a){
        var configuration = roster.getRosterFromCache();
        var async = (arguments[0]) ? arguments[0] : true ;

        if (typeof a === 'undefined') {
            optionalArg = true;
        }

        if(!a){
            $.blockUI({ css: {
                border: 'none',
                padding: '15px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff'
            } });
        }

        if(roster.isExpired()){
            $.ajax({
                url: "vm/roster",
                dataType: "json"
            }).done(function(json) {
                    var expirationMin = 5;
                    var expirationMS = expirationMin * 60 * 1000;
                    configuration = {value: JSON.stringify(json), timestamp: new Date().getTime() + expirationMS}
                    localStorage.setItem("roster", JSON.stringify(configuration));
                    populateTable(roster.getRosterFromCache());
                    $.unblockUI();
                });
        }

        return configuration
    };


    populateTable = function (roster) {
        $("#nodes_table").find('tbody').html("Loading node data from Chef server...");


        var results = JSON.parse(roster.value);

        $("#nodes_table").find('tbody').html("");

        $(results).each(function(index){


            row = $('<tr>')

            row.append($('<td>').append("<div class='preview_small'></div>"));
            row.append($('<td>').append(results[index].name));
            row.append($('<td>').append(results[index].os));
            row.append($('<td>').append(results[index].owner));
            row.append($('<td>').append(results[index].ipAddress));
            row.append($('<td>').append(results[index].hostType));
            row.append($('<td>').append(results[index].description));


            $("#nodes_table").find('tbody').append(row);

        });

        setPreviewPicture(results[0].ipAddress);

        $("#nodes_table_body tr").click(function() {



            $("#preview").attr("src","")

            var tableRow = this.rowIndex - 1 ;

            $("#nodes_table_body tr").removeClass("active");
            $(this).addClass("active");

            console.log("Fetching stats...")
            $("#stats_group_cpu_speed,#stats_group_cpu_cores,#stats_group_memory").html("Loading...")


            setPreviewPicture(results[tableRow].ipAddress);

            $("#stats_group_cpu_speed").html(function(){
                    var speed = results[tableRow].cpuSpeed / 1000
                    if(!isNaN(speed)){
                        return Math.round(speed * 10)/10+ "GHz"
                    }
                    return "???Ghz"

                }
            );

            $("#stats_group_cpu_cores").html(
                results[tableRow].cpuCores
            );

            $("#stats_group_memory").html(function(){
                    var ram = results[tableRow].ram / (1024 * 1024);
                    if(!isNaN(ram)){
                        return Math.round(ram * 10)/10 + "GB"
                    }
                    return "???GB"
                }

            );





        });






    };

    roster.clear();
    roster.getRoster(false);


});

