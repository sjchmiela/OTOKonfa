module VenuesHelper
  def cover(venue)
    return ActionController::Base.helpers.image_path('placeholder.jpg') if venue.photos.empty?
    venue.photos.first.image
  end
end
