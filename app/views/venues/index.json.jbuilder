json.array!(@venues) do |venue|
  json.extract! venue, :id, :name, :description, :address, :geoposition, :phone
  json.url venue_url(venue, format: :json)
  json.thumb venue.photos.first.image if venue.photos.any?
end
