# Preview all emails at http://localhost:3000/rails/mailers/venues
class VenuesPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/venues/contact
  def contact
    Venues.contact
  end

end
