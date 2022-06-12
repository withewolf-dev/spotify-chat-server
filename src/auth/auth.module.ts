import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { SpotifyOauthStrategy } from './strategies/spotify-oauth.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: 'secret',
          signOptions: {
            expiresIn: '3600s',
          },
        };
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, SpotifyOauthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
