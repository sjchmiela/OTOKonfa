class AddAcceptedToVenues < ActiveRecord::Migration
  def change
    add_column :venues, :accepted, :boolean, default:false
  end
end
