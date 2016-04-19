class AddAcceptedToVenues < ActiveRecord::Migration
  def change
    add_column :venues, :accepted, :boolean, default:true
  end
end
