class CreateMenus < ActiveRecord::Migration[5.0]
  def change
    create_table :menus do |t|
      t.string :name
      t.string :category
      t.integer :sell_price
      t.text :memo
      t.float :cost_price
      t.string :photo
      t.timestamps
    end
  end
end
