import { PassportStatic } from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import MemberModel, { MemberDocument } from '../models/member-model';
import { mapDocumentToMember } from '../mappers/member-mapper';
import IJwtPayload from '../interfaces/i-jwt-payload';
import logger from './logger-config';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
};

const configurePassport = (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(opts, async (jwtPayload: IJwtPayload, done) => {
      try {
        const memberDocument: MemberDocument | null = await MemberModel.findOne({ email: jwtPayload.email });
        if (memberDocument) {
          const member = mapDocumentToMember(memberDocument);
          return done(null, member);
        }
        return done(null, false);
      } catch (err) {
        logger.error(err);
        return done(err, false);
      }
    })
  );
}

export default configurePassport;