package server

import (
	"github.com/gin-gonic/gin"
	"github.com/segmentio/kafka-go"
	"github.com/yashagw/logingestor/internal/config"
	"github.com/yashagw/logingestor/internal/db"
)

type Server struct {
	config      config.Config
	provider    db.Provider
	router      *gin.Engine
	kafkaWriter *kafka.Writer
}

func NewServer(provider db.Provider, config config.Config, kafkaWriter *kafka.Writer) (*Server, error) {
	server := &Server{
		config:      config,
		provider:    provider,
		kafkaWriter: kafkaWriter,
	}
	server.setupRouter()
	return server, nil
}

func (s *Server) setupRouter() {
	s.router = gin.Default()

	s.router.POST("/", s.InsertLogEntry)
}

func (server *Server) Start(address string) error {
	return server.router.Run(address)
}
