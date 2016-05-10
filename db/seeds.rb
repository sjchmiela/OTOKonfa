# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

if Venue.count == 0
  ice_krakow = Venue.create(name: 'ICE Kraków', description: 'Ponad 36.000 m² przestrzeni konferencyjnej, Sala Audytoryjna gotowa przyjąć do 2000 osób, przestronne i wielofunkcyjne foyer przystosowane między innymi do organizacji wystaw, stoisk sponsorskich i ekspozycyjnych, a przy tym wyśmienita lokalizacja obiektu w centrum Krakowa – to tylko niektóre z atutów powstającego  w Krakowie wielofunkcyjnego Centrum Kongresowego ICE Kraków, którego inwestorem jest Gmina Miejska Kraków.', address: "ul. Marii Konopnickiej 17\nKraków 30-302", geoposition: '50.047871, 19.931149', phone: '12 354 23 00', email: 'ice@otokonfa.com')
  Hall.create(venue: ice_krakow, name: 'Sala audytoryjna', chairs: 2000, capacity: 2000)
  Hall.create(venue: ice_krakow, name: 'Sala teatralna', chairs: 220, capacity: 660)
  Hall.create(venue: ice_krakow, name: 'Sala kameralna', chairs: 300, capacity: 500)
  Hall.create(venue: ice_krakow, name: 'Zespół sal konferencyjnych', chairs: 300, capacity: 600)

  hilton_garden = Venue.create(name: 'Hilton Garden Inn', description: 'Zaplanuj kolejne spotkanie biznesowe lub imprezę towarzyską w hotelu Hilton Garden Inn w Krakowie. Oprócz bezpłatnego dostępu do całodobowego samoobsługowego centrum biznesowego z komputerami, drukarkami i bezpłatnym dostępem do Internetu do dyspozycji oddajemy też cztery uniwersalne sale konferencyjne, salę zebrań VIP z wyłącznym dostępem oraz imponujące foyer konferencyjne z niezapomnianymi widokami na Wawel. Wszystkie sale wyposażone są w projektory LCD, systemy audio i bezpłatne Wi-Fi.', address: "ul. Marii Konopnickiej 33\nKraków 30-302", geoposition: '50.0459368, 19.9314029', phone: '12 399 90 00', email: 'hilton@otokonfa.com')
  Hall.create(venue: hilton_garden, name: 'Zespół sal konferencyjnych', chairs: 250, capacity: 500)


  regus = Venue.create(name: 'Studio Sante', description: 'Wyjątkowa propozycja wynajmu Sali Konferencyjnej z zapleczem Wellness. Oferujemy nie tylko przestrzeń konferencyjną, ale również niespotykane nigdzie indziej dodatki: kompleks saun i basenów z unikalną Ożywioną Wodą Sante, dotleniającą każdą komórkę ciała. Zapraszamy do złotej wypoczywalni Goldarium i japońskiej skalnej sauny Ganbanyoku. Nie znajdziesz ich nigdzie indziej na mapie Europy!', address: "ul. Jagiellońska 55a \n03-301 Warszawa", geoposition: '52.270067, 21.016147', phone: '+48 605 130 1', email: 'sante@otokonfa.com')
  Hall.create(venue: regus, name: 'Sala Konferencyjna', chairs: 100 , capacity: 100)

  holiday_inn = Venue.create(name: 'Holiday Inn Kraków', description: 'Zapraszamy do nowoczesnego centrum konferencyjnego w sercu Krakowa. Do Państwa dyspozycji oddajemy, 11 nowocześnie wyposażonych sal konferencyjnych. Centrum konferencyjne znajduje się na 3 poziomach, a łączna przestrzeń konferencyjna obejmuje powierzchnię ponad 1500 m2.', address: "ul. Wielopole 4-8 \nKraków 31-072", geoposition: '50.059038, 19.9412927', phone: '12 619 00 00', email: 'holiday@otokonfa.com')
  Hall.create(venue: holiday_inn, name: 'Renoir', chairs: 400, capacity: 400)
  Hall.create(venue: holiday_inn, name: 'Gauguin I', chairs: 100, capacity: 200)
  Hall.create(venue: holiday_inn, name: 'Gauguin II', chairs: 100, capacity: 200)
end

if Feature.count == 0
  Feature.create([
    { name: 'WiFi', icon: 'network_wifi' },
    { name: 'Projektor', icon: 'present_to_all' },
    { name: 'Basen', icon: 'pool' },
    { name: 'Restauracja', icon: 'local_dining' },
    { name: 'Bar', icon: 'local_bar' },
    { name: 'Ksero', icon: 'local_printshop' },
    { name: 'Klimatyzacja', icon: 'ac_unit' },
    { name: 'Siłownia', icon: 'fitness_center' },
    { name: 'Sauna', icon: 'hot_tub' },
    { name: 'Kwiaciarnia', icon: 'local_florist'},
    { name: 'Kasyno', icon: 'casino'},
  ])
end
