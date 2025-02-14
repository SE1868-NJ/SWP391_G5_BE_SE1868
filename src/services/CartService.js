const CartModel = require('../models/CartModel');
const ProductModel = require('../models/ProductModel');

const Cart = {
    getAllCarts:async()=>{
        return await CartModel.getAllCart();
    },
    getCartByCusID: async(cusID)=>{
        const CartDetail =  await CartModel.getCartDetailByCusID(cusID);
        const result = await Promise.all(
            CartDetail.map(async (item) => {
                const product = await ProductModel.getProductByProID(item.ProductID);
                return {
                    cartID: item.CartDetailID,
                    productID: product[0].ProductID,
                    productImg: product[0].ProductImg,
                    productName: product[0].ProductName,
                    productCategory: product[0].Category,
                    ShopID: product[0].ShopID,
                    productPrice: product[0].Price,
                    Quantity: item.Quantity,
                    feeShip: 32000,
                    totalAmount: item.Quantity * product[0].Price + 32000,
                };
            }))
        return result;
    },
    removeCartDetail:async(OrderInfor)=>{
        await CartModel.removeCartDetail(OrderInfor);
    },
    updateCartDetailQuantity: async (cartDetailID, quantity) => {
        await CartModel.updateCartDetailQuantity(cartDetailID, quantity);
    }
}

module.exports = Cart;