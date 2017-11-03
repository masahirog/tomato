class VendorsController < ApplicationController
  before_action :set_request_variant

  def index
    @vendors = Vendor.all
  end
  def new
    @vendor = Vendor.new
  end
  def create
    @vendor = Vendor.create(create_update_params)
    if @vendor.save
      redirect_to vendors_path
    else
      render 'new'
    end
  end
  def show
    @vendor = Vendor.find(params[:id])
  end
  def edit
    @vendor = Vendor.find(params[:id])
  end
  private
  def set_request_variant
    request.variant = request.device_variant
  end


  def create_update_params
    params.require(:vendor).permit(:company_name, :company_phone, :company_fax, :company_mail,
                                    :zip, :address, :staff_name, :staff_phone, :staff_mail, :memo)
  end

end
