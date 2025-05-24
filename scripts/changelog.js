function emojiPrefix(msg) {
  if (msg.startsWith('feat')) return '✨ ' + msg;
  if (msg.startsWith('fix')) return '🐛 ' + msg;
  if (msg.startsWith('perf')) return '🐎 ' + msg;
  if (msg.startsWith('docs')) return '📚 ' + msg;
  if (msg.startsWith('chore')) return '🧹 ' + msg;
  if (msg.startsWith('refactor')) return '♻️ ' + msg;
  return msg;
}

fetch('https://api.github.com/repos/5okin/MercuryBot/commits')
  .then(res => res.json())
  .then(data => {
    const changelog = data.slice(0, 10).map(commit => {
      const msg = emojiPrefix(commit.commit.message);
      const date = new Date(commit.commit.committer.date).toDateString();

      return `
        <li class="border-b border-gray-700 py-6">
            <div class="text-sm text-gray-400 mt-1">
                <span class="font-mono bg-gray-700 text-gray-300 px-2 py-0.5 rounded">${date}</span>
            </div>
            <div class="text-lg font-medium whitespace-pre-line mt-2">${msg}
        </li>
      `;
    }).join('');

    document.getElementById('changelog').innerHTML = `
      <ul class="mt-6 text-left text-base leading-relaxed">${changelog}</ul>
        <div class="mt-6 text-center">
            <a href="https://github.com/5okin/MercuryBot" target="_blank" class="link inline-flex items-center space-x-2">
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/github.svg" alt="GitHub" class="w-5 h-5 invert">
                <span>View more on GitHub</span>
            </a>
        </div>
    `;
  })
  .catch(err => {
    document.getElementById('changelog').innerHTML = '<p class="text-red-500">Failed to load changelog.</p>';
    console.error(err);
  });