package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"time"

	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"

	"github.com/golang-migrate/migrate/v4"
	"github.com/segmentio/kafka-go"
	"github.com/yashagw/logingestor/internal/config"
	"github.com/yashagw/logingestor/internal/db"
	"github.com/yashagw/logingestor/internal/db/model"
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
	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers:        []string{kafkaURL},
		Topic:          config.KAFKA_LOGS_TOPIC,
		MaxBytes:       10e6, // 10MB
		GroupID:        "group-0",
		CommitInterval: time.Second,
	})
	defer r.Close()

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

	var result model.LogEntry
	for {
		m, err := r.ReadMessage(context.Background())
		if err != nil {
			log.Fatal("failed to read message:", err)
			break
		}

		if err = json.Unmarshal(m.Value, &result); err != nil {
			log.Fatal("failed to unmarshal message:", err)
			break
		}
		provider.InsertLogEntry(context.Background(), &result)
		fmt.Println(result)
	}
}
