CREATE TABLE IF NOT EXISTS project_metrics (
  project_id TEXT PRIMARY KEY,
  users INTEGER NOT NULL DEFAULT 0,
  accesses INTEGER NOT NULL DEFAULT 0,
  requests INTEGER NOT NULL DEFAULT 0,
  interested INTEGER NOT NULL DEFAULT 0,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS project_interest_votes (
  project_id TEXT NOT NULL,
  visitor_hash TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY(project_id, visitor_hash)
);

CREATE INDEX IF NOT EXISTS idx_project_interest_votes_project
ON project_interest_votes(project_id);
