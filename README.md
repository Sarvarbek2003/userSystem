## userSystem

* path '/' => users (object) Metoth GET

* path '/send' => user send file (formdata) Metoth POST content type formdata  object = { file, from_userid, to_userid, caption }

* path '/register' =>  user regiser (object) Metoth POST content type application/json = object = { username, password }

* path '/auth' =>  user regiser (object) Metoth POST content type application/json = object = { username, password }

## WEBSOCKET

* front end emit qiladi "user:get"  data = { userId } // backendga userid keladi userid orqali user_socket_id ni databasedan update qiladi 

* backend emit qiladi io.emit = "new message" data = { file path } //frontendga file manzili boradi --> /data/files/filename.txt


