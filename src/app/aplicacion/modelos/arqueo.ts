export class Arqueo {
    constructor(
        public Sucursal: string,
        public Almacen: string,
        public codigo: string,
        public descripcion: string,
        public total: number,
        public inicio: Date,
        public fin: Date,
        public abierto: boolean) {
    }
}

