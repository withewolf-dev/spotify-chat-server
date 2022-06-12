import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { Profile } from 'passport-spotify';
import { SpotifyOauthGuard } from './spotify-oauth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(SpotifyOauthGuard)
  @Get('login')
  login(): void {
    return;
  }

  @UseGuards(SpotifyOauthGuard)
  @Get('/spotify/callback')
  async spotifyAuthRedirect(
    @Req() req: any,
    @Res() res: Response,
  ): Promise<Response> {
    const {
      user,
      authInfo,
    }: {
      user: Profile;
      authInfo: {
        accessToken: string;
        refreshToken: string;
        expires_in: number;
      };
    } = req;

    if (!user) {
      res.redirect('/');
      return;
    }

    req.user = undefined;

    const jwt = this.authService.login(user);

    res.set('authorization', `Bearer ${jwt}`);

    return res.status(201).json({ authInfo, user });
  }
}
