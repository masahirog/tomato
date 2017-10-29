class CreateRecipes < ActiveRecord::Migration[5.0]
  def change
    create_table :recipes do |t|
      t.string :name
      t.string :category
      t.integer :serving_for
      t.float :price
      t.string :photo
      t.text :memo
      t.timestamps
    end
  end
end
