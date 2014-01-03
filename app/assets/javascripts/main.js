setPreviewPicture = function(ipAddress){

    if(ipAddress == "???"){
        $("#preview").attr("src","/assets/offline.png")
    }
    else
    {
        $("#preview").attr("src","")

    var imageTimer = setTimeout(function () {
        //image could not be loaded:
        $("#preview").attr("src","/assets/offline.png")
    }, 5000); //5 seconds

    $("#preview").load(function (response, status, xhr) {
        if (status == 'error') {
            //image could not be loaded:
            alert('failed to load image');

        } else {
            //image was loaded:
            clearTimeout(imageTimer);
            $("#preview").attr("src","/vm/screenshot?ipAddress=" + ipAddress + "&req=" + (new Date).valueOf())
        }
    });



        a = function(){}

        setTimeout(a, 1000);

        
    }

}

$("#search-vms").keyup(function() {
	var rows = $("#table_container table").find("tr").hide();
	var data = this.value.split(" ");
	$.each(data, function(i, v) {
		rows.filter(":contains('" + v + "')").show();
	});
});

$( document ).ready(function() {

 /*   var imageTimer = setTimeout(function () {
        $("#preview").attr("src","/assets/offline.png")
    }, 5000); //5 seconds

    $("#preview").load(function (response, status, xhr) {
        if (status == 'error') {
            $("#preview").attr("src","/assets/offline.png")
        } else {
            clearTimeout(imageTimer);
        }
    });*/


    populateTable = function () {
        $("#nodes_table").find('tbody').html("Loading node data from Chef server...");

        $.ajax({
            url: "vm/roster",
            dataType: "json"
        }).done(function (roster) {



                console.log(roster);

                $("#nodes_table").find('tbody').html("");

                $(roster).each(function(index){



                    row = $('<tr>')

                    row.append($('<td>').append("<div class='preview_small'></div>"));
                    row.append($('<td>').append(roster[index].name));
                    row.append($('<td>').append(roster[index].os));
                    row.append($('<td>').append(roster[index].owner));
                    row.append($('<td>').append(roster[index].ipAddress));
                    row.append($('<td>').append(roster[index].hostType));
                    row.append($('<td>').append(roster[index].description));


                    $("#nodes_table").find('tbody').append(row);

                });
         
                setPreviewPicture(roster[0].ipAddress);

                $("#nodes_table_body tr").click(function() {

                     $("#preview").attr("src","")

                    var tableRow = this.rowIndex - 1 ;

                    console.log("Fetching stats...")
                    $("#stats_group_cpu_speed,#stats_group_cpu_cores,#stats_group_memory").html("Loading...")
                    $.ajax({
                        url: "vm/roster",
                        dataType: "json"
                    }).done(function(roster) {

                            setPreviewPicture(roster[tableRow].ipAddress);

                            $("#stats_group_cpu_speed").html(function(){
                                    var speed = roster[tableRow].cpuSpeed / 1000
                                    return Math.round(speed * 10)/10+ "GHz"
                                }
                            );

                            $("#stats_group_cpu_cores").html(
                                roster[tableRow].cpuCores
                            );

                            $("#stats_group_memory").html(function(){
                                    var ram = roster[tableRow].ram / (1024 * 1024);
                                    return Math.round(ram * 10)/10 + "GB"
                                }

                            );


                        });

                       
                });

             

            });

     
    };

    populateTable();
  

});

