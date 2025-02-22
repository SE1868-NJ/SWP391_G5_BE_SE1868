const productControllers = require('../controllers/productController');
const OrderControllers = require('../controllers/productController')
const express = require('express')

const router = express.Router();

router.get('/All',productControllers.getAllProducts);
router.get('/All/New',productControllers.getAllProductsNew);
router.get('/Category',productControllers.getAllCategory);
router.post('/Search',productControllers.searchProduct);
router.post('/fetchProduct',productControllers.getProductByID);
router.post('/getFavorite',productControllers.getFavoriteByCusID);
router.post('/Favorite',productControllers.setProductFavorite);
router.post('/Favorite/delete',productControllers.deleteProductFavorite);
router.post('/Favorite/getAll',productControllers.getProductFavorite);
router.post('/Favorite/getAll-product',productControllers.getProductsFavorite);
router.post('/detail',productControllers.getProductDetail);
router.post('/check-user-can-comment',productControllers.checkUserCanComment);



module.exports = router;
