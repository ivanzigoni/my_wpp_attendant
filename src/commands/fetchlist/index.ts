import { Client, Message } from "whatsapp-web.js";
import { db } from "../../database";
import { Album } from "../../database/models/album";

export function main(msg: Message, client: Client) {

    db.all(`
        SELECT * FROM albums;
    `, (err, rows: Album[]) => {
        if (err) {
            client.sendMessage(
                msg.from,
                "err fetching list"
            )
        } else {
            client.sendMessage(
                msg.from,
                rows.reduce((acc, album) => {

                    const line =
                        `[${album.album_id}]${album.title}, ${album.artist}\n${album.release}\n${album.description}\n========\n`

                    acc += line

                    return acc;
                }, "")
            )
        }

    })

}