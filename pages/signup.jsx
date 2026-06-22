import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const schema = z.object({
  email: z.string().email('Enter a valid email.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
  confirmPassword: z.string().min(6, 'Confirm your password.'),
}).refine((values) => values.password === values.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords must match.',
});

export default function Signup() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const [serverError, setServerError] = useState('');
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values) {
    setServerError('');
    const origin = typeof window === 'undefined' ? '' : window.location.origin;
    const next = router.query.next?.toString() || '/dashboard';
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: { emailRedirectTo: `${origin}${next}` },
    });
    if (error) {
      setServerError(error.message.toLowerCase().includes('registered') ? 'An account already exists for this email.' : error.message);
      return;
    }
    if (data.session) {
      router.push(next);
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <div className="check-icon">✓</div>
          <h1>Check your email</h1>
          <p>We sent a confirmation link so you can finish creating your account.</p>
          <Link className="button-link" href="/login">Go to login</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit(onSubmit)}>
        <h1>Create account</h1>
        {serverError && <div className="form-alert">{serverError}</div>}
        <label>Email
          <input type="email" autoComplete="email" {...register('email')} />
          {errors.email && <span className="error-text">{errors.email.message}</span>}
        </label>
        <label>Password
          <input type="password" autoComplete="new-password" {...register('password')} />
          {errors.password && <span className="error-text">{errors.password.message}</span>}
        </label>
        <label>Confirm password
          <input type="password" autoComplete="new-password" {...register('confirmPassword')} />
          {errors.confirmPassword && <span className="error-text">{errors.confirmPassword.message}</span>}
        </label>
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Creating account...' : 'Create account'}</button>
        <p>Already have an account? <Link href="/login">Log in</Link></p>
      </form>
    </main>
  );
}
