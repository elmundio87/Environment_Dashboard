class DashboardController < ApplicationController


def index
  @Vms = Vm.all
end

end
