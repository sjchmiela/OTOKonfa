class VenuesController < ApplicationController
  before_action :set_venue, only: [:show, :edit, :update, :destroy]

  # GET /venues
  # GET /venues.json
  def index
    @venues = Venue.
      where('name like ? or description like ?', "%#{params[:search]}%", "%#{params[:search]}%")

    @venues = @venues.where(accepted: true) unless admin_signed_in
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
