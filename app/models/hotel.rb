class Hotel < ActiveRecord::Base
  def self.default_scope
    includes(:room_components)
  end
  belongs_to :venue
  has_many :room_components
  has_many :photos, as: :imageable
end
