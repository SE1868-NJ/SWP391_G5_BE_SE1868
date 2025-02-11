const pool = require("../config/Database");
const Products = {
  getAllProductsNew: async (option, type) => {
    if (option === "Tất Cả") {
      if (type === "Mới Nhất") {
        const result = await pool.query(
          "SELECT * FROM Product ORDER BY ProductID DESC LIMIT 15"
        );
        return result;
      } else if (type === "Rẻ Nhất") {
        const result = await pool.query(
          "SELECT * FROM Product ORDER BY Price ASC LIMIT 15"
        );
        return result;
      } else if (type === "Đắt Nhất") {
        const result = await pool.query(
          "SELECT * FROM Product ORDER BY Price DESC LIMIT 15"
        );
        return result;
      } else if (type === "Bán Chạy Nhất") {
        const result = await pool.query(
          "SELECT * FROM Product ORDER BY SoldQuantity DESC LIMIT 15"
        );
        return result;
      }
    } else if (option === "Đồ Ăn") {
      if (type === "Mới Nhất") {
        const result = await pool.query(
          "SELECT * FROM Product Where Category ='Đồ Ăn' ORDER BY ProductID DESC LIMIT 15"
        );
        return result;
      } else if (type === "Rẻ Nhất") {
        const result = await pool.query(
          "SELECT * FROM Product Where Category ='Đồ Ăn' ORDER BY Price ASC LIMIT 15"
        );
        return result;
      } else if (type === "Đắt Nhất") {
        const result = await pool.query(
          "SELECT * FROM Product Where Category ='Đồ Ăn' ORDER BY Price DESC LIMIT 15"
        );
        return result;
      } else if (type === "Bán Chạy Nhất") {
        const result = await pool.query(
          "SELECT * FROM Product Where Category ='Đồ Ăn' ORDER BY SoldQuantity DESC LIMIT 15"
        );
        return result;
      }
    } else if (option === "Đồ Ăn Chay") {
      if (type === "Mới Nhất") {
        const result = await pool.query(
          "SELECT * FROM Product Where Category ='Đồ Ăn Chay' ORDER BY ProductID DESC LIMIT 15"
        );
        return result;
      } else if (type === "Rẻ Nhất") {
        const result = await pool.query(
          "SELECT * FROM Product Where Category ='Đồ Ăn Chay' ORDER BY Price ASC LIMIT 15"
        );
        return result;
      } else if (type === "Đắt Nhất") {
        const result = await pool.query(
          "SELECT * FROM Product Where Category ='Đồ Ăn Chay' ORDER BY Price DESC LIMIT 15"
        );
        return result;
      } else if (type === "Bán Chạy Nhất") {
        const result = await pool.query(
          "SELECT * FROM Product Where Category ='Đồ Ăn Chay' ORDER BY SoldQuantity DESC LIMIT 15"
        );
        return result;
      }
    } else if (option === "Đồ Uống") {
      if (type === "Mới Nhất") {
        const result = await pool.query(
          "SELECT * FROM Product Where Category ='Đồ Uống' ORDER BY ProductID DESC LIMIT 15"
        );
        return result;
      } else if (type === "Rẻ Nhất") {
        const result = await pool.query(
          "SELECT * FROM Product Where Category ='Đồ Uống' ORDER BY Price ASC LIMIT 15"
        );
        return result;
      } else if (type === "Đắt Nhất") {
        const result = await pool.query(
          "SELECT * FROM Product Where Category ='Đồ Uống' ORDER BY Price DESC LIMIT 15"
        );
        return result;
      } else if (type === "Bán Chạy Nhất") {
        const result = await pool.query(
          "SELECT * FROM Product Where Category ='Đồ Uống' ORDER BY SoldQuantity DESC LIMIT 15"
        );
        return result;
      }
    }else if (option === "Đồ Tươi Sống") {
      if (type === "Mới Nhất") {
        const result = await pool.query(
          "SELECT * FROM Product Where Category ='Đồ Tươi Sống' ORDER BY ProductID DESC LIMIT 15"
        );
        return result;
      } else if (type === "Rẻ Nhất") {
        const result = await pool.query(
          "SELECT * FROM Product Where Category ='Đồ Tươi Sống' ORDER BY Price ASC LIMIT 15"
        );
        return result;
      } else if (type === "Đắt Nhất") {
        const result = await pool.query(
          "SELECT * FROM Product Where Category ='Đồ Tươi Sống' ORDER BY Price DESC LIMIT 15"
        );
        return result;
      } else if (type === "Bán Chạy Nhất") {
        const result = await pool.query(
          "SELECT * FROM Product Where Category ='Đồ Tươi Sống' ORDER BY SoldQuantity DESC LIMIT 15"
        );
        return result;
      }
    }
  },

  getAllProducts: async (option) => {
    if (option === "Tất Cả") {
      const result = await pool.query("SELECT * FROM Product ORDER BY RAND()");
      return result;
    } else if (option === "Đồ Ăn") {
      const result = await pool.query("SELECT * FROM Product  Where Category ='Đồ Ăn' ORDER BY RAND()");
      return result;
    } else if (option === "Đồ Ăn Chay") {
      const result = await pool.query("SELECT * FROM Product  Where Category ='Đồ Ăn Chay' ORDER BY RAND()");
      return result;
    } else if (option === "Đồ Uống") {
      const result = await pool.query("SELECT * FROM Product  Where Category ='Đồ Uống' ORDER BY RAND()");
      return result;
    }else if(option === "Đồ Tươi Sống"){
      const result = await pool.query("SELECT * FROM Product  Where Category ='Đồ Tươi Sống' ORDER BY RAND()");
      return result;
    }
  },

  getAllCategory: async () => {
    const result = await pool.query("SELECT DISTINCT Category FROM Product");
    return result;
  },

  getProductForCart: async (ProductID) => {
    const result = await pool.query(
      "SELECT * FROM Product WHERE ProductID = ?",
      [ProductID]
    );
    return result[0];
  },
  searchProduct: async (categoryName, pageIndex, keyword) => {
    const pageSize = 12;
    const offset = (pageIndex - 1) * pageSize;

    let whereClause = "";
    let params = [];

    if (categoryName) {
        whereClause = " WHERE Category = ?";
        params.push(categoryName);
    }

    if (keyword) {
        if (whereClause) {
            whereClause += " AND";
        } else {
            whereClause = " WHERE";
        }
        whereClause += " (Category LIKE ? OR ProductName LIKE ?)";
        params.push(`%${keyword}%`, `%${keyword}%`);
    }

    const queryDocs = `
        SELECT * FROM Product
        ${whereClause}
        LIMIT ? OFFSET ?;
    `;

    const queryCount = `
        SELECT COUNT(*) AS total FROM Product
        ${whereClause};
    `;

    params.push(pageSize, offset);

    const [docs, countResult] = await Promise.all([
        pool.query(queryDocs, params),
        pool.query(queryCount, params.slice(0, params.length - 2)) 
    ]);

    return {
        docs: docs, 
        counts: countResult[0][0].total 
    };
}



};
module.exports = Products;
