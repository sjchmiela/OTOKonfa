class Venue < ActiveRecord::Base
  has_many :hotels
  has_many :halls
  has_many :photos, as: :imageable
end
