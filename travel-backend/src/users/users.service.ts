import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  
  // Inyectamos el repositorio para poder hablar con la BD
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Función para CREAR un usuario
  async create(createUserDto: CreateUserDto) {
    // 1. Preparamos el usuario con los datos que llegan
    const newUser = this.userRepository.create(createUserDto);
    
    // 2. Lo guardamos en la base de datos (Neon)
    return await this.userRepository.save(newUser);
  }

  // ... imports y clase ...

  /// Función Login MEJORADA (Busca por Email O Nombre)
  async login(identifier: string, pass: string) {
    console.log(`🔍 Buscando usuario: "${identifier}" con contraseña: "${pass}"`);

    const user = await this.userRepository.findOne({
      where: [
        // Buscamos coincidencia exacta en email O nombre
        { email: identifier, password: pass },
        { fullName: identifier, password: pass }
      ]
    });

    if (user) {
      console.log(`✅ ENCONTRADO: ${user.fullName} (ID: ${user.id})`);
    } else {
      console.log(`❌ No se encontró nadie con esas credenciales.`);
    }

    return user;
  }

// ... resto del archivo

  // Función para VER todos (nos servirá para probar)
  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  // Función para ELIMINAR usuario por su ID
  async remove(id: string) {
    // Busca y borra. Si no existe, no pasa nada.
    return await this.userRepository.delete(id);
  }
}
