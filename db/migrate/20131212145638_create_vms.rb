class CreateVms < ActiveRecord::Migration
	def change
		create_table :vms do |t|
			t.timestamps
			t.string "name"
			t.string "os"
			t.string "owner"
			t.string "ip_address"
			t.string "host_type"
			t.string "description"
		end
	end
end

