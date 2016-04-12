class Review < ActiveRecord::Base
  belongs_to :user
  belongs_to :venue

  validates_inclusion_of :stars, in: 1..5
end
