var DAO =
{

    db: null,

    getConnection: function(){
        this.db = window.sqlitePlugin.openDatabase({name: 'demo.db', location: 'default'});
        alert("Connection Established");
    },

    patientDAO: function()
    {
      
    }
};
