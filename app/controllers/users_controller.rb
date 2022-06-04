class UsersController < ApplicationController
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user
        else
            render json: { error: "Not authorized" }, status: :unauthorized
        end
    end

    def index
        render json: User.all
    end

    def update
        user = User.find_by(id: session[:user_id])
        if user
            user.update!(user_params)
            render json: user
        else
            render json: { error: "User not found" }, status: :not_found
        end
    end

    private

    def user_params
        params.permit(:username, :score, :weighted_score)
    end
end
