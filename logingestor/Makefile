DB_URL=postgresql://root:secret@localhost:5443/logingestor_db?sslmode=disable

postgres: 
	docker run --name postgres --network log-ingestor-network -p 5443:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres:16-alpine

createdb:
	docker exec -it postgres createdb --username=root --owner=root logingestor_db

dropdb:
	docker exec -it postgres dropdb logingestor_db

migrateup:
	migrate -path db/migration -database "$(DB_URL)" -verbose up

migrateup1:
	migrate -path db/migration -database "$(DB_URL)" -verbose up 1

migratedown:
	migrate -path db/migration -database "$(DB_URL)" -verbose down

migratedown1:
	migrate -path db/migration -database "$(DB_URL)" -verbose down 1

mock:
	mockgen -package mockdb -destination db/mock/mockdb.go github.com/yashagw/logingestor/db Provider

server:
	go run main.go

