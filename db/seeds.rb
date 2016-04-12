# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

ice_krakow = Venue.create(name: 'ICE Kraków', description: 'Ponad 36.000 m² przestrzeni konferencyjnej, Sala Audytoryjna gotowa przyjąć do 2000 osób, przestronne i wielofunkcyjne foyer przystosowane między innymi do organizacji wystaw, stoisk sponsorskich i ekspozycyjnych, a przy tym wyśmienita lokalizacja obiektu w centrum Krakowa – to tylko niektóre z atutów powstającego  w Krakowie wielofunkcyjnego Centrum Kongresowego ICE Kraków, którego inwestorem jest Gmina Miejska Kraków.', address: 'ul. Marii Konopnickiej 17,\nKraków 30-302', geoposition: '50.047871, 19.931149', phone: '12 354 23 00')
Hall.create(venue: ice_krakow, name: 'Sala audytoryjna', chairs: 2000, capacity: 2000)
Hall.create(venue: ice_krakow, name: 'Sala teatralna', chairs: 220, capacity: 660)
Hall.create(venue: ice_krakow, name: 'Sala kameralna', chairs: 300, capacity: 500)
Hall.create(venue: ice_krakow, name: 'Zespół sal konferencyjnych', chairs: 300, capacity: 600)
