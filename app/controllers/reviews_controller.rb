class ReviewsController < ApplicationController
  before_action :set_venue, only: [:create, :accept, :edit, :update, :destroy]

  # POST /venues/:venue_id/reviews
  # POST /venues/:venue_id/reviews.json
  def create
    @review = Review.new(review_params)
    @review.user = current_user
    @review.venue = Venue.find(params[:venue_id])

    respond_to do |format|
      if @review.save
        format.html { redirect_to @venue, notice: 'Comment was successfully created.' }
        format.json { render :show, status: :created, location: [@venue, @review] }
      else
        format.html { render :new }
        format.json { render json: @venue.errors, status: :unprocessable_entity }
      end
    end
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

  # Never trust parameters from the scary internet, only allow the white list through.
  def review_params
    params.require(:review).permit(:stars, :comment)
  end
end
