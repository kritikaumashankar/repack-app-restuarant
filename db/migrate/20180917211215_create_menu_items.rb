class CreateMenuItems < ActiveRecord::Migration[5.2]
  def change
    create_table :menu_items do |t|
      t.string :name
      t.string :description
      t.float :price
      t.string :spicy_level
      t.belongs_to :menu, foreign_key: true

      t.timestamps
    end
  end
end
