const pool = require("../config/Database");
const { getOrderDetailByCusID } = require("../services/OrderService");
const Orders = {
  getAllOrders: async () => {
    const result = await pool.query("select * from Orders");
    return result;
  },
  getOrderByCusId: async (cusID) => {
    const result = await pool.query(
      "select * from Orders where CustomerID = ?",
      [cusID]
    );
    return result[0];
  },

  getOrderByOrderDetailID: async (OrderDetailID) => {
    const result = await pool.query(
      "select OrderID from OrderDetail where OrderDetailID = ?",
      [OrderDetailID[0]]
    );
    return result[0];
  },

  getOrderByOrderID: async (OrderID) => {
    const result = await pool.query("select * from Orders where OrderID = ?", [
      OrderID,
    ]);
    return result[0];
  },

  addOrder: async (address, cusID, totalPayment, OrderInfor, voucher) => {
    console.log(address);
    console.log(voucher[voucher.length - 1]);
    const voucherAllID = voucher[voucher.length - 1].voucher
      ? voucher[voucher.length - 1].voucher.VoucherID
      : null;
    const voucherAllDis = voucher[voucher.length - 1].voucher
      ? voucher[voucher.length - 1].Discount
      : 0;
    const addressT = `${address.houseAddress} ${address.area}`;

    // Lấy thời gian hiện tại và định dạng theo mẫu "HH:MM:SS dd/mm/yyyy"

    // Hòa thêm vào, KO Xóa nhé
    const now = new Date();
    const formattedDate = now
      .toLocaleString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(",", "");

    const result = await pool.query(
      "insert into Orders(CustomerID,TotalAmount,VoucherID,discount,address) values(?,?,?,?,?)",
      [cusID, totalPayment, voucherAllID, voucherAllDis, addressT]
    );
    let query = "insert into OrderDetail values";
    let values = OrderInfor.map((item, index) => {
      const voucherID = voucher[index].voucher
        ? voucher[index].voucher.VoucherID
        : null;
      return `(null, ${result[0].insertId}, ${item.productID},${item.Quantity},${voucherID},null,'${formattedDate}',${item.distance},"Vận chuyển",${voucher[index].Discount},${item.feeShip}, 'unread')`;
    });
    query += values.join(",");
    await pool.query(query);
    return result[0].insertId;
  },
  addOrderPrepay: async (address, cusID, totalPayment, OrderInfor, voucher) => {
    const voucherAllID = voucher[voucher.length - 1].voucher
      ? voucher[voucher.length - 1].voucher.VoucherID
      : null;
    const voucherAllDis = voucher[voucher.length - 1].voucher
      ? voucher[voucher.length - 1].Discount
      : 0;
    const addressT = `${address.houseAddress} ${address.area}`;
    const result = await pool.query(
      "insert into Orders(CustomerID,TotalAmount,VoucherID,discount,address) values(?,?,?,?,?)",
      [cusID, totalPayment, voucherAllID, voucherAllDis, addressT]
    );
    let query = "insert into OrderDetail values";
    let values = OrderInfor.map((item, index) => {
      const voucherID = voucher[index].voucher
        ? voucher[index].voucher.VoucherID
        : null;
      return `(null, ${result[0].insertId}, ${item.productID},${item.Quantity},${voucherID},null,null,${item.distance},'Chờ thanh toán',${voucher[index].Discount},${item.feeShip}, 'unread')`;
    });
    query += values.join(",");
    const result1 = await pool.query(query);
    const OrderDetailID = Array.from(
      { length: result1[0].affectedRows },
      (_, i) => result1[0].insertId + i
    );
    const result2 = {
      OrderDetailID,
      OrderID: result[0].insertId,
    };
    return result2;
  },
  getOrderDetailByCusID: async (cusID) => {
    const result = await pool.query(
      "select ProductID,Quantity,Status,VoucherID,discount,ShipperID,OrderID,OrderDetailID from OrderDetail where OrderID in (select OrderID from Orders where CustomerID = ?)",
      [cusID]
    );
    return result[0];
  },
  getOrderDetailByOrderID: async (OrderID) => {
    const result = await pool.query(
      "select ProductID,Quantity,Status,VoucherID,discount,ShipperID,OrderID from OrderDetail where OrderID = ?",
      [OrderID]
    );
    return result[0];
  },
  changeStatusShip: async (OrderDetailID) => {
    if (!Array.isArray(OrderDetailID)) {
      throw new Error("OrderDetailID phải là một mảng");
    }

    console.log("OrderDetailID: ", OrderDetailID);
    let query =
      'update OrderDetail set status = "Vận chuyển" where OrderDetailID in (';
    let values = OrderDetailID.map((item, index) => {
      return item;
    });
    query += values.join(",");
    query += ")";
    await pool.query(query);
  },
};
module.exports = Orders;
