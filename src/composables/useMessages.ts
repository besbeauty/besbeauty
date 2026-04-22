import { ref, onMounted } from 'vue';

const messages = [
  'Hey, bitches.',
  'Miss me?',
  'I see everything.',
  'Secrets have a way of coming out.',
  'You should be more careful.',
  'Did you really think no one was watching?',
  'Some secrets are meant to stay buried.',
  'Tick tock.',
  'The truth always finds a way.',
  'Careful who you trust.',
  'I know what you did.',
  "You can't hide forever.",
  'Every move you make... I see it.',
  "Lying is easy. Getting away with it isn't.",
  'Not everyone is who they seem.',
  'Do you feel watched yet?',
  'The game has already begun.',
  "You're closer to the truth than you think.",
  'But are you ready for it?',
  "Some puzzles aren't meant to be solved.",
  'Maybe the real question is... who is A?',
  'XOXO.',
];

const randomMessage = ref('');

function getRandomMessage() {
  const index = Math.floor(Math.random() * messages.length);
  return messages[index];
}

export function useMessages() {
  onMounted(() => {
    randomMessage.value = getRandomMessage();
  });

  return {
    randomMessage,
    getRandomMessage,
    messages,
  };
}
