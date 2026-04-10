function parseIRCMessage(line) {
  const raw = line;
  let prefix = null;
  let command = null;
  let params = [];
  let trailing = null;

  // prefix
  if (line.startsWith(":")) {
    const firstSpace = line.indexOf(" ");
    prefix = line.slice(1, firstSpace);
    line = line.slice(firstSpace + 1);
  }

  // trailing
  const trailingIndex = line.indexOf(" :");
  if (trailingIndex !== -1) {
    trailing = line.slice(trailingIndex + 2);
    line = line.slice(0, trailingIndex);
  }

  // rest
  const parts = line.split(" ");
  command = parts[0];
  params = parts.slice(1);

  return { raw, prefix, command, params, trailing };
}

module.exports = parseIRCMessage;
