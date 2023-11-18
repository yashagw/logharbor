package server

import (
	"github.com/gin-gonic/gin"
	"github.com/segmentio/kafka-go"
	"github.com/yashagw/logingestor/internal/config"
)

type Server struct {
	config      config.Config
	router      *gin.Engine
	kafkaWriter *kafka.Writer
}

func NewServer(config config.Config, kafkaWriter *kafka.Writer) (*Server, error) {
	server := &Server{
		config:      config,
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
