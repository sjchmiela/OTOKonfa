class Managers::HallsController < ApplicationController
  before_action :authenticate_manager!
  before_action :set_venue, only: [:edit, :update, :destroy]
  before_action :check_manager_ownership!, only: [:edit, :update, :destroy]


  def index
    @venues = current_manager.venues
  end

  # GET /venues/new
  def new
    @venue = Venue.new(manager: current_manager)
  end

  # GET /venues/1/edit
  def edit
  end

  # POST /venues
  # POST /venues.json
  def create
    @hall = Hall.new(hall_params)
    @hall.venue_id = params['venue_id']

    if @hall.save
      render nothing: true, status: :ok
    else
      render json: @venue.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /venues/1
  # PATCH/PUT /venues/1.json
  def update
    respond_to do |format|
      if @venue.update(venue_params)
        format.html { redirect_to @venue, notice: 'Venue was successfully updated.' }
        format.json { render :show, status: :ok, location: @venue }
      else
        format.html { render :edit }
        format.json { render json: @venue.errors, status: :unprocessable_entity }
      end
    end
  end

  def update_property
    t = {}
    t.store(params["property"], params["value"])
    @venue = Venue.find(params["venue_id"])
    if @venue.update(t)
      render nothing: true, status: :ok
    else
      render json: @venue.errors, status: :unprocessable_entity
    end
  end

  # DELETE /venues/1
  # DELETE /venues/1.json
  def destroy
    @venue.destroy
    respond_to do |format|
      format.html { redirect_to venues_url, notice: 'Venue was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_venue
    @venue = Venue.find(params[:venue_id])
  end

  def check_manager_ownership!
    redirect_to root_url, alert: 'You are not authorized to manage this venue.' if @venue.manager != current_manager
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def hall_params
    params.require(:hall).permit(:name, :description, :chairs, :capacity)
  end
end
