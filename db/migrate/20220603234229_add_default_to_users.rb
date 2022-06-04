class AddDefaultToUsers < ActiveRecord::Migration[7.0]
  def change
    change_column_default :users, :score, 0
    change_column_default :users, :weighted_score, 0.00
  end
end
