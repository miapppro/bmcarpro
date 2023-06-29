export class Compra {
    constructor(
        public Sucursal: string,
        public Almacen: string,
        public Proveedor: string,
        public codigo: number,
        public concepto: string,
        public descripcion: string) {
    }
}
