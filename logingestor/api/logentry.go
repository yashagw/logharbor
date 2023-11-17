package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/yashagw/logingestor/db/model"
)

func (server *Server) InsertLogEntry(context *gin.Context) {
	var logEntry model.LogEntry
	err := context.BindJSON(&logEntry)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	arg := model.CreateLogEntryRequest{
		LogEntry: &logEntry,
	}
	err = server.provider.InsertLogEntry(context, arg)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, logEntry)
}
