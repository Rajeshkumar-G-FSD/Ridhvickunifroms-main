export function getTimeGreeting(date: Date = new Date()): string {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

// Best-effort friendly name derived from an email's local part, since the
// admin account has no stored display name (e.g. "rgclothings" -> "Rgclothings").
export function getDisplayNameFromEmail(email: string | null | undefined): string {
  if (!email) return 'Admin';
  const local = email.split('@')[0] ?? '';
  const cleaned = local.replace(/[._-]+/g, ' ').trim();
  if (!cleaned) return 'Admin';
  return cleaned
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getInitial(email: string | null | undefined): string {
  return (email?.trim()?.[0] ?? 'A').toUpperCase();
}

export function formatRelativeTime(timestampMs: number): string {
  if (!timestampMs) return '';
  const diffSeconds = Math.round((Date.now() - timestampMs) / 1000);
  if (diffSeconds < 60) return 'Just now';
  const diffMinutes = Math.round(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;
  return new Date(timestampMs).toLocaleDateString();
}
