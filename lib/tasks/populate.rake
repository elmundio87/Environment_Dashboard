
namespace :db do

  desc "Fill database with sample data"
  task :populate => :environment do


    puts "----------------"
    puts "--- populate ---"
    puts "----------------"

    make_vms
  end

end

def make_vms

  puts "----------------"
  puts "--- VMs   ---"
  puts "----------------"

  Vm.create!(:name => "VM1", :os => "Windows 2008", :owner => "nobody",
   :ip_address => "0.0.0.0", :host_type => "Carrenza", :description => "none")
  Vm.create!(:name => "VM2", :os => "Ubuntu Linux", :owner => "Edmund Dipple",
   :ip_address => "0.0.0.0", :host_type => "Carrenza", :description => "none")
  Vm.create!(:name => "VM3", :os => "Windows 2005", :owner => "Infrastructure",
   :ip_address => "0.0.0.0", :host_type => "Carrenza", :description => "none")
  Vm.create!(:name => "VM4", :os => "Windows 2008", :owner => "Infrastructure",
   :ip_address => "0.0.0.0", :host_type => "Carrenza", :description => "none")
  Vm.create!(:name => "VM5", :os => "Windows 2008", :owner => "R9",
   :ip_address => "0.0.0.0", :host_type => "Carrenza", :description => "none")

end
