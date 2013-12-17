$("#search-vms").keyup(function() {
	var rows = $("#table_container table").find("tr").hide();
	var data = this.value.split(" ");
	$.each(data, function(i, v) {
		rows.filter(":contains('" + v + "')").show();
	});
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