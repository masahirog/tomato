class Item < ApplicationRecord
  belongs_to :vendor

  has_many :recipe_items, dependent: :destroy
  has_many :recipes, through: :recipe_items

  def self.search(params)
     if params
       data = Item.all
       data = data.where(['name LIKE ?', "%#{params["name"]}%"]) if params["name"].present?
       data = data.where(['order_name LIKE ?', "%#{params["order_name"]}%"]) if params["order_name"].present?
       data = data.where(['management_code LIKE ?', "%#{params["management_code"]}%"]) if params["management_code"].present?
       data = data.where(['sales_end LIKE ?', "%#{params["sales_end"]["value"]}%"]) if params["sales_end"].present?
       data
     else
       Item.all
     end
    end
end
