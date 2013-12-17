class DashboardController < ApplicationController

require 'ridley'

def index

    ridley = Ridley.new(
      server_url: "https://api.opscode.com/organizations/elmundio87",
      client_name: "elmundio87-validator",
      client_key: "/Users/edmundd/.chef/elmundio87-validator.pem"
    )

    @Vms = Array.new


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
        @Vms << vm

    end



end


end
