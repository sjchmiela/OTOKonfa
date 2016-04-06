class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  # Removing :validatable => accounts won't have to be confirmed.
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable
end
