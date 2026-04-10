function createCommands(client) {
  function sendMessage(target, message) {
    client.sendRaw(`PRIVMSG ${target} :${message}`);
  }

  function joinChannel(channel) {
    client.sendRaw(`JOIN ${channel}`);
  }

  function messageBancho(message) {
    // client.sendMessage('')
  }
  return {
    sendMessage,
    joinChannel,
    messageBancho,
  };
}

module.exports = createCommands;
