import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module'; // <--- 1. IMPORTANTE: Importar el archivo
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    // 2. Configuración para leer el archivo .env
    ConfigModule.forRoot({
      isGlobal: true, // Esto hace que el .env funcione en todos los módulos
    }),

    // 3. Conexión Global a Base de Datos
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [User], // Aseguramos que cargue la entidad
    }),

    // 4. AQUÍ ESTABA EL ERROR: Debemos registrar el módulo de usuarios
    UsersModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}