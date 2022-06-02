class QuoteSerializer < ActiveModel::Serializer
  attributes :id, :quote, :movie, :year, :character, :actor
end
