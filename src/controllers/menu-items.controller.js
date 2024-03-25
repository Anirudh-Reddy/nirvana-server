import RestaurantMenu from "../models/menu-items.model.js";

const updateMenu = async (req, res) => {
    try {
        const menuId = req.params.id;
        const updatedMenuData = req.body;
        const menu = await RestaurantMenu.findById(menuId);
        if (!menu) {
            return res.status(404).json({ message: "Menu type does not exist!" });
        }

        menu.menuType = updatedMenuData.menuType;
        await menu.save();

        res.status(200).json({ message: "Menu updated successfully", data: menu });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateItem = async (req, res) => {
    try {
        const menuId = req.params.menuId;
        const itemId = req.params.itemId;
        const updatedItemData = req.body;

        const menu = await RestaurantMenu.findById(menuId);
        if (!menu) {
            return res.status(404).json({ message: "Menu type does not exist!" });
        }
        const itemToUpdate = menu.menuList.find(item => item._id == itemId);
        if (!itemToUpdate) {
            return res.status(404).json({ message: "Item not found in menu!" });
        }

        itemToUpdate.itemName = updatedItemData.itemName;
        itemToUpdate.itemDescription = updatedItemData.itemDescription;
        itemToUpdate.itemPrice = updatedItemData.itemPrice;
        itemToUpdate.itemImage = updatedItemData.itemImage;
        await menu.save();

        res.status(200).json({ message: "Item updated successfully", data: itemToUpdate });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteItem = async (req, res) => {
    try {
        const menuId = req.params.menuId;
        const itemId = req.params.itemId;

        const menu = await RestaurantMenu.findById(menuId);
        if (!menu) {
            return res.status(404).json({ message: "Menu type does not exist!" });
        }

        menu.menuList = menu.menuList.filter(item => item._id.toString() !== itemId);
        await menu.save();

        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteMenu = async (req, res) => {
    try {
        const menuId = req.params.id;
        const deletedMenu = await RestaurantMenu.findByIdAndDelete(menuId);
        if (!deletedMenu) {
            return res.status(404).json({ message: "Menu type does not exist!" });
        }

        res.status(200).json({ message: "Menu deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createNewMenu = async (req,res)=>{
    try{
        let menuId = req.body.id;
        const menuExists = await RestaurantMenu.findById(menuId);
        if(menuExists){
            return res.status(500).json({"message":"menu type already exists!"});
        }
        await RestaurantMenu.create(req.body);
        res.status(201).json({"message":"new menu created!"});
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

const createNewMenuItem = async (req,res)=>{
    try{
        const menuId = req.query.id;
        const itemName = req.query.itemName;
        const newItem = req.body;
        const menuExists = await RestaurantMenu.findById(menuId);
        if(!menuExists){
           return res.status(404).json({"message":"menu type does not exists!"});
        }

        const menuItemExists = menuExists.menuList.find(item => {
            return item.itemName == itemName;
        });
        if(menuItemExists){
           return res.status(400).json({"message":"menu item already exists!"});
        }
        menuExists.menuList.push(newItem);
        await menuExists.save();
        res.status(201).json({"message":"new menu item created!"});
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

const getFullMenu = async (req,res)=>{
    try {
        const users = await RestaurantMenu.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export {
    updateMenu,
    updateItem,
    deleteItem,
    deleteMenu,
    getFullMenu,
    createNewMenu,
    createNewMenuItem
}