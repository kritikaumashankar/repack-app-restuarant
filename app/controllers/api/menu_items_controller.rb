class Api::MenuItemsController < ApplicationController
  before_action :set_menu
  before_action :set_menu_items,only: [:update, :destroy]
  def index
    render json: @menu.menu_items.order(created_at: :desc)
  end

  def create
    menu_item = @menu.menu_items.new(item_params)
    if menu_item.save
      render json: menu_item
    else
      render_error(menu_item)
    end
  end

  def update
    if @menu_item.update(item_params)
      render json: @menu_item
    else
      render_error(@menu_item)
    end
  end

  def destroy
    @menu_item.destroy
  end

  private

  def set_menu
    @menu = Menu.find(params[:menu_id])
  end

  def set_menu_items
    @menu_item = MenuItem.find(params[:id])
  end

  def item_params
    params.require(:menu_item).permit(:name, :description, :price, :spicy_level)
  end
end
