class VmController < ApplicationController
  def stats

        ridley = RidleySingleton.instance.getConnection();

        node_reloaded = ridley.node.all[0].reload.chef_attributes

        vm = Hash.new
        vm["name"] = node_reloaded.hostname
        vm["cpu_speed"] = node_reloaded.cpu[0].mhz
        vm["cpu_cores"] = node_reloaded.cpu[0].cores
        vm["ram"] = node_reloaded.kernel.os_info.total_visible_memory_size


    render :xml => vm
  end

  def roster

     ridley = RidleySingleton.instance.getConnection();

        vms = Array.new

        (ridley.node.all).each do |node|

            hostname = node.chef_attributes.hostname

            node_reloaded = node.reload

            vm = Hash.new
            vm["name"] = node_reloaded.chef_attributes.hostname
            vm["os"] = node_reloaded.chef_attributes.kernel.name
            vm["owner"] =  node_reloaded.chef_attributes.owner
            vm["ip_address"] = node_reloaded.chef_attributes.ipaddress
            vm["host_type"] = "???"
            vm["description"] = "???"
            vms << vm

        end


      render :xml => vms
    end
end
