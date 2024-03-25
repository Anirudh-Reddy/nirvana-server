import mongoose from 'mongoose';

const ItemsSchema = new mongoose.Schema({
    id: {type:String},
    itemName: { type: String, required: true },
    itemDescription: { type: String, required: true },
    itemImage: { type: String, required: true },
    itemPrice: { type: Number, required: true },
});

const MenuSchema = new mongoose.Schema({
    id: {type:String},
    menuType: { type: String, required: true },
    menuList: [ItemsSchema],
});

const MenuItemsModel = mongoose.model('menu',MenuSchema);
export default MenuItemsModel;