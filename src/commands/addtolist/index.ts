import {Client, Message} from "whatsapp-web.js";
import { db } from "../../database"

/*
template

!addtolist
title
artist
release
description

*/

export function main(msg: Message, client: Client, payload: string[]) {

    const [
        title,
        artist,
        release,
        description,
        cover
    ] = payload

    console.log(payload);


    if (!title || !artist || !release || !description) {
        client.sendMessage(
            msg.from,
            "all fields required"
        )
    }


    db.run(
        `INSERT INTO albums (title, artist, release, description)
              VALUES ('${title}', '${artist}', '${release}', '${description}')`,
        (e) => {
            if (e) {
                console.log(e)
                client.sendMessage(
                    msg.from,
                    "error ocurred"
                )
            } else {
                client.sendMessage(
                    msg.from,
                    "album added successfully"
                )
            }


        }
    )

}