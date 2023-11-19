package pgsql

import (
	"context"
	"fmt"
	"strings"

	"github.com/yashagw/logingestor/internal/db/model"
)

func (provider *Provider) InsertLogEntry(ctx context.Context, logentry *model.LogEntry) error {
	logentry.Level = strings.ToLower(logentry.Level)

	var id int
	err := provider.conn.QueryRowContext(ctx, `
		INSERT INTO logs (level, message, resourceId, timestamp, traceId, spanId, commit, parentResourceId)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
	`, logentry.Level, logentry.Message, logentry.ResourceID, logentry.Timestamp, logentry.TraceID, logentry.SpanID, logentry.Commit, logentry.Metadata.ParentResourceID).Scan(&id)
	fmt.Println("inserted logentry with id", id)
	return err
}

func (provider *Provider) SearchLogEntries(ctx context.Context, params *model.SearchLogEntriesParams) ([]model.LogEntryResult, error) {
	var logentries []model.LogEntryResult

	filters := []string{}
	args := []interface{}{}

	if len(params.Levels) > 0 {
		var placeholders []string
		for _, level := range params.Levels {
			level = strings.ToLower(level)
			placeholders = append(placeholders, fmt.Sprintf("$%d", len(args)+1))
			args = append(args, level)
		}

		filters = append(filters, fmt.Sprintf("level IN (%s)", strings.Join(placeholders, ",")))
	}

	if params.ResourceID != "" {
		filters = append(filters, fmt.Sprintf("resourceId = $%d", len(args)+1))
		args = append(args, params.ResourceID)
	}

	if params.TraceID != "" {
		filters = append(filters, fmt.Sprintf("traceId = $%d", len(args)+1))
		args = append(args, params.TraceID)
	}

	if params.Commit != "" {
		filters = append(filters, fmt.Sprintf("commit = $%d", len(args)+1))
		args = append(args, params.Commit)
	}

	if params.SpanID != "" {
		filters = append(filters, fmt.Sprintf("spanId = $%d", len(args)+1))
		args = append(args, params.SpanID)
	}

	if params.ParentResourceID != "" {
		filters = append(filters, fmt.Sprintf("parentResourceId = $%d", len(args)+1))
		args = append(args, params.ParentResourceID)
	}

	if params.Message != "" {
		words := strings.Split(params.Message, " ")
		d := strings.Join(words, " & ")

		filters = append(filters, fmt.Sprintf("ts @@ to_tsquery('english', '%s')", d))
	}

	where := ""
	if len(filters) > 0 {
		where = "WHERE " + strings.Join(filters, " AND ")
	}

	query := `
    SELECT level, message, resourceId, timestamp, traceId, spanId, commit, parentResourceId
    FROM logs
    ` + where + `
	`

	fmt.Println(query)
	fmt.Println(args)

	rows, err := provider.conn.QueryContext(ctx, query, args...)

	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var logentry model.LogEntryResult
		err = rows.Scan(&logentry.Level, &logentry.Message, &logentry.ResourceID, &logentry.Timestamp, &logentry.TraceID, &logentry.SpanID, &logentry.Commit, &logentry.ParentResourceID)
		if err != nil {
			return nil, err
		}
		logentries = append(logentries, logentry)
	}

	if len(logentries) == 0 {
		return []model.LogEntryResult{}, nil
	}

	return logentries, nil
}
