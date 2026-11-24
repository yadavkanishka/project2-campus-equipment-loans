
import fs from "fs";
import path from "path";
import db from "../lib/db";

// Locate the SQL schema file.
const schemaPath = path.join(process.cwd(), "lib", "schema.sql");

// Read the SQL commands.
const schema = fs.readFileSync(schemaPath, "utf-8");

try {
    // Execute the SQL and create all six tables.
    db.exec(schema);

    console.log("Database schema created successfully!");

    // Display the tables currently in the database.
    const tables = db
        .prepare(
            "SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name"
        )
        .all();

    console.log("Database tables:", tables);
} catch (error) {
    console.error("Database setup failed:", error);
    process.exitCode = 1;
} finally {
    db.close();
}
