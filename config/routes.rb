Rails.application.routes.draw do
  devise_for :managers, controllers: {
    passwords: 'managers/passwords',
    registrations: 'managers/registrations',
    sessions: 'managers/sessions'
  }
  devise_for :users, controllers: {
    passwords: 'users/passwords',
    registrations: 'users/registrations',
    sessions: 'users/sessions',
    omniauth_callbacks: 'users/omniauth_callbacks'
  }
  namespace :admin do
    resources :venues, only: [:update]
  end
  namespace :managers do
    resources :venues, except: [:show] do
      resources :halls, only: [:create]
      post 'upload_photo'
    end
  end

  get '/venues/compare' => 'venues#compare'
  post '/venues/compare' => 'venues#compare'

  resources :venues, only: [:index, :show] do
    put '' => 'managers/venues#update'
    resources :reviews, only: [:create, :edit, :update, :destroy, :accept]
    post 'contact'
    post '' => 'managers/venues#update_property'
  end

  get 'features' => 'features#index'

  root to: 'pages#home'
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
