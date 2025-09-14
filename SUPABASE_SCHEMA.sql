# Supabase Schema

# Table: services_data
# Stores service information and pricing
CREATE TABLE services_data (
  id SERIAL PRIMARY KEY,
  -- Service data will be stored as JSON
  data JSONB
);

# Table: space_photos
# Stores photos of the venue space
CREATE TABLE space_photos (
  id TEXT PRIMARY KEY,
  name TEXT,
  data TEXT,
  uploadDate TEXT
);

# Table: streaming_config
# Stores streaming configuration
CREATE TABLE streaming_config (
  id SERIAL PRIMARY KEY,
  channelId TEXT,
  status TEXT,
  lastUpdated TEXT
);

# Table: featured_videos
# Stores featured videos
CREATE TABLE featured_videos (
  id TEXT PRIMARY KEY,
  url TEXT,
  videoId TEXT,
  title TEXT,
  addedDate TEXT
);