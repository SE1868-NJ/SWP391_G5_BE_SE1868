const pool = require("../config/Database");

const LoyaltyModel = {
    getCustomerById: async (customerId) => {
        const [rows] = await pool.query(
            `SELECT CustomerID, FirstName, LastName, Email 
             FROM G5_Customer.Customer WHERE CustomerID = ?`,
            [customerId]
        );
        return rows[0] || null;
    },

    getOrderStatsByCustomerId: async (customerId) => {
        const [rows] = await pool.query(
            `SELECT COUNT(*) AS totalOrders, 
                    COALESCE(SUM(TotalAmount), 0) AS totalSpent 
             FROM G5_Customer.Orders WHERE CustomerID = ?`,
            [customerId]
        );
        return rows[0] || { totalOrders: 0, totalSpent: 0 };
    },

    getRewardsByTier: async (tier) => {
        const [rows] = await pool.query(
            `SELECT reward_name, description, icon FROM LoyaltyRewards WHERE tier = ?`,
            [tier]
        );
        return rows;
    }
};

module.exports = LoyaltyModel;
