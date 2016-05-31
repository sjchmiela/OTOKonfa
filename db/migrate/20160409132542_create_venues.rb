class CreateVenues < ActiveRecord::Migration
  def change
    create_table :venues do |t|
      t.string :name
      t.text :description
      t.text :address
      t.string :geoposition
      t.string :phone

      t.timestamps null: false
    end
  end
end
