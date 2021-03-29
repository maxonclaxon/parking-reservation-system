const sqlite3 = require('sqlite3')
var db = new sqlite3.Database('database.sqlite3')

for(var floor = 0; floor<4; floor+=1){
    for(var place=0;place<20;place+=1){
        db.run('INSERT INTO Space VALUES(null,?,?)',[floor+1,2])
    }
}