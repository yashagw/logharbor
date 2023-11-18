DB_URL=postgresql://root:secret@localhost:5443/logingestor_db?sslmode=disable

postgres: 
	docker run --name postgres -p 5443:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres:16-alpine

createdb:
	docker exec -it postgres createdb --username=root --owner=root logingestor_db

dropdb:
	docker exec -it postgres dropdb logingestor_db

migrateup:
	migrate -path internal/db/migration -database "$(DB_URL)" -verbose up

migrateup1:
	migrate -path internal/db/migration -database "$(DB_URL)" -verbose up 1

migratedown:
	migrate -path internal/db/migration -database "$(DB_URL)" -verbose down

migratedown1:
	migrate -path internal/db/migration -database "$(DB_URL)" -verbose down 1

mock:
	mockgen -package mockdb -destination internal/db/mock/mockdb.go github.com/yashagw/logingestor/internal/db Provider

server:
	go run cmd/api/main.go

