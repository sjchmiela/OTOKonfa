class ApplicationController < ActionController::Base
  include AuthenticationHelper

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :logout_user_if_manager_logged_in

  def logout_user_if_manager_logged_in
    sign_out(current_user) if manager_signed_in? && user_signed_in?
  end
end
