class AddManagerToVenue < ActiveRecord::Migration
  def change
    add_reference :venues, :manager, index: true, foreign_key: true
  end
end
