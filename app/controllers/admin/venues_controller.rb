class Admin::VenuesController < ApplicationController
before_filter :authenticate_admin!

def update
  respond_to do |format|
    @venue = Venue.find params[:id]
    if @venue.update_attributes(:accepted => required_params)
      format.html { redirect_to venues_path, notice: 'Venue was successfully updated.' }
      format.json { render :index, status: :ok }
    else
      format.html { redirect_to venues_path, notice: 'Venue wasnt succesfully updated' }
      format.json { render json: @venue.errors, status: :unprocessable_entity }
    end
  end
end



private

  def authenticate_admin!
	redirect_to root_url, alert: 'You are not authorized to manage this venue.' if (!user_signed_in? || !current_user.admin)
  end

  def required_params
    params.require(:accepted)
  end
end
