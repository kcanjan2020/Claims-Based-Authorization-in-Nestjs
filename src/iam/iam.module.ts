import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageService } from 'src/helper/storage.service';
import { User } from 'src/user/entities/user.entity';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AccessTokenGuard } from './auth/guard/access-token.guard';
import { AuthenticationGuard } from './auth/guard/authentication.guard';
import { PermissionGuard } from './authorization/guards/permissions.guard';
import jwtConfig from './config/jwt.config';
import { BcryptService } from './hashing/bcrypt.service';
import { HashingService } from './hashing/hashing.service';
import { Role } from 'src/role/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
    AccessTokenGuard,
    AuthService,
    StorageService,
  ],
  controllers: [AuthController],
})
export class IamModule {}
