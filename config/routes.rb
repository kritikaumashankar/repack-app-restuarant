Rails.application.routes.draw do
  namespace :api do
    #API ROUTES SHOULD GO HERE
    resources :menus do 
      resources :menu_items
    end
  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
