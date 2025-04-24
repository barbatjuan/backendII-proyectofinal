export class UserResponseDto {
  constructor(user) {
    // this.first_name = user.first_name;
    // this.last_name = user.last_name;
    this._id = user._id;
    this.fullName = `${user.first_name} ${user.last_name}`;
    this.email = user.email;
    this.age = user.age;
    this.role = user.role;
    this.password = user.password; // Solo para pruebas, eliminar antes de producción
  }

  age(user) {
    try {
      // Algoritmo para calcular la edad en base a la fecha de nacimiento
      // const now = Date.now();
      // const age = now -  user.birthDate; //! No esta bien, se debe hacer con una librería
      // return age;
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
}
