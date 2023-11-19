package server

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/segmentio/kafka-go"
	"github.com/yashagw/logingestor/internal/config"
	"github.com/yashagw/logingestor/internal/db"
)

type Server struct {
	config      config.Config
	router      *gin.Engine
	kafkaWriter *kafka.Writer
	provider    db.Provider
}

func NewServer(config config.Config, provider db.Provider, kafkaWriter *kafka.Writer) (*Server, error) {
	server := &Server{
		config:      config,
		kafkaWriter: kafkaWriter,
		provider:    provider,
	}
	server.setupRouter()
	return server, nil
}

func (s *Server) setupRouter() {
	s.router = gin.Default()
	s.router.Use(cors.Default())

	s.router.POST("/", s.InsertLogEntry)
	s.router.POST("/search", s.SearchLogEntries)
}

func (server *Server) Start(address string) error {
	return server.router.Run(address)
}
