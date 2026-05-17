export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { startBackgroundBot } = await import('./lib/background-bot');
    startBackgroundBot();
  }
}
