# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure("1") do |config|
  config.vm.boot_mode = :gui
end

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.guest = :windows

    # All Vagrant configuration is done here. The most common configuration
  # options are documented and commented below. For a complete reference,
  # please see the online documentation at vagrantup.com.

  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = "win2008"

     config.vm.box_url = "http://10.0.10.37/Vagrant/Windows/win2008Enterprise.box"

  # Max time to wait for the guest to shutdown
  config.vm.boot_timeout = 600
  config.windows.boot_timeout = 600
  config.windows.halt_timeout = 600

  #config.vm.provision "shell", inline: "powershell C:\\vagrant\\provision.ps1;if(!$?){throw 'script failed'}"

  # Admin user name and password
  config.winrm.username = "vagrant"
  config.winrm.password = "vagrant"

  config.vm.network :forwarded_port, guest: 80, host: 7777 #IIS
  config.vm.network :forwarded_port, guest: 8172, host: 8172 #MSDeploy agent service
  config.vm.network :forwarded_port, guest: 5985, host: 5985 #REQUIRED: Vagrant WinRM communication

end

