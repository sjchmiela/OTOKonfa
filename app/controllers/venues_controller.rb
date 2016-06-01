require 'haversine'

class VenuesController < ApplicationController
  before_action :set_venue, only: [:show, :edit, :update, :destroy]

  # GET /venues
  # GET /venues.json
  def index
    venues = Venue.
      where('name like ? or description like ?', "%#{params[:query]}%", "%#{params[:query]}%").
      includes(:halls, :hotels, :features)

    venues = venues.where(accepted: true) unless admin_signed_in

    venues = venues.to_a

    # puts "array"
    # puts venues

    if params[:hall_size] and !params['slot-type'].nil?

      min_places, max_places = params[:hall_size].split(',').map { |e| Integer(e) }

      venues = venues.keep_if do |venue|
        biggest_hall = venue.halls.max_by do |h|
          params['slot-type'] == '0' ? h.chairs : h.capacity
        end

        smallest_hall = venue.halls.min_by do |h|
          params['slot-type'] == '0' ? h.chairs : h.capacity
        end


        if biggest_hall.nil? || smallest_hall.nil?
          (min_places == 0)
        else
          if params['slot-type'] == '0'
            (biggest_hall.chairs <= max_places && smallest_hall.chairs >= min_places)
          else
            (biggest_hall.capacity <= max_places && smallest_hall.capacity >= min_places)
          end
        end
      end
    end

    # puts "halls_size"
    # puts venues

    if params[:halls_count]
      min_halls, max_halls = params[:halls_count].split(',').map { |e| Integer(e) }

      venues = venues.keep_if do |venue|
        venue.halls.count <= max_halls && venue.halls.count >= min_halls
      end

      # puts "halls_count"
      # puts venues

      min_hotel_size, max_hotel_size = params[:hotel_size].split(',').map { |e| Integer(e) }

      venues = venues.keep_if do |venue|
        hotels_size = venue.hotels.to_a.inject(0) do |sum, hotel|
          hotel.room_components.to_a.inject(0) do |sum_hotel, room|
            (room.quantity * room.capacity) + sum_hotel
          end
          + sum
        end

        # puts hotels_size

        hotels_size <= max_hotel_size && hotels_size >= min_hotel_size
      end
    end

    # min_radius_size, max_radius_size = params[:radius_size].split(',').map { |e| Float(e) }

    if params[:average_rating]
      min_rating, max_rating = params[:average_rating].split(',').map { |e| Float(e) }

      venues = venues.keep_if do |venue|
        venue.average_rating <= max_rating && venue.average_rating >= min_rating
      end
    end

    if params[:attributes]
      required_attributes = params[:attributes].split(',').map { |e| Integer(e) }
      venues = venues.keep_if do |venue|
        (required_attributes - venue.features.map(&:id)).empty?
      end
    end

    if params[:location] && params[:radius_size]
      min_distance, max_distance = params[:radius_size].split(',').map { |e| Float(e) }
      lat, lon = params[:location].split(',').map { |e| Float(e) }
      venues = venues.keep_if do |venue|
        true if venue.geoposition.nil?
        vlat, vlon = venue.geoposition.split(',').map { |e| Float(e) }
        dist_km = Haversine.distance(lat, lon, vlat, vlon)
        (dist_km <= max_distance) && (dist_km >= min_distance)
      end
    end

    @venues = venues
    @max_places = 0
    Venue.all.each do |v|
      next if v.halls.empty?
      hall = v.halls.to_a.max_by { |h| [h.chairs, h.capacity].max || 0 }
      @max_places = [hall.chairs, hall.capacity, @max_places].max
    end
    @max_places = 100 if @max_places == 0

    if Venue.all.any?
      @max_halls_count = (Venue.all.to_a.max_by { |v| v.halls.count }).halls.count
      @max_halls_count = 10 if @max_halls_count == 0
      @max_hotel_size = (Venue.all.to_a.max_by(&:hotel_size)).hotel_size
      @max_hotel_size = 100 if @max_hotel_size == 0
    else
      @max_halls_count = 10
      @max_hotel_size = 100
    end

    # puts @venues
  end

  # GET /venues/1
  # GET /venues/1.json
  def show
    @review = Review.new(user: current_user) if user_signed_in?
  end

  def contact
    VenuesMailer.contact(
      Venue.find(params[:venue_id]).email,
      params[:name],
      params[:email],
      params[:phone],
      params[:message]
    ).deliver_now
    redirect_to venue_path(params[:venue_id]), notice: 'Wysłano wiadomość.'
  end

  def compare
    if params[:action_type] == 'add'
      if session[:comparing_venues]
        session[:comparing_venues] << params[:venue_id]
      else
        session[:comparing_venues] = [params[:venue_id]]
      end
    elsif params[:action_type] == 'remove'
      if session[:comparing_venues].is_a?(Array)
        session[:comparing_venues].delete(params[:venue_id])
      end
    end

    @venues = Venue.where(id: session[:comparing_venues])
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_venue
    @venue = Venue.find(params[:id])
  end
end
