import { env } from '@/config/env';
import { createServerActionProcedure } from 'zsa';
import { ERROR_MESSAGES, PublicError } from './errors';
import { assertAuthenticated } from './session';
import { getDevOnlyErrorMsg } from './utils';

function shapeErrors({ err }: any) {
  const isAllowedError = err instanceof PublicError;
  // let's all errors pass through to the UI so debugging locally is easier
  const isDev = env.NODE_ENV === 'development';
  if (isAllowedError || isDev) {
    console.log('------------ERROR------------');
    console.error(err?.message ?? err);
    console.log('------------ERROR------------');
    return {
      code: err.code ?? 'ERROR',
      message: isDev ? getDevOnlyErrorMsg(err.message) : err.message,
    };
  } else {
    return {
      code: 'ERROR',
      message: ERROR_MESSAGES.GenericError,
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
