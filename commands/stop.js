function stop(msg) {

    vc = msg.member.voice.channel;

    if (!vc) {
        return msg.reply("You are not on a channel!");
    }

    vc.join().then(connection => {

        connection.disconnect();

    }).catch(console.error);

}

module.exports = {
    name: process.env.PREFIX + 'stop',
    description: 'Stop music',
    execute(msg, args) {
        stop(msg);
    }
}