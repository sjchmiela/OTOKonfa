class CreateRoomComponents < ActiveRecord::Migration
  def change
    create_table :room_components do |t|
      t.references :hotel, index: true, foreign_key: true
      t.integer :capacity
      t.integer :quantity

      t.timestamps null: false
    end
  end
end
