json.array!(@features) do |feature|
  json.extract! feature, :id, :name, :icon
end
