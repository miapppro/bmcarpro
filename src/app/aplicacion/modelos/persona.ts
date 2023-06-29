export class Persona {
    constructor(
        public ni: string,
        public niExpedido: string,
        public nombres: string,
        public primerApellido: string,
        public segundoApellido: string,
        public genero: string,
        public fechaNacimiento: Date,
        public estadoCivil: string,
        public telefono: number,
        public celular: number,
        public correo: string,
        public direccion: string) {
    }
}
