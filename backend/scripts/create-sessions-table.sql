-- Create sessions table for PostgreSQL session storage
-- This table will be automatically created by connect-pg-simple, but you can run this manually if needed

CREATE TABLE IF NOT EXISTS sessions (
  sid VARCHAR NOT NULL COLLATE "default",
  sess JSON NOT NULL,
  expire TIMESTAMP(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE sessions ADD CONSTRAINT sessions_pkey PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Create index on expire column for better performance
CREATE INDEX IF NOT EXISTS IDX_sessions_expire ON sessions(expire);

-- Grant permissions (adjust as needed for your setup)
-- GRANT ALL PRIVILEGES ON TABLE sessions TO your_user;
-- GRANT ALL PRIVILEGES ON SEQUENCE sessions_sid_seq TO your_user;

-- Optional: Add comments
COMMENT ON TABLE sessions IS 'Session storage for express-session with connect-pg-simple';
COMMENT ON COLUMN sessions.sid IS 'Session ID';
COMMENT ON COLUMN sessions.sess IS 'Session data (JSON)';
COMMENT ON COLUMN sessions.expire IS 'Session expiration timestamp'; 