class Photo < ActiveRecord::Base
  default_scope { order(:order) }
  belongs_to :imageable, polymorphic: true
  has_attached_file :image, path: ":rails_root/storage/#{Rails.env}#{ENV['RAILS_TEST_NUMBER']}/attachments/:id/:style/:basename.:extension"
  validates_attachment_presence :image
  validates_attachment_content_type :image, content_type: /\Aimage/
  validates_attachment_size :image, in: 0..1.megabytes
end
