class ReviewsController < ApplicationController
  before_action :set_venue, only: [:show, :edit, :update, :destroy]

  def create
  end

  def update
  end

  def destroy
  end

  def accept
  end

  def edit
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_venue
    @venue = Venue.find(params[:venue_id])
  end
end
