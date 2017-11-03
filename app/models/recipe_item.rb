class RecipeItem < ApplicationRecord
  belongs_to :recipe,optional: true
  belongs_to :item
end
