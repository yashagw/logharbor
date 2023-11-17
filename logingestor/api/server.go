package api

import (
	"github.com/gin-gonic/gin"
	"github.com/yashagw/logingestor/db"
	"github.com/yashagw/logingestor/util"
)

type Server struct {
	config   util.Config
	provider db.Provider
	router   *gin.Engine
}

func NewServer(provider db.Provider, config util.Config) (*Server, error) {
	server := &Server{
		config:   config,
		provider: provider,
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
