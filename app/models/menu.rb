class Menu < ApplicationRecord
  has_many :menu_recipes, dependent: :destroy
  has_many :recipes, through: :menu_recipes
  accepts_nested_attributes_for :menu_recipes, allow_destroy: true
end
