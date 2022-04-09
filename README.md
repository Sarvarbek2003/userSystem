## userSystem

* path ['/'](https://github.com/Sarvarbek2003/userSystem/edit/main/README.md) => users (object) Metoth GET

* path ['/send'](https://github.com/Sarvarbek2003/userSystem/edit/main/README.md) => user send file (formdata) Metoth POST content type formdata  object = { file, from_userid, to_userid, caption }

* path ['/register'](https://github.com/Sarvarbek2003/userSystem/edit/main/README.md) =>  user regiser (object) Metoth POST content type application/json = object = { username, password }

* path ['/auth'](https://github.com/Sarvarbek2003/userSystem/edit/main/README.md) =>  user regiser (object) Metoth POST content type application/json = object = { username, password }

## WEBSOCKET

* front end emit qiladi ["user:get"](https://github.com/Sarvarbek2003/userSystem/edit/main/README.md)  data = { userId } // backendga userid keladi userid orqali user_socket_id ni databasedan update qiladi 

* backend emit qiladi io.emit = ["new message"](https://github.com/Sarvarbek2003/userSystem/edit/main/README.md) data = { file path } //frontendga file manzili boradi --> /data/files/filename.txt


