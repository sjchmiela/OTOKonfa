class Venue < ActiveRecord::Base
  belongs_to :manager  
  validates_presence_of :email
  has_many :hotels
  has_many :halls
  has_many :photos, as: :imageable
  has_many :reviews
  has_and_belongs_to_many :features

  def average_rating
    return 0 if reviews.count == 0
    reviews.inject(0) { |a, e| a + e.stars } / reviews.count.to_f
  end

  def city
    address.split('\n').last.match('(.)+\s')
  end
end
