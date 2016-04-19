class Venue < ActiveRecord::Base
  belongs_to :manager
  has_many :hotels
  has_many :halls
  has_many :photos, as: :imageable
  has_many :reviews
end
