class Hotel < ActiveRecord::Base
  belongs_to :venue
  has_many :room_components
end
