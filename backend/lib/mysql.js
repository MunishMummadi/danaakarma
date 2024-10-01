const mysql = require('mysql');
require('dotenv').config();


const poolConfig = {
  host: process.env.HOST,
  user: process.env.ROOT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10
};

const pool = mysql.createPool(poolConfig);


const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (err, results) => {
      if (err) {
        console.error('数据库查询错误:', err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};


const dbOperations = {
  allFundraiser: (filters = {}) => {
    let sql = `
    SELECT F.*, C.NAME AS CATEGORY_NAME 
    FROM FUNDRAISER F
    LEFT JOIN CATEGORY C ON F.CATEGORY_ID = C.CATEGORY_ID
    WHERE 1=1
  `;
    const values = [];

    if (filters.organizer && filters.organizer.trim() !== '') {
      sql += ' AND F.ORGANIZER LIKE ?';
      values.push(`%${filters.organizer}%`);
    }

    if (filters.city && filters.city.trim() !== '') {
      sql += ' AND F.CITY LIKE ?';
      values.push(`%${filters.city}%`);
    }

    if (filters.category) {
      sql += ' AND F.CATEGORY_ID = ?';
      values.push(filters.category);
    }

    if (filters.active !== undefined) {
      sql += ' AND F.ACTIVE = ?';
      values.push(filters.active);
    }

    return query(sql, values);
  },

  findFundraiserById: (fundraiserId) => {
    const sql = `
      SELECT F.*, C.NAME AS CATEGORY_NAME 
      FROM FUNDRAISER F
      LEFT JOIN CATEGORY C ON F.CATEGORY_ID = C.CATEGORY_ID
      WHERE F.FUNDRAISER_ID = ?
    `;
    return query(sql, [fundraiserId]);
  },

  allCategories: () => query('SELECT * FROM CATEGORY'),

  findFundraisersByCategory: (categoryId) => {
    const sql = `
      SELECT F.*, C.NAME AS CATEGORY_NAME 
      FROM FUNDRAISER F
      LEFT JOIN CATEGORY C ON F.CATEGORY_ID = C.CATEGORY_ID
      WHERE F.CATEGORY_ID = ?
    `;
    return query(sql, [categoryId]);
  }
};

module.exports = dbOperations;
