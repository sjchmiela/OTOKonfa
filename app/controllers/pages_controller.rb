class PagesController < ApplicationController
  def home
    @last_added_venues = Venue.where(accepted: true).order('created_at desc').limit(3)
  end
end
