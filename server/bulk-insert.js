import { faker } from "@faker-js/faker";
import postgres from "postgres";
import fs from "fs";

/*
RUN COMMAND IN PSQL 
COPY youtubevideos (video_id, title, description, thumbnail_url, url, published_at, channel_id, channel_title, view_count, like_count, dislike_count) FROM '/Users/daltonandrews/Desktop/Code/youtubeclone_master/data.csv'  WITH DELIMITER ',' CSV;
*/

// const sql = postgres("postgres://localhost:5177/youtube");
const writableStream = fs.createWriteStream("data.csv");

// await sql`DELETE * FROM youtubevideos`;



for (let i = 0; i < 1_000_000; i++) {
    var videoid = faker.string.uuid();
    var title = faker.lorem.sentence();
    var description = faker.lorem.sentences();
    var thumbnail_url = faker.internet.url();
    var url = faker.lorem.words();
    var published_at = '2023-07-04T08:12:57.966Z';
    var channel_id = faker.lorem.words();
    var channel_title = faker.lorem.words();
    var view_count = faker.number.int({ min:0, max:1_000_000 });
    var like_count = faker.number.int({ min:0, max:1_000_000 });
    var dislike_count = faker.number.int({ min:1, max:1_000_000 });
    var insert = `${videoid},`;
    insert += `${title},`;
    insert += `${description},`;
    insert += `${thumbnail_url},`;
    insert += `${url},`;
    insert += `${published_at},`;
    insert += `${channel_id},`;
    insert += `${channel_title},`;
    insert += `${view_count},`;
    insert += `${like_count},`;
    insert += `${dislike_count}`;

    
    writableStream.write(`${insert}\n`);
}

writableStream.close();
// sql.end();
console.log('Done?')



/*
--     video_id VARCHAR(255) UNIQUE,
--     title TEXT,
--     description TEXT,
--     thumbnail_url VARCHAR(255),
--     url VARCHAR(255),
--     published_at TIMESTAMPTZ,
--     channel_id VARCHAR(255),
--     channel_title VARCHAR(255),
--     view_count BIGINT,
--     like_count BIGINT,
--     dislike_count BIGINT
*/
//To run faker use command in terminal,  node server/bulk-insert.js //

