class Venues < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.venues.contact.subject
  #
  def contact
    @greeting = "Hi"

    mail to: "to@example.org"
  end
end
