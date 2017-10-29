class CreateItems < ActiveRecord::Migration[5.0]
  def change
    create_table :items do |t|
      t.string :name
      t.string :order_name
      t.integer :regular_amount
      t.string :recipe_unit
      t.integer :regular_price
      t.string :order_unit
      t.float :cost_price
      t.string :category
      t.string :management_code
      t.text :memo
      t.integer :sales_end
      t.integer :vendor_id
      t.timestamps
    end
  end
end
