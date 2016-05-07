class Venue < ActiveRecord::Base
  belongs_to :manager
  has_many :hotels
  has_many :halls
  has_many :photos, as: :imageable
  has_many :reviews

  def average_rating
    return 0 if reviews.count == 0
    reviews.inject(0) { |a, e| a + e.stars } / reviews.count.to_f
  end
end
