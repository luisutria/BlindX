export class CreateUserDto {
  fullName: string;
  email: string;
  password: string;
  emergencyName: string;
  emergencyPhone: string;
  // El rol y isActive se ponen automáticos en la base de datos
}
