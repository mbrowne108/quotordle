class QuotesController < ApplicationController
    def index
        render json: Quote.all.sample, status: 200
    end

    def show
        quote = find_quote
        render json: quote, status: 200
    end

    private

    def find_quote
        Quote.find_by(id: params[:id])
    end

    def site_params
        params.permit(:quote, :movie, :year, :character, :actor)
    end
end
