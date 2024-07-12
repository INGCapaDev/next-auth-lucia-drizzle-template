import { authenticatedAction } from '@/lib/zsa-procedures';
import { getProfileUserService } from '../services/authenticationService';

export const getProfileUserAction = authenticatedAction.handler(
  async ({ ctx }) => {
    const profile = await getProfileUserService(ctx.user.id);
    if (!profile) throw new Error('Profile not found');
    const { house, image, lastName, name, phone } = profile;
    return {
      house,
      image,
      lastName,
      name,
      phone,
      email: ctx.user.email,
    };
  }
);
