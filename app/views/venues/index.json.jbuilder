json.array!(@venues) do |venue|
  json.extract! venue, :id, :name, :description, :address, :geoposition, :phone
  json.url venue_url(venue, format: :json)
end
