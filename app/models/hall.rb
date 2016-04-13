class Hall < ActiveRecord::Base
  belongs_to :venue
  has_many :photos, as: :imageable
end
