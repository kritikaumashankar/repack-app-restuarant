# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

10.times do
  MenuItem.create(
    name: Faker::Food.dish,
    description: Faker::Food.description,
    price: rand(0..15.0) * 100 / floor(100),
    spicy_level: Faker::Food.spice,
    menu_id: rand(0..5)
  )
end
  