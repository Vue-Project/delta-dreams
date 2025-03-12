export default function ({ route, app, redirect })
{
  const { $cookies } = app;

  // Check if cookies module is available
  if (!$cookies) {
    console.error('ERROR: Cookie module is not available!');
    return;
  }

  try {
    // Get parameters from URL and cookies
    const urlCode = route.query.code;
    const urlType = route.query.type;

    // Set secure cookie options for production
    const cookieOptions = {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
      secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
      sameSite: 'Lax', // Helps with security while allowing cross-subdomain
      domain: process.env.NODE_ENV === 'production' ? '.swevey.com' : undefined
    };

    // Always save valid parameters to cookies
    if (urlCode) {
      $cookies.set('code', urlCode, cookieOptions);
    }

    if (urlType) {
      $cookies.set('type', urlType, cookieOptions);
    }

    // For navigation, ensure we have parameters
    const cookieCode = $cookies.get('code');
    const cookieType = $cookies.get('type');

    // Don't redirect for external URLs
    if (route.path.includes('://')) {
      return;
    }

    const query = { ...route.query };
    let shouldRedirect = false;

    if (cookieCode && !urlCode) {
      query.code = cookieCode;
      shouldRedirect = true;
    }

    if (cookieType && !urlType) {
      query.type = cookieType;
      shouldRedirect = true;
    }

    if (shouldRedirect) {
      return redirect({ path: route.path, query });
    }

  } catch (error) {
    console.error('Error in persistParams middleware:', error);
  }
}
