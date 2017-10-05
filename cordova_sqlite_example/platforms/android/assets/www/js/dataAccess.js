var DAO =
{

 
    getConnection: function(){
        var db = window.sqlitePlugin.openDatabase({name: 'demo.db', location: 'default'});
        patientDAO.initialize(db);
        patientDAO.getPatients(db);
    }
};

var patientDAO = {
        initialize: function(db)
        {
           db.transaction(function(tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Patients (name, score)');
                //tx.executeSql('INSERT INTO Patients VALUES (?,?)', ['Alice', 101]);
                //tx.executeSql('INSERT INTO Patients VALUES (?,?)', ['Betty', 202]);
            }, function(error) {
                alert('Transaction ERROR: ' + error.message);
            }, function() {
                alert('Populated database OK');
            });
        },
        getPatients: function(db)
        {
            db.transaction(function(tx) {
                tx.executeSql('SELECT count(*) AS mycount FROM Patients', [], function(tx, rs) {
                alert('Record count (expected to be 2): ' + rs.rows.item(0).mycount);
                }, function(tx, error) {
                console.log('SELECT error: ' + error.message);
                });
            });
        }
    }
