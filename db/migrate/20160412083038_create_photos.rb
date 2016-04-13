class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.attachment :image
      t.string :title
      t.integer :imageable_id
      t.string :imageable_type

      t.timestamps null: false
    end
  end
end
