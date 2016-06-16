class Managers::VenuesController < ApplicationController
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

  # POST /venues
  # POST /venues.json
  def create
    @venue = Venue.new(venue_params)
    @venue.manager = current_manager

    respond_to do |format|
      if @venue.save
        format.html { redirect_to @venue, notice: 'Venue was successfully created.' }
        format.json { render :show, status: :created, location: @venue }
      else
        format.html { render :new }
        format.json { render json: @venue.errors, status: :unprocessable_entity }
      end
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

  def upload_photo
    @photo = Photo.new(image: params['photo'], title: params['title'])
    Venue.find(params['venue_id']).photos.append(@photo)
  end

  def update_property
    if params["property"] == "photo"
      photo = Photo.find(Integer(params['id']))
      if params['method'] == 'delete'
        if photo.imageable_type == 'Venue'
          if Venue.find(photo.imageable_id).manager == current_manager
            Photo.find(params['id']).destroy
            render nothing: true, status: :ok
          else
            render nothing: true, status: :error
          end
        else
          render nothing: true, status: :error
        end
      else
        if photo.imageable_type == 'Venue'
          if Venue.find(photo.imageable_id).manager == current_manager
            Photo.find(params['id']).update(title: params['value'])
            render nothing: true, status: :ok
          else
            render nothing: true, status: :error
          end
        else
          render nothing: true, status: :error
        end
      end
    else
      if params["property"] == 'attributes'
        @venue = Venue.find(params["venue_id"])
        if params["method"] == 'add'
          @venue.features.append(Feature.find(params['value']))
          render nothing: true, status: :ok
        else
          @venue.features.delete(Feature.find(params['value']))
          render nothing: true, status: :ok
        end
      else
        t = {}
        t.store(params["property"], params["value"])
        @venue = Venue.find(params["venue_id"])
        if @venue.update(t)
          render nothing: true, status: :ok
        else
          render json: @venue.errors, status: :unprocessable_entity
        end
      end
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
    @venue = Venue.find(params[:id])
  end

  def check_manager_ownership!
    redirect_to root_url, alert: 'You are not authorized to manage this venue.' if @venue.manager != current_manager
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def venue_params
    params.require(:venue).permit(:name, :description, :address, :geoposition, :phone, :email, :website)
  end
end
