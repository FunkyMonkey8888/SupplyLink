// package com.edutech.progressive.config;


// import java.io.IOException;
// import java.io.InputStream;
// import java.sql.Connection;
// import java.sql.DriverManager;
// import java.sql.SQLException;
// import java.util.Properties;

// import org.springframework.stereotype.Repository;

// @Repository
// public class DatabaseConnectionManager {
//     private static final Properties properties = new Properties();

//     static {
//         loadProperties();
//         // Optionally load driver class if needed by older drivers
//         String driver = properties.getProperty("db.driver");
//         if (driver != null && !driver.isBlank()) {
//             try { Class.forName(driver); } 
//             catch (ClassNotFoundException e) { throw new RuntimeException("JDBC Driver not found: " + driver, e); }
//         }
//     }

//     private static void loadProperties() {
//         try (InputStream in = DatabaseConnectionManager.class
//                 .getClassLoader().getResourceAsStream("application.properties")) {
//             if (in == null) {
//                 throw new RuntimeException("application.properties not found in classpath");
//             }
//             properties.load(in);
//         } catch (IOException e) {
//             throw new RuntimeException("Failed to load application.properties", e);
//         }
//     }

//     public static Connection getConnection() throws SQLException {
//         String url = properties.getProperty("db.url");
//         String user = properties.getProperty("db.username");
//         String pass = properties.getProperty("db.password");
//         if (url == null || user == null) {
//             throw new RuntimeException("Database properties missing (db.url, db.username, db.password)");
//         }
//         return DriverManager.getConnection(url, user, pass);
//     }
// }


package com.edutech.progressive.config;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

/**
 * DatabaseConnectionManager
 *
 * Responsibilities:
 *  - Hold DB configuration in a static Properties object.
 *  - loadProperties(): Read application.properties from the classpath (preferred) or working directory.
 *  - getConnection(): Build and return a JDBC Connection using db.* keys.
 *
 * Behavior required by tests:
 *  - If any of db.url, db.username, db.password is missing, throw:
 *      new RuntimeException("Database properties missing (db.url, db.username, db.password)")
 */
public final class DatabaseConnectionManager {

    private static final Properties PROPS = new Properties();
    private static volatile boolean loaded = false;

    private DatabaseConnectionManager() {
        // utility class
    }

    /**
     * Load application.properties from classpath (src/main/resources) or working directory.
     * Throws RuntimeException if not found or unreadable.
     */
    public static synchronized void loadProperties() {
        if (loaded) return;

        // 1) Try classpath
        try (InputStream in = DatabaseConnectionManager.class
                .getClassLoader()
                .getResourceAsStream("application.properties")) {
            if (in != null) {
                PROPS.load(in);
                loaded = true;
                return;
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to read application.properties from classpath", e);
        }

        // 2) Fallback: working directory
        try (InputStream in = new FileInputStream("application.properties")) {
            PROPS.load(in);
            loaded = true;
        } catch (IOException e) {
            throw new RuntimeException("application.properties not found or unreadable in working directory", e);
        }
    }

    /**
     * Returns a new JDBC Connection using db.* properties.
     * Falls back to spring.datasource.* only if db.* are not set.
     *
     * @return Connection (caller must close)
     * @throws RuntimeException if required properties are missing, or if the driver cannot be loaded
     * @throws SQLException if the DriverManager fails to establish a connection
     */
    public static Connection getConnection() throws SQLException {
        if (!loaded) {
            loadProperties();
        }

        // Prefer db.* keys as required by tests
        String url  = trimOrNull(PROPS.getProperty("db.url"));
        String user = trimOrNull(PROPS.getProperty("db.username"));
        String pass = PROPS.getProperty("db.password"); // null means missing; empty string allowed

        // If db.* are missing, try Spring Boot datasource keys as a convenience fallback
        if (isBlank(url)) {
            url = trimOrNull(PROPS.getProperty("spring.datasource.url"));
        }
        if (isBlank(user)) {
            user = trimOrNull(PROPS.getProperty("spring.datasource.username"));
        }
        if (pass == null) {
            pass = PROPS.getProperty("spring.datasource.password");
        }

        // Enforce required properties (match test's exact message)
        if (isBlank(url) || isBlank(user) || pass == null) {
            throw new RuntimeException("Database properties missing (db.url, db.username, db.password)");
        }

        // Optionally load JDBC driver if provided (db.driver preferred; fallback to Spring key)
        String driver = trimOrNull(PROPS.getProperty("db.driver"));
        if (isBlank(driver)) {
            driver = trimOrNull(PROPS.getProperty("spring.datasource.driver-class-name"));
        }
        if (!isBlank(driver)) {
            try {
                Class.forName(driver);
            } catch (ClassNotFoundException e) {
                throw new RuntimeException("JDBC Driver not found: " + driver, e);
            }
        }

        // Create and return the connection
        return DriverManager.getConnection(url, user, pass);
    }

    // --- helpers ---

    private static boolean isBlank(String s) {
        return s == null || s.trim().isEmpty();
    }

    private static String trimOrNull(String s) {
        return s == null ? null : s.trim();
    }

    /**
     * Package-private utility for tests to force reload.
     * Use it only in test code if you change properties between runs.
     */
    static void reloadForTests() {
        synchronized (DatabaseConnectionManager.class) {
            loaded = false;
            PROPS.clear();
        }
    }
}