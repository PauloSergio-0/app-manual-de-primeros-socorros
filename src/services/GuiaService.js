import { db } from './SQLite';
import {guias_datas} from '../mocks/guia'

export function createTable() {
  const sql = `CREATE TABLE IF NOT EXISTS guias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    create_date TIMESTAMP);
    `;
    

  db.transaction((transaction) => {
    transaction.executeSql(sql);
  }, (error) => {
    console.log("error call back : " + JSON.stringify(error));
    console.log(error);
  }, () => {
    console.log("transaction complete call back ");
      });

      insert_data___db()
}
export function insert_data___db() {
  const query_count = "SELECT COUNT(*) as count FROM guias";

  db.transaction((transaction) => {
    // Contagem de registros
    transaction.executeSql(query_count, [], (txn, result) => {
      const qtd_items = result.rows.item(0).count; // Acessando a contagem do primeiro item do resultado

      if (qtd_items === 0) { // Se não houver itens, adicione os dados
        for (const i of guias_datas) {
          console.log(i);
          add_data_db(i);
        }
      }
    });
  }, (error) => {
    console.log("error call back : " + JSON.stringify(error));
    console.log(error);
  }, () => {
    console.log("transaction complete call back ");
  });
}

export async function add_data_db(guia) {
  
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("INSERT INTO guias (title, description, create_date) VALUES (?, ?,  datetime());", [guia.title, guia.description], () => {
        resolve("Tarefa adicionada com sucesso!");
      })
    }, (error) => {
      console.log("error call back : " + JSON.stringify(error));
      console.log(error);
    }, () => {
      console.log("transaction complete call back ");
    });
  })
}

export async function createGuia(guia) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("INSERT INTO guias (title, description, create_date) VALUES (?, ?,  datetime());", [guia.title, guia.description], () => {
        resolve("Tarefa adicionada com sucesso!");
      })
    }, (error) => {
      console.log("error call back : " + JSON.stringify(error));
      console.log(error);
    }, () => {
      console.log("transaction complete call back ");
    });
  })
}

export async function updateGuia(guia) {
  // console.log("testsssss")
  // console.log(guia)
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("UPDATE guias SET title = ?, description = ? WHERE id = ?;", [guia.title, guia.description, guia.id], () => {
        resolve("Tarefa atualizada com sucesso!");
      })
    }, (error) => {
      console.log("error call back : " + JSON.stringify(error));
      console.log(error);
    }, () => {
      console.log("transaction complete call back ");
    });
  })
}

export async function deleteGuia(guia) {
  console.log('guia recebida')
  console.log(guia.id)
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      console.log(guia.id)
      transaction.executeSql("DELETE FROM guias WHERE id = ?;", [guia.id], () => {
        resolve("Tarefa removida com sucesso!");
      })
    }, (error) => {
      console.log("error call back : " + JSON.stringify(error));
      console.log(error);
    }, () => {
      console.log("transaction complete call back ");
    });
  })
}

export async function listGuias() {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("SELECT * FROM guias ORDER BY create_date DESC;", [], (transaction, resultado) => {
        resolve(resultado.rows._array);
      })
    }, (error) => {
      console.log("error call back : " + JSON.stringify(error));
      console.log(error);
    }, () => {
      console.log("transaction complete call back ");
    });
  })
}