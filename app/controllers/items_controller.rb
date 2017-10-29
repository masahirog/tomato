class ItemsController < ApplicationController
  def index
    @search = Item.search(params).page(params[:page]).per(20)
  end
  def new
    @item = Item.new
  end
  def create
    @item = Item.create(item_create_update)
    if @item.save
      redirect_to items_path
    else
      render 'new'
    end
  end
  def show
    @item = Item.find(params[:id])
  end
  def edit
    @item = Item.find(params[:id])
  end
  def update
    @item = Item.find(params[:id])
    @item.update(item_create_update)
    if @item.save
      redirect_to items_path
    else
      render 'edit'
    end
  end


  private
  def item_create_update
    params.require(:item).permit(:name, :order_name, :regular_amount, :recipe_unit,
     :regular_price, :cost_price, :category, :management_code, :order_unit, :memo, :sales_end, :vendor_id)
  end

end
