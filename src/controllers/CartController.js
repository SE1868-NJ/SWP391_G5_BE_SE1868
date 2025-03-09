const CartService = require('../services/CartService');

const Cart = {
    getAllCart: async (req, res) => {
        try {
            const result = await CartService.getAllCarts();
            res.status(200).json(result[0]);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getCartByCusID: async (req, res) => {
        try {
            const cusID = req.body.cusID;
            const result = await CartService.getCartByCusID(cusID);
            res.status(200).json(result);
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    },
    updateQuantity: async (req, res) => {
        try {
            const { cartID, newQuantity } = req.body;
            if (!cartID || newQuantity === undefined || isNaN(newQuantity)) {
                return res.status(400).json({ error: "Thiếu dữ liệu" });
            }
            console.log("Dữ liệu hợp lệ");

            await CartService.updateCartDetailQuantity(cartID, newQuantity);
            res.status(200).json({ message: newQuantity > 0 ? "Cập nhật số lượng thành công!" : "Sản phẩm bị xóa" });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteItem: async (req, res) => {
        try {
            const cartID = req.body?.cartID || req.query?.cartID;
            if (!cartID) {
                return res.status(400).json({ error: "Thiếu dữ liệu" });
            }
            await CartService.removeCartDetail(cartID);
            res.status(200).json({ message: "Item deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },
    updateCartDetail: async (req, res) => {
        try {
            await CartService.updateCartDetail(req.body);
            res.status(200).json({ message: "Thêm sản phẩm thành công", status: 200 });
        } catch (error) {
            res.status(200).json({message: "Thêm sản phẩm thất bại", status: 204});
        }
    }
}
module.exports = Cart;