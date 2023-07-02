import {Client, Contact, Message} from "whatsapp-web.js";
import fs from "fs";

export async function main(msg: Message, client: Client, payload: string[]) {

    const contacts = [
        "5531997406632",
        "553184407416",
        "5524981702474"
    ]

    const ctt = await client.getContacts()

    ctt.forEach(ct => {

        for (const contact of contacts) {
            if (ct.id._serialized.includes(contact)) {
                client.sendMessage(
                    ct.id._serialized,
                    "teste batata"
                )
            }
        }

    })

}