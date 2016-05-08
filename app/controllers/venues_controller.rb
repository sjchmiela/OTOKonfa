class VenuesController < ApplicationController
  before_action :set_venue, only: [:show, :edit, :update, :destroy]

  # GET /venues
  # GET /venues.json
  def index
    if !params[:search]
      if admin_signed_in
        @venues = Venue.all
      else
        @venues = Venue.where(accepted: true)
      end
    else
      if admin_signed_in
        @venues = Venue.where('name like ? or description like ?', "%#{params[:search]}%", "%#{params[:search]}%")
      else
        @venues = Venue.where('accepted = true and (name like ? or description like ?)', "%#{params[:search]}%", "%#{params[:search]}%")
      end
    end
  end

  # GET /venues/1
  # GET /venues/1.json
  def show
    @review = Review.new(user: current_user) if user_signed_in?
  end

  def contact
    VenuesMailer.contact(
      Venue.find(params[:venue_id]).manager.email,
      params[:name],
      params[:email],
      params[:phone],
      params[:message]
    ).deliver_now
    redirect_to venue_path(params[:venue_id]), notice: 'Wysłano wiadomość.'
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_venue
    @venue = Venue.find(params[:id])
  end
end
