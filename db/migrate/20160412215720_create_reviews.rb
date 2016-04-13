class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.references :user, index: true, foreign_key: true
      t.references :venue, index: true, foreign_key: true
      t.integer :stars
      t.text :comment

      t.timestamps null: false
    end
  end
end
