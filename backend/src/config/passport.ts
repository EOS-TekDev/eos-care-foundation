import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import prisma from './database';

const OAUTH_STATE_COOKIE = 'oauthState';
const stateCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

const validateState = (req: any, providedState?: string) => {
  const expected = req.cookies?.[OAUTH_STATE_COOKIE];
  if (req.res) {
    req.res.clearCookie(OAUTH_STATE_COOKIE, stateCookieOptions);
  }
  return expected && providedState && expected === providedState;
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || '',
      passReqToCallback: true,
    },
    async (req, _accessToken, _refreshToken, profile, done) => {
      if (!validateState(req, req.query.state as string | undefined)) {
        return done(new Error('Invalid OAuth state'));
      }

      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return done(new Error('No email found in Google profile'));
        }

        let user = await prisma.user.findFirst({
          where: { OR: [{ googleId: profile.id }, { email }] },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              name: profile.displayName,
              googleId: profile.id,
              photo: profile.photos?.[0]?.value,
            },
          });
        } else if (!user.googleId) {
          user = await prisma.user.update({
            where: { id: user.id },
            data: { googleId: profile.id },
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error as Error);
      }
    }
  )
);

export default passport;
