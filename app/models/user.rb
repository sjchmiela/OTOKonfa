class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  # Removing :validatable => accounts won't have to be confirmed.
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable,
         :omniauthable, omniauth_providers: [:facebook]
  validates_presence_of :email
  validates_uniqueness_of :email
  validates_confirmation_of :password
  validates_length_of :first_name, in: 2..100
  validates_length_of :last_name, in: 2..100

  has_many :reviews
end
