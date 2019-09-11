import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [PassportModule],
  providers: [JwtStrategy],
  exports: [passportModule, JwtStrategy],
})
export class AuthModule {}
