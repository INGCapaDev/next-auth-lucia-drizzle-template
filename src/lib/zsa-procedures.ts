import { env } from '@/config/env';
import { createServerActionProcedure } from 'zsa';
import { PublicError } from './errors';
import { assertAuthenticated } from './session';

function shapeErrors({ err }: any) {
  const isAllowedError = err instanceof PublicError;
  // let's all errors pass through to the UI so debugging locally is easier
  const isDev = env.NODE_ENV === 'development';
  if (isAllowedError || isDev) {
    console.error(err);
    return {
      code: err.code ?? 'ERROR',
      message: `${isDev ? 'DEV ONLY ENABLED - ' : ''}${err.message}`,
    };
  } else {
    return {
      code: 'ERROR',
      message: 'Something went wrong',
    };
  }
}

const authenticatedProcedure = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    const user = await assertAuthenticated();
    return { user };
  });

const unauthenticatedProcedure = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    return { user: undefined };
  });

export const authenticatedAction = authenticatedProcedure.createServerAction();
export const baseAction = unauthenticatedProcedure.createServerAction();
