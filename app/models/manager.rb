class Manager < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable
  validates_presence_of :email
  validates_uniqueness_of :email
  validates_confirmation_of :password
  validates_length_of :first_name, in: 2..100
  validates_length_of :last_name, in: 2..100

  has_many :venues
end
