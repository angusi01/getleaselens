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
});

export default function Login() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const [serverError, setServerError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values) {
    setServerError('');
    const { error } = await supabase.auth.signInWithPassword(values);
    if (error) {
      setServerError('Email or password is incorrect.');
      return;
    }
    router.push(router.query.next?.toString() || '/dashboard');
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <h1>Log in</h1>
        {serverError && <div className="form-alert">{serverError}</div>}
        <label>Email
          <input type="email" autoComplete="off" {...register('email')} />
          {errors.email && <span className="error-text">{errors.email.message}</span>}
        </label>
        <label>Password
          <input type="password" autoComplete="new-password" {...register('password')} />
          {errors.password && <span className="error-text">{errors.password.message}</span>}
        </label>
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Logging in...' : 'Log in'}</button>
        <p>Need an account? <Link href="/signup">Sign up</Link></p>
      </form>
    </main>
  );
}
