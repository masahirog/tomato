class FoodsController < ApplicationController
  def index
    @search = Food.search(params).page(params[:page]).per(20)
  end
  def new
    @food = Food.new
  end
  def create
    @food = Food.create(food_create_update)
    if @food.save
      redirect_to foods_path
    else
      render 'new'
    end
  end

  private
  def food_create_update
    params.require(:food).permit(:name, :order_name, :calculated_value, :calculated_unit,
     :calculated_price, :cost_price, :category, :management_code, :order_unit, :memo, :sales_end, :vendor_id)
  end

end
