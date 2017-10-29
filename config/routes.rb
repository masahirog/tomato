Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'recipes/get_item_info/:id' => 'recipes#get_item_info'
  root 'top#index'
  resources :items
  resources :vendors
  resources :recipes
  resources :menus
end
