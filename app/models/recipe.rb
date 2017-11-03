class Recipe < ApplicationRecord
  has_many :recipe_items, dependent: :destroy
  has_many :items, through: :recipe_items
  accepts_nested_attributes_for :recipe_items, allow_destroy: true, update_only: true
  has_many :menu_recipes, dependent: :destroy
  has_many :menus, through: :menu_recipes
  has_many :steps, dependent: :destroy

  validates :name, presence: true

  def self.search(params)
   if params
     data = Recipe.all
     data = data.where(['name LIKE ?', "%#{params["name"]}%"]) if params["name"].present?
     data
   else
     Recipe.all
   end
  end
end
