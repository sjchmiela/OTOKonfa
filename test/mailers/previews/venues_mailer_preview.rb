# Preview all emails at http://localhost:3000/rails/mailers/venues
class VenuesMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/venues/contact
  def contact
    VenuesMailer.contact
  end

end
