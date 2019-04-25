var oracledb = require('oracledb');

oracledb.getConnection(
    {
      user          : "hr",
      password      : "oracle",
      connectString : "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=192.168.1.61)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=orcl)))"
    },
    function(err, connection) {
      if (err) {
        console.error(err.message);
        return;
      }
      connection.execute(
        `SELECT manager_id, department_id, department_name
         FROM departments
         WHERE manager_id = :id`,
        [103],  // bind value for :id
        function(err, result) {
          if (err) {
            console.error(err.message);
            doRelease(connection);
            return;
          }
          //console.log(result.rows);
          result.rows.forEach(row =>{
            console.log(row);
          });
          doRelease(connection);
        });
    });
  
  function doRelease(connection) {
    connection.close(
      function(err) {
        if (err)
          console.error(err.message);
      });
  }