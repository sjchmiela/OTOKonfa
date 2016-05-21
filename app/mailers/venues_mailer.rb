class VenuesMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.venues.contact.subject
  #
  def contact(to, name, email, phone, message)
    @name = name
    @email = email
    @phone = phone
    @message = message
    mail to: to
  end
end
