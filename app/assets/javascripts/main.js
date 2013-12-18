$("#search-vms").keyup(function() {
	var rows = $("#table_container table").find("tr").hide();
	var data = this.value.split(" ");
	$.each(data, function(i, v) {
		rows.filter(":contains('" + v + "')").show();
	});
});

$( document ).ready(function() {

    populateTable = function () {
        $("#nodes_table").find('tbody').html("Loading node data from Chef server...");

        $.ajax({
            url: "vm/roster",
            dataType: "xml"
        }).done(function (xml) {

                console.log(xml);
                $("#nodes_table").find('tbody').html("");

                $(xml).find('object').each(function(){



                    row = $('<tr>')

                    row.append($('<td>').append("<div class='preview_small'></div>"));
                    row.append($('<td>').append($(this).find("name").text()));
                    row.append($('<td>').append($(this).find("os").text()));
                    row.append($('<td>').append($(this).find("owner").text()));
                    row.append($('<td>').append($(this).find("ip-address").text()));
                    row.append($('<td>').append($(this).find("host-type").text()));
                    row.append($('<td>').append($(this).find("description").text()));


                    $("#nodes_table").find('tbody').append(row);

                });


                $("#nodes_table_body tr").click(function() {
                    console.log("Fetching stats...")
                    $("#stats_group_cpu_speed,#stats_group_cpu_cores,#stats_group_memory").html("Loading...")
                    $.ajax({
                        url: "vm/stats",
                        dataType: "xml"
                    }).done(function(xml) {

                            $("#stats_group_cpu_speed").html(function(){
                                    var speed = $(xml).find("cpu-speed")[0].textContent / 1000
                                    return  Math.round(speed * 10)/10+ "GHz"
                                }
                            );

                            $("#stats_group_cpu_cores").html(
                                $(xml).find("cpu-cores")[0].textContent
                            );

                            $("#stats_group_memory").html(function(){
                                    var ram = $(xml).find("ram")[0].textContent / (1024 * 1024);
                                    return Math.round(ram * 10)/10 + "GB"
                                }

                            );


                        });
                });


            });
    };


    populateTable();

});

