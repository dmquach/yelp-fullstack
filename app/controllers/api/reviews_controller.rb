class Api::ReviewsController < ApplicationController
  before_action :require_logged_in, only: [:create]
  wrap_parameters include: Review.attribute_names + [:images]

  def index
    @reviews = Review.includes(:user).all
    render :index
  end

  def create
    @review = Review.new
    @review.business_id = params[:review][:business_id]
    @review.user_id = params[:review][:user_id]
    @review.rating = params[:review][:rating]
    @review.body = params[:review][:body]
  end

end
