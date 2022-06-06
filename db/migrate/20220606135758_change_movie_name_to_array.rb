class ChangeMovieNameToArray < ActiveRecord::Migration[7.0]
  def change
    add_column :quotes, :title, :string, array: true, default: []
    remove_column :quotes, :movie
  end
end
