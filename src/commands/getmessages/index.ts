import {Client, Contact, Message, PrivateContact} from "whatsapp-web.js";
import {Extractor} from "../../extractor/Extractor";
import numberExtractor from "../../utils/number-extractor";
import fs from "fs";
import * as path from "path";


/*

getmessages
target number (+55 31 99740-6632)
limit (optional)
*/

function writeToCsv(msgs: { from: string, body: string, timestamp: string }[], ctt: Contact) {

    const st = fs.createWriteStream(
        path.resolve(
            process.cwd(), "assets", "messages", `${ctt.id._serialized}.csv`
        )
    )

    st.write("from,body,timestamp")

    for (let i = 0; i < msgs.length; i++) {
        st.write(`${msgs[i].from},${msgs[i].body},${msgs[i].timestamp}\n`)
    }

    st.close()

}

export async function main(msg: Message, client: Client, payload: string[]) {
    const [targetNumber, limit] = payload;

    if (!targetNumber) {
        return;
    }

    const ctts = await client.getContacts();

    const ctt = ctts  // numero [+55 31 99740-6632] bate com serialized_id          nao é group
        .find((c) => c.id._serialized.includes(numberExtractor(targetNumber)) && c.id.user.split("-").length === 1)

    if (ctt) {

        const extractor = new Extractor(client);

        const messages = await extractor.getMessagesByContact(ctt, Number(limit));

        writeToCsv(messages, ctt);

    } else {

        client.sendMessage(msg.from, "contact not found");

    }


}