import { getProfileUserAction } from '@/backend/actions/auth';
import { cache } from 'react';
import 'server-only';

export const getCurrentProfile = cache(async () => {
  const [profile, error] = await getProfileUserAction();
  if (error) {
    throw error;
  }
  return profile;
});
