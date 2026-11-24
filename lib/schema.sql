
-- TABLE 1: EQUIPMENT
-- Stores the equipment available for loans.

CREATE TABLE IF NOT EXISTS equipment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    total_quantity INTEGER CHECK (
        total_quantity IS NULL OR total_quantity >= 0
    ),
    is_active INTEGER NOT NULL DEFAULT 1
        CHECK (is_active IN (0, 1)),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- TABLE 2: LOAN REQUESTS
-- Stores equipment loan requests.

CREATE TABLE IF NOT EXISTS loan_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tracking_code TEXT NOT NULL UNIQUE,
    requester_name TEXT NOT NULL,
    department TEXT NOT NULL,
    equipment_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1
        CHECK (quantity > 0),
    purpose TEXT NOT NULL,
    needed_from TEXT NOT NULL,
    needed_until TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending'
        CHECK (status IN (
            'Pending',
            'Approved',
            'Denied',
            'Picked Up',
            'Returned',
            'Overdue'
        )),
    decision_reason TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (equipment_id)
        REFERENCES equipment(id),

    CHECK (needed_until >= needed_from)
);

CREATE INDEX IF NOT EXISTS idx_loan_requests_tracking_code
ON loan_requests(tracking_code);

CREATE INDEX IF NOT EXISTS idx_loan_requests_equipment_dates
ON loan_requests(equipment_id, needed_from, needed_until);

-- TABLE 3: USERS
-- Stores staff login accounts and roles.

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL
        CHECK (role IN ('Coordinator', 'Depot Staff')),
    is_active INTEGER NOT NULL DEFAULT 1
        CHECK (is_active IN (0, 1)),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- TABLE 4: LOAN EVENTS
-- Records equipment pickup and return.

CREATE TABLE IF NOT EXISTS loan_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    loan_request_id INTEGER NOT NULL,
    staff_user_id INTEGER NOT NULL,
    event_type TEXT NOT NULL
        CHECK (event_type IN ('Pickup', 'Return')),
    event_time TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,

    FOREIGN KEY (loan_request_id)
        REFERENCES loan_requests(id),

    FOREIGN KEY (staff_user_id)
        REFERENCES users(id)
);

-- TABLE 5: APP SETTINGS
-- Controls application-level settings.

CREATE TABLE IF NOT EXISTS app_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    setting_key TEXT NOT NULL UNIQUE,
    is_enabled INTEGER NOT NULL DEFAULT 1
        CHECK (is_enabled IN (0, 1)),
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- TABLE 6: REQUEST STATUS HISTORY
-- Tracks changes to loan request statuses.

CREATE TABLE IF NOT EXISTS request_status_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    loan_request_id INTEGER NOT NULL,
    previous_status TEXT,
    new_status TEXT NOT NULL,
    changed_by INTEGER,
    reason TEXT,
    changed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (loan_request_id)
        REFERENCES loan_requests(id),

    FOREIGN KEY (changed_by)
        REFERENCES users(id)
);
