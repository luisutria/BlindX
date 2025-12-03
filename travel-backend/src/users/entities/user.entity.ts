import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users') // Esto creará la tabla llamada 'users' en Neon
export class User {
  @PrimaryGeneratedColumn('uuid') // ID único y seguro (ej. a1b2-c3d4...)
  id: string;

  

  @Column('text')
  fullName: string;

  @Column('text', { unique: true }) // El email no se puede repetir
  email: string;

  @Column('text')
  password: string; // Aquí guardaremos la contraseña (encriptada más adelante)

  @Column('text', { nullable: true }) // Puede estar vacío si el usuario no lo pone
  phoneNumber: string;

  // --- DATOS DE EMERGENCIA (Vital para tu App) ---
  @Column('text')
  emergencyName: string;

  @Column('text')
  emergencyPhone: string;

  // --- DATOS DE CONTROL ---
  @Column('text', { default: 'user' }) 
  role: string; // Puede ser 'user' o 'driver'

  @Column('boolean', { default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
