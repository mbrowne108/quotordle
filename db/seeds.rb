# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

matt = User.create!(username: "matt", score: 3, weighted_score: 2.5)

wind = Quote.create!(quote: "Frankly, my dear, I don't give a damn.", movie: "Gone with the Wind", year: 1939, character: "Rhett Butler", actor: "Clark Gable")
godfather = Quote.create!(quote: "I'm going to make him an offer he can't refuse.", movie: "The Godfather", year: 1972, character: "Vito Corleogne", actor: "Marlon Brando")
waterfront = Quote.create!(quote:  "You don't understand! I could've had class. I could've been a contender. I could've been somebody, instead of a bum, which is what I am.", movie: "On the Waterfront", year: 1954, character: "Terry Malloy", actor: "Marlon Brando")


