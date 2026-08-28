CREATE TABLE IF NOT EXISTS traffic_presence (
  visitor_hash TEXT PRIMARY KEY,
  last_seen INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_traffic_presence_last_seen
ON traffic_presence(last_seen);

CREATE TABLE IF NOT EXISTS traffic_daily (
  day TEXT NOT NULL,
  visitor_hash TEXT NOT NULL,
  first_seen INTEGER NOT NULL,
  last_seen INTEGER NOT NULL,
  pageviews INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY(day, visitor_hash)
);

CREATE INDEX IF NOT EXISTS idx_traffic_daily_day
ON traffic_daily(day);

CREATE INDEX IF NOT EXISTS idx_traffic_daily_visitor
ON traffic_daily(visitor_hash);
