
import { cacheLife } from "next/cache";
import db from "./db";

// Define the structure of an equipment record.
export interface Equipment {
  id: number;
  name: string;
  category: string;
  total_quantity: number | null;
}

// Retrieve active equipment and cache the result.
export async function getActiveEquipment(): Promise<Equipment[]> {
  "use cache";

  // Revalidate cached equipment data every hour.
  cacheLife("hours");

  const equipment = db
    .prepare(
      `SELECT id, name, category, total_quantity
       FROM equipment
       WHERE is_active = 1
       ORDER BY name ASC`
    )
    .all() as Equipment[];

  return equipment;
}
