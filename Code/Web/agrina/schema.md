# Database Schema for AGRina

This document outlines the Supabase database schema required to support the AGRina application features (Dashboard, History, Settings, Export, Auth).

## Tables

### 1. profiles

Extends the default Supabase `auth.users` table. Stores user identity and role information.

| Column       | Data Type                  | Constraints                   | Description                                        |
| :----------- | :------------------------- | :---------------------------- | :------------------------------------------------- |
| `id`         | `uuid`                     | **PK**, FK -> `auth.users.id` | Unique user identifier. Matches Supabase Auth ID.  |
| `full_name`  | `text`                     |                               | User's display name, e.g., "System Administrator". |
| `email`      | `text`                     | **Unique**                    | User's contact email.                              |
| `company`    | `text`                     |                               | Organization or Farm name.                         |
| `role`       | `text`                     | Default: 'user'               | Access level (e.g., 'admin', 'viewer').            |
| `avatar_url` | `text`                     |                               | URL to profile image/avatar.                       |
| `updated_at` | `timestamp with time zone` |                               | Timestamp of last profile update.                  |

### 2. devices

Registry of physical hardware units (ESP32/Arduino implementations).

| Column                    | Data Type                  | Constraints                          | Description                                                     |
| :------------------------ | :------------------------- | :----------------------------------- | :-------------------------------------------------------------- |
| `id`                      | `uuid`                     | **PK**, Default: `gen_random_uuid()` | Unique internal device ID.                                      |
| `serial_number`           | `text`                     | **Unique**, Not Null                 | Hardware serial number (e.g., 'AGRina-001').                    |
| `name`                    | `text`                     | Not Null                             | User-friendly nickname for the device.                          |
| `status`                  | `text`                     | Default: 'offline'                   | Current connection status ('online', 'offline', 'maintenance'). |
| `firmware_version`        | `text`                     |                                      | Installed firmware version (e.g., 'v2.1.3').                    |
| `last_seen`               | `timestamp with time zone` |                                      | Timestamp of the last successful heartbeat/packet.              |
| `update_interval_seconds` | `integer`                  | Default: 30                          | Configured reporting frequency in seconds.                      |
| `temperature_unit`        | `text`                     | Default: 'celsius'                   | Presentation preference ('celsius', 'fahrenheit').              |
| `auto_sync`               | `boolean`                  | Default: true                        | Flag to enable/disable automatic cloud syncing.                 |
| `created_at`              | `timestamp with time zone` | Default: `now()`                     | Date of device registration.                                    |

### 3. sensor_readings

High-frequency time-series data captured by the devices.

| Column           | Data Type                  | Constraints                  | Description                                         |
| :--------------- | :------------------------- | :--------------------------- | :-------------------------------------------------- |
| `id`             | `bigint`                   | **PK**, Identity             | Unique ID for the reading record.                   |
| `device_id`      | `uuid`                     | FK -> `devices.id`, Not Null | Reference to the source device.                     |
| `deployment_id`  | `uuid`                     | FK -> `deployments.id`       | Optional link to specific deployment period.        |
| `ph`             | `decimal(4,2)`             |                              | Soil pH level (0.00 - 14.00).                       |
| `temperature`    | `decimal(5,2)`             |                              | Soil/Ambient temperature.                           |
| `nitrogen`       | `decimal(6,2)`             |                              | Nitrogen level (mg/kg).                             |
| `phosphorus`     | `decimal(6,2)`             |                              | Phosphorus level (mg/kg).                           |
| `potassium`      | `decimal(6,2)`             |                              | Potassium level (mg/kg).                            |
| `signal_quality` | `integer`                  |                              | WiFi/LoRa signal strength (RSSI or %) if available. |
| `recorded_at`    | `timestamp with time zone` | Default: `now()`             | The actual timestamp when the data was sensed.      |

### 4. deployments

Tracks historical usage of devices in specific locations (fields).

| Column          | Data Type                  | Constraints                          | Description                                          |
| :-------------- | :------------------------- | :----------------------------------- | :--------------------------------------------------- |
| `id`            | `uuid`                     | **PK**, Default: `gen_random_uuid()` | Unique deployment record ID.                         |
| `device_id`     | `uuid`                     | FK -> `devices.id`, Not Null         | The device being deployed.                           |
| `location_name` | `text`                     | Not Null                             | Name of the field or location (e.g., "Field A").     |
| `lot_owner`     | `text`                     |                                      | Name of the farmer or lot owner.                     |
| `crop_type`     | `text`                     |                                      | Crop variety (e.g., "Rice - RC222").                 |
| `coordinates`   | `point`                    |                                      | Optional GPS coordinates of the deployment site.     |
| `start_date`    | `timestamp with time zone` | Default: `now()`                     | When the deployment began.                           |
| `end_date`      | `timestamp with time zone` | Nullable                             | When the deployment ended (NULL if active).          |
| `notes`         | `text`                     |                                      | Optional observations or notes about the crop cycle. |

### 5. alerts

System logs for critical conditions and warnings.

| Column       | Data Type                  | Constraints                          | Description                                     |
| :----------- | :------------------------- | :----------------------------------- | :---------------------------------------------- |
| `id`         | `uuid`                     | **PK**, Default: `gen_random_uuid()` | Unique alert ID.                                |
| `device_id`  | `uuid`                     | FK -> `devices.id`                   | The device that triggered the alert.            |
| `type`       | `text`                     | Not Null                             | Severity level ('critical', 'warning', 'info'). |
| `message`    | `text`                     | Not Null                             | Human-readable alert description.               |
| `is_read`    | `boolean`                  | Default: false                       | Whether the user has acknowledged the alert.    |
| `created_at` | `timestamp with time zone` | Default: `now()`                     | When the alert was generated.                   |

### 6. user_preferences

Stores application-wide settings per user (from the Settings page).

| Column                | Data Type | Constraints                 | Description                                      |
| :-------------------- | :-------- | :-------------------------- | :----------------------------------------------- |
| `user_id`             | `uuid`    | **PK**, FK -> `profiles.id` | Linked user account.                             |
| `alerts_enabled`      | `boolean` | Default: true               | Master toggle for receiving alerts.              |
| `email_notifications` | `boolean` | Default: true               | Toggle for email delivery of alerts.             |
| `data_retention_days` | `integer` | Default: 365                | Policy for how long to keep data visible/stored. |
| `timezone`            | `text`    | Default: 'Asia/Manila'      | User's preferred timezone for display.           |

### 7. export_logs

Audit trail of data files generated via the Export page.

| Column             | Data Type                  | Constraints                          | Description                                                     |
| :----------------- | :------------------------- | :----------------------------------- | :-------------------------------------------------------------- |
| `id`               | `uuid`                     | **PK**, Default: `gen_random_uuid()` | Unique export log ID.                                           |
| `user_id`          | `uuid`                     | FK -> `profiles.id`                  | User who requested the export.                                  |
| `format`           | `text`                     |                                      | Format used ('csv', 'json', 'pdf', 'excel').                    |
| `resource_type`    | `text`                     |                                      | Data scope ('sensors', 'devices', 'comprehensive').             |
| `configuration`    | `jsonb`                    |                                      | JSON object storing report title, notes, and selected sections. |
| `date_range_start` | `timestamp with time zone` |                                      | Filter start date applied to the export.                        |
| `date_range_end`   | `timestamp with time zone` |                                      | Filter end date applied to the export.                          |
| `created_at`       | `timestamp with time zone` | Default: `now()`                     | When the export was performed.                                  |
