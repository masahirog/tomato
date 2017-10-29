class CreateRecipeItems < ActiveRecord::Migration[5.0]
  def change
    create_table :recipe_items do |t|
      t.integer :recipe_id
      t.integer :item_id
      t.float :quantity
      t.timestamps
    end
  end
end
