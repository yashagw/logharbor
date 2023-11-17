package db

import (
	"database/sql"

	"github.com/yashagw/logingestor/db/pgsql"
)

type Provider interface {
	DBQuerier

	DB() *sql.DB
	Tx() *sql.Tx
	Close() error
}

func New(db *sql.DB) (Provider, error) {
	return pgsql.NewProvider(db)
}
