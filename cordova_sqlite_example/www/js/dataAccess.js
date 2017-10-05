"use strict"; 

class DataAccess
{
      
    constructor(db)
    {
        this._db = db;
        this.getConnection();
    }

    getConnection()
    {
        this._db = window.sqlitePlugin.openDatabase({name: 'demo.db', location: 'default'});
    }
}

class PatientDA extends DataAccess
{
     constructor(db)
     {
         super(db);
         this.initialize();
     }

     initialize()
        {
           this._db.transaction(function(tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Patients (name, score)');
                //tx.executeSql('INSERT INTO Patients VALUES (?,?)', ['Alice', 101]);
                //tx.executeSql('INSERT INTO Patients VALUES (?,?)', ['Betty', 202]);
            }, function(error) {
                console.log('Transaction ERROR: ' + error.message);
            }, function() {
                console.log('Populated database OK');
            });
        }
        getPatients()
        {
            this._db.transaction(function(tx) {
                tx.executeSql('SELECT count(*) AS mycount FROM Patients', [], function(tx, rs) {
                console.log('Record count (expected to be 2): ' + rs.rows.item(0).mycount);
                }, function(tx, error) {
                console.log('SELECT error: ' + error.message);
                });
            });
        }
}