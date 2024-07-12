import { verifyEmailService } from '@/backend/services/authenticationService';

export const dynamic = 'force-dynamic';

export async function GET(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get('token');
    console.log('token', token);

    if (!token) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/invalid-email-token',
        },
      });
    }

    await verifyEmailService(token);

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/verify-success',
      },
    });
  } catch (err) {
    console.error(err);
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/invalid-email-token',
      },
    });
  }
}
