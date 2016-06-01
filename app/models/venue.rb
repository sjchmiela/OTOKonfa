class Venue < ActiveRecord::Base
  belongs_to :manager
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
    return '' if address.nil?
    (address).split('\n').last.match('(.)+\s')
  end

  def hotel_size
    hotels.to_a.inject(0) do |hotel, sum|
      hotel.to_a.room_components.inject(0) do |room, sum_hotel|
        (room.quantity * room.capacity) + sum_hotel
      end
      + sum
    end
  end
end
