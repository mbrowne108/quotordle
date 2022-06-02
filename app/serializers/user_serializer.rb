class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :score, :weighted_score
end
