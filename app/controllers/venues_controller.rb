class VenuesController < ApplicationController
  before_action :set_venue, only: [:show, :edit, :update, :destroy]

  # GET /venues
  # GET /venues.json
  def index
    venues = Venue.
      where('name like ? or description like ?', "%#{params[:search]}%", "%#{params[:search]}%").
      includes(:halls, :hotels, :features)

    venues = venues.where(accepted: true) unless admin_signed_in

    venues = venues.to_a

    # puts "array"
    # puts venues

    min_places, max_places = params[:hall_size].split(',').map { |e| Integer(e) }

    venues = venues.keep_if do |venue|
      biggest_hall = venue.halls.max_by do |h|
        params['slot-type'] == '0' ? h.chairs : h.capacity
      end

      smallest_hall = venue.halls.min_by do |h|
        params['slot-type'] == '0' ? h.chairs : h.capacity
      end

      # puts biggest_hall, smallest_hall

      true if min_places == 0 && biggest_hall.nil?
      false if biggest_hall.nil?

      if params['slot-type'] == '0'
        (biggest_hall.chairs <= max_places && smallest_hall.chairs >= min_places)
      else
        (biggest_hall.capacity <= max_places && smallest_hall.capacity >= min_places)
      end
    end

    # puts "halls_size"
    # puts venues

    min_halls, max_halls = params[:halls_count].split(',').map { |e| Integer(e) }

    venues = venues.keep_if do |venue|
      venue.halls.count <= max_halls && venue.halls.count >= min_halls
    end

    # puts "halls_count"
    # puts venues

    min_hotel_size, max_hotel_size = params[:hotel_size].split(',').map { |e| Integer(e) }

    venues = venues.keep_if do |venue|
      hotels_size = venue.hotels.to_a.inject(0) do |hotel, sum|
        hotel.to_a.room_components.inject(0) do |room, sum_hotel|
          (room.quantity * room.capacity) + sum_hotel
        end
        + sum
      end

      # puts hotels_size

      hotels_size <= max_hotel_size && hotels_size >= min_hotel_size
    end

    # min_radius_size, max_radius_size = params[:radius_size].split(',').map { |e| Float(e) }

    min_rating, max_rating = params[:average_rating].split(',').map { |e| Float(e) }

    venues = venues.keep_if do |venue|
      venue.average_rating <= max_rating && venue.average_rating >= min_rating
    end

    @venues = venues

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

    render :index
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_venue
    @venue = Venue.find(params[:id])
  end
end
