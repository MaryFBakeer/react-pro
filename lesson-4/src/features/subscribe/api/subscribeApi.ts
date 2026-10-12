const NETWORK_DELAY_MS = 1200;

const subscribedEmails = new Set<string>(['taken@example.com']);

export const subscribeToNewsletter = async (email: string): Promise<void> => {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, NETWORK_DELAY_MS);
  });

  const normalizedEmail = email.toLowerCase();

  if (subscribedEmails.has(normalizedEmail)) {
    throw new Error('Этот email уже подписан на рассылку');
  }

  subscribedEmails.add(normalizedEmail);
};
