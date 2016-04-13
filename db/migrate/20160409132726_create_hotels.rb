class CreateHotels < ActiveRecord::Migration
  def change
    create_table :hotels do |t|
      t.string :name
      t.references :venue, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
