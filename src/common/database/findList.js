const { getTotalCount } = require("../utils/totalCount")
const connection = require("./index")


// 查询
async function findList(tableName, size = 10, offset = 0) {
  try {
    const sql = `select * from ${tableName} LIMIT ? OFFSET ?;`
    const [list] = await connection.query(sql, [size, offset])
    const totalCount = await getTotalCount(tableName)
    return { list, totalCount }
  } catch (error) {
    console.log(error)
  }
}
async function findListHaveBody(tableName, size = 10, offset = 0, body) {

  const { name, realname, cellphone, enable, createAt } = body
  const { leader, parentId } = body
  const { intro } = body
  const { address } = body
  try {
    let whereClauses = [];
    let values = [];

    if (name) {
      whereClauses.push('LOWER(name) LIKE ?');
      values.push(`%${name.toLowerCase()}%`);
    } else {
      whereClauses.push('1=1');
    }

    if (realname) {
      whereClauses.push('LOWER(realname) LIKE ?');
      values.push(`%${realname.toLowerCase()}%`);
    } else {
      whereClauses.push('1=1');
    }

    if (cellphone) {
      whereClauses.push('LOWER(cellphone) LIKE ?');
      values.push(`%${cellphone.toLowerCase()}%`);
    } else {
      whereClauses.push('1=1');
    }

    if (enable?.toString()) {
      whereClauses.push('enable = ?');
      values.push(enable);
    } else {
      whereClauses.push('1=1');
    }

    if (createAt && createAt.length === 2) {
      whereClauses.push('createAt BETWEEN ? AND ?');
      values.push(createAt[0], createAt[1]);
    } else {
      whereClauses.push('1=1');
    }
    //////////
    if (leader) {
      whereClauses.push('LOWER(leader) LIKE ?');
      values.push(`%${leader.toLowerCase()}%`);
    } else {
      whereClauses.push('1=1');
    }

    if (parentId) {
      whereClauses.push('parentId = ?');
      values.push(parentId);
    } else {
      whereClauses.push('1=1');
    }
    ///////////
    if (intro) {
      whereClauses.push('LOWER(intro) LIKE ?');
      values.push(`%${intro.toLowerCase()}%`);
    } else {
      whereClauses.push('1=1');
    }

    ////
    if (address) {
      whereClauses.push('LOWER(address) LIKE ?');
      values.push(`%${address.toLowerCase()}%`);
    } else {
      whereClauses.push('1=1');
    }

    const whereClause = whereClauses.join(' AND ');

    const query = `
      SELECT *
      FROM ${tableName}
      WHERE ${whereClause}
      ORDER BY name
      LIMIT ? OFFSET ?;
    `;
    values.push(size, offset);

    const [list] = await connection.query(query, values);
    return { list, totalCount: list.length };
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  findList, findListHaveBody
}