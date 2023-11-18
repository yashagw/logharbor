package main

import (
	"log"
	"os"

	"github.com/segmentio/kafka-go"
	"github.com/yashagw/logingestor/internal/config"
	"github.com/yashagw/logingestor/internal/server"
)

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

	server, err := server.NewServer(config, kafkaWriter)
	if err != nil {
		log.Fatal("cannot create server:", err)
	}

	err = server.Start(config.HttpServerAddress)
	if err != nil {
		log.Fatal("cannot start server:", err)
	}
}
