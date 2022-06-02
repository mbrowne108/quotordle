class CreateQuotes < ActiveRecord::Migration[7.0]
  def change
    create_table :quotes do |t|
      t.string :quote
      t.string :movie
      t.integer :year
      t.string :character
      t.string :actor

      t.timestamps
    end
  end
end
