class CreateVms < ActiveRecord::Migration
  def change
    create_table :vms do |t|

      t.timestamps
    end
  end
end
