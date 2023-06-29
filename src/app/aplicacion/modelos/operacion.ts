export class Operacion {
    constructor(
        public id: number,
        public title: string,
        public routerLink: any,
        public href: any,
        public icon: string,
        public target: any,
        public hasSubMenu: boolean,
        public parentId: number,

        public descripcion: string) {
    }
}
