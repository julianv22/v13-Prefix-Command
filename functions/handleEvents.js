module.exports = (client) => {
    client.handleEvents = async (eventFiles) => {
        // Events Handle
        console.log('Loading Events:');
        const eventArray = [];
        for (const file of eventFiles) {
            const event = require(`../events/${file}`);
            if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
            else client.on(event.name, (...args) => event.execute(...args, client,));
            eventArray.push(event.name);
        }
        console.log(eventArray);
    }
}