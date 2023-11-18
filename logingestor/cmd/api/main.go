package main

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"

	"github.com/golang-migrate/migrate/v4"

	"github.com/segmentio/kafka-go"
	"github.com/yashagw/logingestor/internal/config"
	"github.com/yashagw/logingestor/internal/db"
	"github.com/yashagw/logingestor/internal/server"
)

func runDBMigration(migrationURL string, dbURL string) {
	migration, err := migrate.New(migrationURL, dbURL)
	if err != nil {
		log.Fatal("cannot create new migration instance:", err)
	}

	if err = migration.Up(); err != nil && err != migrate.ErrNoChange {
		log.Fatal("failed to run migrate up:", err)
	}

	log.Println("db migration successful")
}

func main() {
	config, err := config.LoadConfig(".")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}

	kafkaURL := os.Getenv("KAFKA_URL")
	kafkaWriter := &kafka.Writer{
		Addr:                   kafka.TCP(kafkaURL),
		Topic:                  config.KAFKA_LOGS_TOPIC,
		AllowAutoTopicCreation: true,
	}

	conn, err := sql.Open(config.DBDriver, config.DBSource)
	if err != nil {
		log.Fatal("cannot connect to db:", err)
	}
	defer conn.Close()

	runDBMigration(config.MIGRATION_URL, config.DBSource)

	provider, err := db.New(conn)
	if err != nil {
		log.Fatal("cannot create db provider:", err)
	}
	defer provider.Close()

	server, err := server.NewServer(config, provider, kafkaWriter)
	if err != nil {
		log.Fatal("cannot create server:", err)
	}

	err = server.Start(config.HttpServerAddress)
	if err != nil {
		log.Fatal("cannot start server:", err)
	}
}
