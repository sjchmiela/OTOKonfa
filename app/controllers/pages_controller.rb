class PagesController < ApplicationController
  def home
    @last_added_venues = Venue.order('created_at desc').limit(3)
  end
end
