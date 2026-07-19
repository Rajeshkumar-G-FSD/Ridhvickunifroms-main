import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { CheckCircle2, KeyRound, Loader2, LogOut, Mail } from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { logoutAdmin } from '../../lib/adminAuth';
import { getDisplayNameFromEmail } from '../../lib/adminUi';

export default function AdminSettingsPage() {
  const { user } = useAdminAuth();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSignOut = async () => {
    await logoutAdmin();
    navigate('/admin/login', { replace: true });
  };

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }
    if (!user?.email) {
      setError('No signed-in admin account found.');
      return;
    }

    setIsSaving(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error('Password change failed:', err);
      setError('Current password is incorrect, or the change could not be completed.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <div>
        <h1 className="text-xl font-headline font-black text-brand-blue">Settings</h1>
        <p className="text-xs text-brand-muted font-sans mt-1">Manage your admin account.</p>
      </div>

      <div className="bg-white rounded-xl border border-brand-border/20 p-5 sm:p-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center font-headline font-bold text-lg shrink-0">
          {(user?.email?.[0] ?? 'A').toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-headline font-bold text-brand-blue">{getDisplayNameFromEmail(user?.email)}</p>
          <p className="text-xs text-brand-muted font-sans flex items-center gap-1.5 mt-0.5 truncate">
            <Mail className="w-3.5 h-3.5 shrink-0" />
            {user?.email}
          </p>
        </div>
      </div>

      <form onSubmit={handleChangePassword} className="bg-white rounded-xl border border-brand-border/20 p-5 sm:p-6 flex flex-col gap-4">
        <h2 className="text-sm font-headline font-black text-brand-blue flex items-center gap-2">
          <KeyRound className="w-4 h-4" />
          Change Password
        </h2>

        <div>
          <label className="text-xs font-headline font-bold text-brand-blue uppercase tracking-wider">
            Current Password
          </label>
          <input
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-1.5 w-full h-11 px-3 border border-brand-border/30 rounded-lg outline-none text-sm font-sans text-brand-blue focus:border-brand-blue transition-colors"
            required
          />
        </div>

        <div>
          <label className="text-xs font-headline font-bold text-brand-blue uppercase tracking-wider">
            New Password
          </label>
          <input
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1.5 w-full h-11 px-3 border border-brand-border/30 rounded-lg outline-none text-sm font-sans text-brand-blue focus:border-brand-blue transition-colors"
            required
          />
        </div>

        <div>
          <label className="text-xs font-headline font-bold text-brand-blue uppercase tracking-wider">
            Confirm New Password
          </label>
          <input
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1.5 w-full h-11 px-3 border border-brand-border/30 rounded-lg outline-none text-sm font-sans text-brand-blue focus:border-brand-blue transition-colors"
            required
          />
        </div>

        {error && <p className="text-xs text-red-500 font-sans">{error}</p>}
        {success && (
          <p className="text-xs text-green-600 font-sans flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Password updated successfully.
          </p>
        )}

        <button
          type="submit"
          disabled={isSaving}
          className="self-start h-10 px-5 flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-light disabled:opacity-60 text-white font-headline font-bold rounded-lg transition-colors text-xs"
        >
          {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          Update Password
        </button>
      </form>

      <button
        onClick={handleSignOut}
        className="self-start flex items-center gap-2 h-10 px-4 border border-red-200 text-red-500 font-headline font-bold rounded-lg hover:bg-red-50 transition-colors text-xs"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    </div>
  );
}
