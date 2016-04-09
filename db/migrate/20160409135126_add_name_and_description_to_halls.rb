class AddNameAndDescriptionToHalls < ActiveRecord::Migration
  def change
    add_column :halls, :name, :string
    add_column :halls, :description, :text
  end
end
