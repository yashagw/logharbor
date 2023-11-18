ALTER TABLE logs ADD COLUMN ts tsvector
    GENERATED ALWAYS AS (to_tsvector('english', message)) STORED;

CREATE INDEX ts_idx ON logs USING GIN (ts);

CREATE INDEX level_idx ON logs (level);
CREATE INDEX resourceid_idx ON logs (resourceId);
CREATE INDEX traceid_idx ON logs (traceId);
CREATE INDEX spanid_idx ON logs (spanId);
CREATE INDEX commit_idx ON logs (commit);
CREATE INDEX parentresourceid_idx ON logs (parentResourceId);