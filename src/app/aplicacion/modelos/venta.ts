export class Venta {
    constructor(
        public Sucursal: string,
        public Almacen: string,
        public codigo: number,
        public concepto: string,
        public descripcion: string) {
    }
}
