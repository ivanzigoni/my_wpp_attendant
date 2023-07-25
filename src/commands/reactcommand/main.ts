import {Client, Message} from "whatsapp-web.js";
import {sleep} from "../../utils/sleep";

export async function main(msg: Message, client: Client, payload: string[]) {

    /*
    * payload:
    * target number
    *
    * */

    const [targetNumber] = payload;

    if (!targetNumber) {
        return;
    }

    const chats = await client.getChats();

    let targetChat;

    for (const chat of chats) {

        const ctt = await chat.getContact();
        if (ctt.id._serialized.includes(targetNumber)) {
            targetChat = chat;
            break;
        }

    }


    const msgs = await targetChat!.fetchMessages({ limit: 2 })

    while (true) {

        const emojiArr = ["👀", "😁", "🙏", "😍", "😎", "🤓", "👺", "👹"]

        await sleep(1800)

        await Promise.allSettled([
            ...msgs.map(msg => msg.react(emojiArr[Math.floor(Math.random() * (emojiArr.length+1))]))
        ])

    }



}