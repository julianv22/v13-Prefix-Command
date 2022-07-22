module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('-----------------Client is loging-----------------')
        console.log(`|       ${client.user.tag} has logged on     |`)
        console.log('-----------------Client is ready!-----------------')        
    }
}