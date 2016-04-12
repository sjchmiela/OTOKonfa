class Photo < ActiveRecord::Base
  belongs_to :imageable, polymorphic: true
  has_attached_file :image
  validates_attachment_presence :image
  validates_attachment_content_type :image, content_type: /\Aimage/
  validates_attachment_size :image, in: 0..1.megabytes
end
