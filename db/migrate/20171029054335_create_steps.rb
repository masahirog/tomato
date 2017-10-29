class CreateSteps < ActiveRecord::Migration[5.0]
  def change
    create_table :steps do |t|
      t.integer :recipe_id
      t.text :step_text
      t.string :step_photo
      t.timestamps
    end
  end
end
