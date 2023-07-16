import {Client, Contact} from "whatsapp-web.js";

export class Extractor {

    public client: Client;
    constructor(client: Client) {
        this.client = client;
    }

    public async getMessagesByContact(contact: Contact, limit?: number) {

        const chat = await contact.getChat();

        const messages = await chat.fetchMessages({ limit: limit || 10000 });

        return messages
            .map(m => ({
                from: m.from,
                body: m.body === "" ? "image message" : m.body,
                timestamp: new Date(m.timestamp * 1000).toLocaleString("pt-br").replace(",", "-").replace(" ", "").trim()
            }));
    }



}

