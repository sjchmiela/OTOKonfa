class Venue < ActiveRecord::Base
  has_many :hotels
  has_many :halls
end
