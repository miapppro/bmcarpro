import { CategoriaModelo } from './categoria';
import { ClasificacionModelo } from './clasificacion';

import { FabricanteModelo } from './fabricante';

export class Producto {
    constructor(
        public codigo: string,
        public descripcion: string,
        public Categoria: string,
        public Fabricante: string,
        public Clasificacion: string,
        public detalle: string) {
    }
}

export class ProductoModelo {
    constructor(
        public codigo: string,
        public descripcion: string,
        public Categoria: CategoriaModelo,
        public Fabricante: FabricanteModelo,
        public Clasificacion: ClasificacionModelo,
        public detalle: string) {
    }
}

