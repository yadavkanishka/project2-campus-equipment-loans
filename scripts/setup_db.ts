
import fs from "fs";
import path from "path";
import db from "../lib/db";
import { randomBytes, scryptSync } from "node:crypto";

// Generate a secure password hash using a random salt.
function hashPassword(password: string): string {
    const salt = randomBytes(16).toString("hex");
    const hash = scryptSync(password, salt, 64).toString("hex");

    return `scrypt:${salt}:${hash}`;
}
// Locate the SQL schema file.
const schemaPath = path.join(process.cwd(), "lib", "schema.sql");

// Read the SQL commands.
const schema = fs.readFileSync(schemaPath, "utf-8");

try {
    // Execute the SQL and create all six tables.
    db.exec(schema);

    // Enable the API endpoints by default.
    db.prepare(`
        INSERT INTO app_settings (setting_key, is_enabled)
        VALUES ('api_enabled', 1)
        ON CONFLICT(setting_key) DO NOTHING
    `).run();

    console.log("Application settings added successfully!");

    // Add starting equipment entries.
    const equipmentItems = [
        { name: "HDMI Projector", category: "Projector / AV Equipment" },
        { name: "Wireless Microphones", category: "Audio Equipment" },
        { name: "Tripod + DSLR Camera", category: "Camera Equipment" },
        { name: "Laptop Cart", category: "Computer Equipment" },
        { name: "Portable PA Speaker", category: "Audio Equipment" },
        { name: "Zoom Conference Kit", category: "Conference Equipment" },
        { name: "Whiteboard on Wheels", category: "Classroom Equipment" },
        { name: "Extension Cords", category: "Accessories" }
    ];

    // Prepare a statement to add equipment without creating duplicates.
    const insertEquipment = db.prepare(`
        INSERT INTO equipment (name, category, total_quantity)
        VALUES (?, ?, NULL)
        ON CONFLICT(name) DO NOTHING
    `);

    // Insert each equipment item.
    for (const item of equipmentItems) {
        insertEquipment.run(item.name, item.category);
    }

    console.log("Starting equipment entries added successfully!");

    // Create test accounts for the Coordinator and Depot Staff.
    const staffAccounts = [
        { username: "coordinator", role: "Coordinator" },
        { username: "depotstaff", role: "Depot Staff" }
    ] as const;

    const insertUser = db.prepare(`
        INSERT INTO users (username, password_hash, role)
        VALUES (?, ?, ?)
    `);

    for (const account of staffAccounts) {
        // Check whether this account already exists.
        const existingUser = db
            .prepare("SELECT id FROM users WHERE username = ?")
            .get(account.username);

        if (!existingUser) {
            // Generate a random development password.
            const temporaryPassword = randomBytes(12).toString("base64url");

            // Store only the password hash.
            insertUser.run(
                account.username,
                hashPassword(temporaryPassword),
                account.role
            );

            // Display the password once for development and testing.
            console.log(`Created ${account.role} account:`);
            console.log(`Username: ${account.username}`);
            console.log(`Temporary password: ${temporaryPassword}`);
        } else {
            console.log(`${account.username} account already exists.`);
        }
    }
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
