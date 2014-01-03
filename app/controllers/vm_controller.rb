class VmController < ApplicationController

require 'ridley'
require 'RidleySingleton'

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

    require 'timeout'

       begin
           Timeout::timeout(5){
                screenshot  = get_screenshot(params[:ipAddress])
                send_data screenshot, :type => 'image/png'
           }
         rescue
            redirect_to "/assets/offline.png"
         end
    end

 def get_screenshot(ip)
  
        require 'open-uri'

        open("http://#{ip}:8151/screenshot.png", :read_timeout => 5) do |file|
            return file.read
        end

   end 


end