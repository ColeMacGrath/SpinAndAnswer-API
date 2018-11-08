const mysql = require('mysql');

class Database {
  /**
   * Creates a new connection with some parameters
   */
    constructor() {
      this.connection = mysql.createConnection({
          host: process.env.DB_LOCAL_HOST,
          user: process.env.DB_LOCAL_USER,
          password: process.env.DB_LOCAL_PASS,
          database: process.env.DB_LOCA_NAME,
          socketPath: process.env.SOCKET_PATH,
      });

        this.connection.connect((error) => {
            if (error) {
                console.error('Imposible to connect', error.stack);
                throw error;
            }
        });
    }

    /**
     * Get every record of a table
     * @param   String    table new of a table to be queried
     * @return  resolve   return every result
     */
    select(quantity, table, conditional) {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT ${quantity} FROM ${table} ${conditional}`, (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    }

    /**
     * Inserts a element into the database
     * @param   String  table    Name of table to be updated
     * @param   Array            resource elements to be added
     * @return  Resolve          return results of query
     */
    insert(table, resource) {
        return new Promise((resolve, reject) => {
          this.connection.query('INSERT INTO ?? SET ?', [table, resource], (error, results) => {
            if (error) return reject(error);
            return resolve(results);
          });
        });
    }


    /**
     * Updates elements into a table
     * @param   String   table    Name of table to be updated
     * @param   Integer  id       ID of element to be modfied
     * @param   Resolve           resource Data of element
     */
    update(table, conditional) {
        return new Promise((resolve, reject) => {
            this.connection.query(`UPDATE ${table} SET ${conditional}`, (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    }

    callProcedure(query) {
      return new Promise((resolve, reject) => {
        this.connection.query(`CALL ${query}`, (error, results) => {
          if (error) return reject(error)
          return resolve(results);
        });
      });
    }

    /**
     * disconnects of database
     * @return  connection  description
     */
    disconnect() {
        this.connection.end();
    }

    /**
     * Destroy connection of database
     * @return  connection  description
     */
    destroy() {
        this.connection.destroy();
    }
}

module.exports = new Database();
