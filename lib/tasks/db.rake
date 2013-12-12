namespace :db do

  task :all => [:environment, :drop, :create, :migrate, :populate] do
  end

end