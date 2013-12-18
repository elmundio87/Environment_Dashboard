class RidleySingleton

require 'ridley'

  def initialize
    @ridley = Ridley.new(
                    server_url: "https://api.opscode.com/organizations/elmundio87",
                    client_name: "elmundio87-validator",
                    client_key: "/Users/edmundd/.chef/elmundio87-validator.pem"
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