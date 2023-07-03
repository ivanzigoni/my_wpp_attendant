import {Client, Contact, Message, PrivateContact} from "whatsapp-web.js";
import fs from "fs";
import * as path from "path";
import {db} from "../../database";

export async function main(msg: Message, client: Client, payload: string[]) {

    const number = "5524981702474"

    const contacts = await client.getContacts()

    console.log(msg.from, " msg from")

    console.log(await client.getWWebVersion(), " wpp version")

    const cInstance = contacts.find(ctt => ctt.id["_serialized"].includes(number))

    console.log("cinstance ", cInstance);

    if (cInstance) {
        await cInstance.block();
        console.log("is blocked ", cInstance.isBlocked);
    }

    // console.log(cInstance);
}