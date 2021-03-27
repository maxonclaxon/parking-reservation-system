const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('database.sqlite3');

for(let i=0;i<3;i++){
    for(let j=0; j<10; j++){
        db.run('INSERT INTO Space Values(null,?,?)',[i,1],(err)=>{
            console.log('Place '+(i+1*j+1)+' added')
        })
    }
}

