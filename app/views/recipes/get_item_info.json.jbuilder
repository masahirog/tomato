json.item do |json|
  json.cost_price    @item.cost_price
  json.name    @item.name
  json.recipe_unit    @item.recipe_unit
  json.vendor_company_name    @item.vendor.company_name
end
