class QuoteSerializer < ActiveModel::Serializer
  attributes :id, :quote, :title, :year, :character, :actor
end
