class CreateHalls < ActiveRecord::Migration
  def change
    create_table :halls do |t|
      t.references :venue, index: true, foreign_key: true
      t.integer :chairs
      t.integer :capacity

      t.timestamps null: false
    end
  end
end
