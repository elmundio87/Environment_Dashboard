class RidleySingleton

require 'ridley'

  def initialize
    @ridley = Ridley.new(
                    server_url: Rails.application.config.chef_client_url,
                    client_name: Rails.application.config.chef_client_name,
                    client_key: Rails.application.config.chef_client_key
                  )
  end

  @@instance = RidleySingleton.new

  def self.instance
    return @@instance
  end

  def getConnection()
    return @ridley
  end

  private_class_method :new

end