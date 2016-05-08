class CreateFeaturesVenues < ActiveRecord::Migration
  def up
    create_table :features_venues, :id => false do |t|
        t.references :feature
        t.references :venue
    end
    add_index :features_venues, [:feature_id, :venue_id]
    add_index :features_venues, :feature_id
    add_index :features_venues, :venue_id
  end

  def down
    drop_table :features_venues
  end
end
