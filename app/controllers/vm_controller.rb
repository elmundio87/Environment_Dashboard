class VmController < ApplicationController
  def stats

      ridley = Ridley.new(
        server_url: "https://api.opscode.com/organizations/elmundio87",
        client_name: "elmundio87-validator",
        client_key: "/Users/edmundd/.chef/elmundio87-validator.pem"
      )



        node_reloaded = ridley.node.all[0].reload.chef_attributes

        vm = Hash.new
        vm["name"] = node_reloaded.hostname
        vm["cpu_speed"] = node_reloaded.cpu[0].mhz
        vm["cpu_cores"] = node_reloaded.cpu[0].cores
        vm["ram"] = node_reloaded.kernel.os_info.total_visible_memory_size


    render :xml => vm
  end
end
