json.array!(@features) do |feature|
  json.id feature.id
  json.label feature.name
end
