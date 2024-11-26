<<<<<<< HEAD
## 環境構築ガイド資料

1. docker の起動
   docker compose up -d (docker-compose のあるフォルダ直下)

2. アプリケーションの起動
   mvnw.cmd spring-boot:run 　(mvnw のあるフォルダ直下)

curl コマンド
curl http://localhost:8080/api/tasks

curl -X DELETE http://localhost:8080/api/tasks/1

curl -X POST http://localhost:8080/api/tasks -H "Content-Type: application/json" -d "{\"title\": \"New Task\", \"description\": \"This is a new task\", \"completed\": false}"

curl -X PUT http://localhost:8080/api/tasks/1 -H "Content-Type: application/json" -d '{"title":"Updated Task","description":"Learn more about HTTP methods","completed":true}'
=======
# task-manager
標準的なタスク管理できる。練習のため特筆することはなし。
>>>>>>> a95c47c389dec50b8662464ce3465b63a16a1bb7
