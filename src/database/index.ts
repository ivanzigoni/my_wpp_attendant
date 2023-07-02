import {  Database } from "sqlite3";
import * as path from "path";

export const db = new Database(path.resolve(process.cwd(), "assets", "database", "database.sqlite"));

function createTable() {
    db.run(`
        CREATE TABLE IF NOT EXISTS albums (
            album_id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            artist TEXT NOT NULL,
            release TEXT NOT NULL,
            cover TEXT,
            description TEXT
        );
    `);
}

function seedTable() {
    db.run(`
        
        INSERT INTO albums (title, artist, release, cover, description)
        VALUES ("Yasuke", "Flying Lotus", "2021", "https://i.discogs.com/eYP9bWON5JguL3f6tPGBQI_8ze5EMyvYkKXFtIZMNXI/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE4NTE0/NTU1LTE2MTk3MDk5/MTUtMjA0NC5qcGVn.jpeg", "Electronic, Hip Hop, Jazz, Stage & Screen"),
        ("Na Amazônia", "Banda Calypso", "2005", "https://i.discogs.com/jZVTp-Z3L4xaWz0HoFz97A8IDNwFuCrOrGxn7hmHP2s/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExMjg2/ODI2LTE2MzE1ODk2/OTctNTQzMC5qcGVn.jpeg", "Brasileira, Calypso, maneiro"),
        ("III", "BBNG", "2014", "https://i.discogs.com/wRUY9qFoh7rua12ypFDpbMoc7TQtpREdvPyxfxmiEpg/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU2NDY5/MjktMTYzNTIwMjQz/OC05Nzk1LmpwZWc.jpeg", "BBNG no comments required");
    `);
}

function seed() {
    db.serialize(() => {

        createTable();

        seedTable();

        // db.close();

    })
}

// seed()


