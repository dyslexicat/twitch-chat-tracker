# twitch-chat-tracker
Sometimes I am in a situation where I cannot Shazam a song and want to see if someone in chat knows the song name but chat goes so fast there is no way to keep track.

This is why I made this Chrome extension.

## installation
1. clone the repo
2. visit `chrome://extensions` and turn __developer mode on__
3. click "load unpacked" and select the cloned folder

## how it works
You click the extension icon, enter a word to track then the extension does the rest for you.
At the moment, it just _console.logs_ chat messages if they contain the specified word.
In the future, I might implement functionality to see the messages in the popup page (or better yet you can implement it and do a pull request!)