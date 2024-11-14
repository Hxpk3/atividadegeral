import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

export async function createPool() {
  const connection = await mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT 
  });

  return {
    query: async (sql, params) => {
      try {
        return await connection.execute(sql, params);
      } catch (error) {
        console.error('Erro na consulta:', error);
        throw error;
      }
    },
    close: async () => {
      await connection.end();
    }
  };
}