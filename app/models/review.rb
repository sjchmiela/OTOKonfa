class Review < ActiveRecord::Base
  belongs_to :user
  belongs_to :venue

  validates_inclusion_of :stars, in: 1..5

  after_initialize :init

  def init
    self.stars ||= 3
  end
end
