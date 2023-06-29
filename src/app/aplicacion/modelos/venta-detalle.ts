export class VentaDetalle {
    constructor(
        public Venta: string,
        public Sucursal: string,
        public Almacen: string,
        public Producto: string,
        public cantidad: number,
        public precioCompra: number,
        public precioVenta: number,
        public codigoBarra: string,
        public lote: string,
        public loteFecha: Date) {
    }
}
