class VenuesController < ApplicationController
  before_action :set_venue, only: [:show, :edit, :update, :destroy]

  # GET /venues
  # GET /venues.json
  def index
    if !params[:search]
      @venues = Venue.all
    else
      @venues = Venue.where('name like ? or description like ?', "%#{params[:search]}%", "%#{params[:search]}%")
    end
  end

  # GET /venues/1
  # GET /venues/1.json
  def show
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_venue
    @venue = Venue.find(params[:id])
  end
end
