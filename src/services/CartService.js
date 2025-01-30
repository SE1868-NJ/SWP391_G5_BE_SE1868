const CartModel = require('../models/CartModel');
const ProductModel  = require('../models/ProductModel');

const Cart = {
    getAllCarts:async()=>{
        return await CartModel.getAllCart();
    },
    getCartByCusID: async(cusID)=>{
        let result = []
        const CartDetail =  await CartModel.getCartDetailByCusID(cusID);
        await Promise.all( CartDetail.map( async(item)=>{
            const product = await ProductModel.getProductForCart(item.ProductID);
            const tmp = {
                productImg :"https://mtv.vn/uploads/2023/02/25/meo-gg.jpg",
                productName : product[0].ProductName,
                productCategory: product[0].Category,
                productPrice:product[0].ProductPrice,
                Quantity:item.Quantity,
                totalAmount: item.TotalAmount
            }
            result.push(tmp);
        }))
        return result;
    }
}
module.exports = Cart;