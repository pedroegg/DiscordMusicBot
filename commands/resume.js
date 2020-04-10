function resume(msg) {

    vc = msg.member.voice.channel;

    if (!vc) {
        return msg.reply("You are not on a channel!");
    }

    vc.join().then(connection => {

        connection.dispatcher.resume();

    }).catch(console.error);

}

module.exports = {
    name: process.env.PREFIX + 'resume',
    description: 'Resume music',
    execute(msg, args) {
        resume(msg);
    }
}