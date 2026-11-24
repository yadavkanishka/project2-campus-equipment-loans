
import Database from "better-sqlite3";
import path from "path";

// Store the SQLite database inside the project's data folder.
const dbPath = path.join(process.cwd(), "data", "campus-equipment.db");

// Create a connection to the database.
const db = new Database(dbPath);

// Enable foreign key relationships.
db.pragma("foreign_keys = ON");

export default db;
