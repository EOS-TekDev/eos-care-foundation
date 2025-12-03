"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const database_1 = __importDefault(require("./database"));
const OAUTH_STATE_COOKIE = 'oauthState';
const stateCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
};
const validateState = (req, providedState) => {
    const expected = req.cookies?.[OAUTH_STATE_COOKIE];
    if (req.res) {
        req.res.clearCookie(OAUTH_STATE_COOKIE, stateCookieOptions);
    }
    return expected && providedState && expected === providedState;
};
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || '',
    passReqToCallback: true,
}, async (req, _accessToken, _refreshToken, profile, done) => {
    if (!validateState(req, req.query.state)) {
        return done(new Error('Invalid OAuth state'));
    }
    try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
            return done(new Error('No email found in Google profile'));
        }
        let user = await database_1.default.user.findFirst({
            where: { OR: [{ googleId: profile.id }, { email }] },
        });
        if (!user) {
            user = await database_1.default.user.create({
                data: {
                    email,
                    name: profile.displayName,
                    googleId: profile.id,
                    photo: profile.photos?.[0]?.value,
                },
            });
        }
        else if (!user.googleId) {
            user = await database_1.default.user.update({
                where: { id: user.id },
                data: { googleId: profile.id },
            });
        }
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
}));
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map