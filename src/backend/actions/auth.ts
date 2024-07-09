import { authenticatedAction } from '@/lib/zsa-procedures';
// import { ServiceLocator } from '../services/serviceLocator';

export const getProfileUserAction = authenticatedAction.handler(
  async ({ ctx }) => {
    // const AuthenticationService = ServiceLocator.getService(
    //   'AuthenticationService'
    // );
    // const profile = await AuthenticationService.getProfileUser(ctx.user.id);
    // if (!profile) throw new Error('Profile not found');
    // const { house, image, lastName, name, phone } = profile;
    // return {
    //   house,
    //   image,
    //   lastName,
    //   name,
    //   phone,
    //   email: ctx.user.email,
    // };
  }
);
