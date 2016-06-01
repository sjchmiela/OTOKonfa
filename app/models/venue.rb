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
    return '' if address.nil?
    (address).split(', ').last
  end

  def hotel_size
    self.hotels.to_a.inject(0) do |sum, hotel|
      hotel.room_components.to_a.inject(0) do |sum_hotel, room|
        (room.quantity * room.capacity) + sum_hotel
      end
      + sum
    end
  end
end
