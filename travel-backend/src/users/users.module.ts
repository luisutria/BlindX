import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [
    // Esto le dice a NestJS: "Este módulo necesita acceso a la tabla User"
    TypeOrmModule.forFeature([User]) 
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService] // Buena práctica: permitir que otros módulos usen este servicio
})
export class UsersModule {}