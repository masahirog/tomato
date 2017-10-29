class RecipesController < ApplicationController
  def index
    @search = Recipe.search(params).page(params[:page]).per(20)
  end

  def new
    @recipe = Recipe.new
    @recipe.recipe_items.build
  end

  def create
    @recipe = Recipe.create(recipe_create_update)
     if @recipe.save
       redirect_to recipes_path
     else
       render 'new'
     end
  end

  def edit
    @recipe = Recipe.find(params[:id])
  end

  def update
    @recipe = Recipe.find(params[:id])
    @recipe.update(recipe_create_update)

    if @recipe.save
      redirect_to recipe_path
    else
      render "edit"
    end
  end

  def show
    @recipe = Recipe.find(params[:id])
    @recipe_items = @recipe.recipe_items
  end

  def get_item_info
    @item = Item.find(params[:id])
    respond_to do |format|
      format.html
      format.json
    end
  end



  private
    def recipe_create_update
      params.require(:recipe).permit(:name, :category, :serving_for, :price,
                                     recipe_items_attributes: [:id, :quantity, :recipe_id, :item_id, :_destroy])
    end
end
