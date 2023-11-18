package server

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/segmentio/kafka-go"
	"github.com/yashagw/logingestor/internal/db/model"
)

func (server *Server) InsertLogEntry(context *gin.Context) {
	// TODO: validate input, take care of empty fields
	// TODO: write a test to make sure that only expected fields are getting added
	var logEntry model.LogEntry
	err := context.BindJSON(&logEntry)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	go func(logEntry model.LogEntry) {
		logEntryBytes, err := json.Marshal(logEntry)
		if err != nil {
			log.Println("error marshalling log entry", err)
			return
		}

		server.kafkaWriter.WriteMessages(context, kafka.Message{
			Key:   []byte("log"),
			Value: logEntryBytes,
		})
	}(logEntry)

	context.JSON(http.StatusOK, gin.H{"message": "log entry added"})
}
