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

            node_reloaded = node.reload.chef_attributes

            vm = Hash.new
            vm["name"] = node_reloaded["hostname"] || "???"

                begin
                     vm["os"] = node_reloaded["kernel"].name || "???"
                rescue Exception=>e
                     vm["os"] = "???"
                end

            vm["owner"] =  node_reloaded["owner"] || "???"
            vm["ipAddress"] = node_reloaded["ipaddress"] || "???"
            vm["hostType"] = "???"
            vm["description"] = "???"
 
             begin
                                vm["cpuSpeed"] = node_reloaded.cpu[0].mhz || "???"
                rescue Exception=>e
                                 vm["cpuSpeed"] = "???"
                end


                begin
                     vm["cpuCores"] = node_reloaded.cpu[0].cores || "???"
                rescue Exception=>e
                       vm["cpuCores"]  = "???"
                end

                begin
                    vm["ram"] = node_reloaded.kernel.os_info.total_visible_memory_size || "???"
                rescue Exception=>e
                     vm["ram"] = "???"
                end

            

            vms << vm

        end


      render :json => vms
    end

    def screenshot
        send_data get_screenshot("127.0.0.1"), :type => 'image/png'
    end

 def get_screenshot(ip)
  
        require "net/http"
        require "uri"

        uri = URI.parse("http://#{ip}:8151/screenshot.png")
        # Full
        http = Net::HTTP.new(uri.host, uri.port)
        return http.request(Net::HTTP::Get.new(uri.request_uri)).body

   end 


end
