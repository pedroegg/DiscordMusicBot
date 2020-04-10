const ytdl = require('ytdl-core');

function playAudio(msg, videoId) {

    vc = msg.member.voice.channel;

    if (!vc) {
        return msg.reply("You are not on a channel!");
    }

    vc.join().then(connection => {

        stream = ytdl("https://www.youtube.com/watch?v=" + videoId, {
            filter: 'audioonly'
        });

        dispatcher = connection.play(stream);

    }).catch(console.error);
}

module.exports = {
    name: process.env.PREFIX + 'play',
    description: 'Play music from Youtube',
    execute(msg, args) {

        let url = msg.content.replace(this.name, '');

        if (!ytdl.validateURL(url)) {
            console.log('PESQUISAR YT');
        }

        let videoId = ytdl.getURLVideoID(url);

        playAudio(msg, videoId);
    }
}
