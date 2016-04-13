class RoomComponent < ActiveRecord::Base
  belongs_to :hotel
  has_many :photos, as: :imageable
end
