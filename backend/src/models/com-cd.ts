import { Request } from "express";
import * as db from "../util/database";
import mysql from "mysql2/promise";
import { tyrCatchModelHandler } from "../middleware/try-catch";
import { ComCd, DetailComCd } from "../interface/com-cd";

let conn: mysql.PoolConnection;

export const getComCd = tyrCatchModelHandler(
  async (_: Request, comId: string, value: string) => {
    const sql = `SELECT COM_ID FROM comcd WHERE COM_ID = '${comId}' AND VALUE = '${value}' AND DELETED_AT IS NULL`;

    conn = await db.getConnection();
    const [rows] = await conn.query(sql);
    // return rows[0];
    return rows;
  },
  "getComCd",
  conn!
);

export const getMainComCd = tyrCatchModelHandler(
  async (req: Request) => {
    let currentPage: number = 1;
    let perPage: number = 15;

    if (req.query.page && typeof req.query.page === "number")
      currentPage = req.query.page;
    if (req.query.perPage && typeof req.query.perPage === "number")
      perPage = req.query.perPage;

    const sql =
      ` SELECT` +
      `     COM_ID` +
      `   , NAME` +
      `   , GET_DATE_FORMAT(CREATED_AT) AS CREATED_AT` +
      `   , GET_USER_NAME(CREATED_USER) AS CREATED_USER` +
      `   , GET_DATE_FORMAT(UPDATED_AT) AS UPDATED_AT` +
      `   , GET_USER_NAME(UPDATED_USER) AS UPDATED_USER` +
      `   FROM comcd` +
      `  WHERE VALUE = '0'` +
      `    AND DELETED_AT IS NULL` +
      `  ORDER BY COM_ID` +
      `  LIMIT ${(currentPage - 1) * perPage}, ${perPage}`;

    conn = await db.getConnection();
    const [rows] = await conn.query(sql);
    // return rows[0];
    return rows;
  },
  "getMainComCd",
  conn!
);

export const getDetailComCd = tyrCatchModelHandler(
  async (req: Request) => {
    const comId = req.params.comId;
    let currentPage: number = 1;
    let perPage: number = 15;

    if (req.query.page && typeof req.query.page === "number")
      currentPage = req.query.page;
    if (req.query.perPage && typeof req.query.perPage === "number")
      perPage = req.query.perPage;

    const sql =
      ` SELECT` +
      `     VALUE AS COM_ID` +
      `   , NAME` +
      `   , GET_DATE_FORMAT(CREATED_AT) AS CREATED_AT` +
      `   , GET_USER_NAME(CREATED_USER) AS CREATED_USER` +
      `   , GET_DATE_FORMAT(UPDATED_AT) AS UPDATED_AT` +
      `   , GET_USER_NAME(UPDATED_USER) AS UPDATED_USER` +
      `   , USE_FLAG` +
      `   FROM comcd` +
      `  WHERE COM_ID = '${comId}'` +
      `    AND VALUE != '0'` +
      `    AND DELETED_AT IS NULL` +
      `  ORDER BY SORT` +
      `  LIMIT ${(currentPage - 1) * perPage}, ${perPage}`;

    conn = await db.getConnection();
    const [rows] = await conn.query(sql);
    // return rows[0];
    return rows;
  },
  "getDetailComCd",
  conn!
);

export const createdComCd = tyrCatchModelHandler(
  async (req: Request) => {
    const aryComCd: Array<DetailComCd> = req.body.comCd;
    const adminUserId = req.session.user!.USER_ID;

    try {
      conn = await db.getConnection();
      await conn.beginTransaction();

      aryComCd.forEach(async (com) => {
        const comId = com.comId;
        const value = com.value || "0";
        const name = com.name;
        const useFlag = com.useFlag || "Y";
        const sort = com.sort;

        let sql =
          `INSERT INTO comcd` +
          `(` +
          `   COM_ID` +
          ` , VALUE` +
          ` , NAME` +
          ` , CREATED_USER` +
          ` , USE_FLAG` +
          ` , SORT` +
          `)` +
          `VALUES` +
          `(` +
          `   '${comId}'` +
          ` , '${value}'` +
          ` , '${name}'` +
          ` , '${adminUserId}'` +
          ` , '${useFlag}'` +
          ` ,  ${sort}` +
          `)` +
          `ON DUPLICATE KEY UPDATE` +
          `   NAME         = '${name}'` +
          ` , UPDATED_AT   =  now()` +
          ` , UPDATED_USER = '${adminUserId}'` +
          ` , USE_FLAG     = '${useFlag}'` +
          ` , SORT         =  ${sort}`;

        if (value !== "0") sql += ` , VALUE = '${value}'`;

        await conn.query(sql);
      });

      await conn.commit();
      return aryComCd.length;
    } catch (error) {
      if (conn) {
        conn.rollback();
      }
      console.log(error);
      throw error;
    }
  },
  "createdComCd",
  conn!
);

export const deletedComCd = tyrCatchModelHandler(
  async (req: Request) => {
    const aryComCd: Array<ComCd> = req.body.comCd;
    const adminUserId = req.session.user!.USER_ID;

    try {
      conn = await db.getConnection();
      await conn.beginTransaction();

      aryComCd.forEach(async (com) => {
        const comId = com.comId;

        let sql =
          `UPDATE comcd ` +
          `   SET DELETED_AT   = now()` +
          `     , DELETED_USER = '${adminUserId}'` +
          ` WHERE COM_ID = '${comId}'`;

        await conn.query(sql);
      });

      await conn.commit();
      return;
    } catch (error) {
      if (conn) {
        conn.rollback();
      }
      console.log(error);
      throw error;
    }
  },
  "deletedComCd",
  conn!
);

export const deletedDetailComCd = tyrCatchModelHandler(
  async (req: Request) => {
    const aryComCd: Array<ComCd> = req.body.comCd;
    const adminUserId = req.session.user!.USER_ID;

    try {
      conn = await db.getConnection();
      await conn.beginTransaction();

      aryComCd.forEach(async (com) => {
        const comId = com.comId;
        const value = com.value;

        let sql =
          `UPDATE comcd ` +
          `   SET DELETED_AT   = now()` +
          `     , DELETED_USER = '${adminUserId}'` +
          ` WHERE COM_ID = '${comId}'` +
          `   AND VALUE  = '${value}'`;

        await conn.query(sql);
      });

      await conn.commit();
      return;
    } catch (error) {
      if (conn) {
        conn.rollback();
      }
      console.log(error);
      throw error;
    }
  },
  "deletedDetailComCd",
  conn!
);