import { Client, Message } from "whatsapp-web.js";
import { db } from "../../database";
import { Album } from "../../database/models/album";

/*

template

!deletefromlist
id

*/

export function main(msg: Message, client: Client, payload: string[]) {

    if (!payload[0]) {
        client.sendMessage(
            msg.from,
            "must send album id"
        )
        return;
    }

    if (isNaN(+payload[0])) {
        client.sendMessage(
            msg.from,
            "invalid id"
        )
        return;
    }

    db.all(`
        DELETE FROM albums WHERE album_id = ${payload[0]}
    `, (err, rows: Album[]) => {
        if (err) {
            client.sendMessage(
                msg.from,
                "err fetching list"
            )
        } else {
            client.sendMessage(
                msg.from,
                "album deleted successully"
            )
        }

    })

}