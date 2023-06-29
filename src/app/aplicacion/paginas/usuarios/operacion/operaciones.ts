// MENU OFICIAL
export const listaOperaciones = [
    {
        id: 10, title: 'Inicio',
        routerLink: '/', href: null, icon: 'home', target: null, hasSubMenu: false, parentId: 0
    },
    {
        id: 20, title: 'Personas',
        routerLink: '/personas', href: null, icon: 'people', target: null, hasSubMenu: false, parentId: 0
    },
    {
        id: 30, title: 'Usuarios',
        routerLink: '/usuarios', href: null, icon: 'how_to_reg', target: null, hasSubMenu: false, parentId: 0
    },
    {
        id: 100, title: 'Gestion Empresa',
        routerLink: null, href: null, icon: 'ballot', target: null, hasSubMenu: true, parentId: 0
    },

    {
        id: 101, title: 'Sucursales',
        routerLink: '/sucursal/sucursal', href: null, icon: 'home', target: null, hasSubMenu: false, parentId: 100
    },
    {
        id: 102, title: 'Almacenes',
        routerLink: '/sucursal/almacen', href: null, icon: 'home', target: null, hasSubMenu: false, parentId: 100
    },

    {
        id: 200, title: 'Gestion Productos',
        routerLink: null, href: null, icon: 'next_week', target: null, hasSubMenu: true, parentId: 0
    },
    {
        id: 201, title: 'Productos',
        routerLink: '/productos', href: null, icon: 'next_week', target: null, hasSubMenu: false, parentId: 200
    },
    {
        id: 202, title: 'Categorias',
        routerLink: '/productos/categorias', href: null, icon: 'pie_chart', target: null, hasSubMenu: false, parentId: 200
    },
    {
        id: 203, title: 'Fabricantes',
        routerLink: '/productos/fabricantes', href: null, icon: 'miscellaneous_services', target: null, hasSubMenu: false, parentId: 200
    },
    {
        id: 204, title: 'Clasificaciones',
        routerLink: '/productos/clasificaciones', href: null, icon: 'folder', target: null, hasSubMenu: false, parentId: 200
    },

    {
        id: 300, title: 'Gestion Inventarios',
        routerLink: null, href: null, icon: 'inventory_2', target: null, hasSubMenu: true, parentId: 0
    },
    {
        id: 301, title: 'Ingresos',
        routerLink: '/inventarios/ingresos', href: null, icon: 'add_circle_outline', target: null, hasSubMenu: false, parentId: 300
    },
    {
        id: 302, title: 'Egresos',
        routerLink: '/inventarios/egresos', href: null, icon: 'remove_circle_outline', target: null, hasSubMenu: false, parentId: 300
    },

    {
        id: 400, title: 'Gestion Caja',
        routerLink: null, href: null, icon: 'money', target: null, hasSubMenu: true, parentId: 0
    },
    {
        id: 401, title: 'Arqueos',
        routerLink: '/cajas/arqueo', href: null, icon: 'monetization_on', target: null, hasSubMenu: false, parentId: 400
    },
    {
        id: 402, title: 'Cobrar contado',
        routerLink: '/cajas/contado', href: null, icon: 'point_of_sale', target: null, hasSubMenu: false, parentId: 400
    },
    {
        id: 403, title: 'Cobrar credito',
        routerLink: '/cajas/credito', href: null, icon: 'point_of_sale', target: null, hasSubMenu: false, parentId: 400
    },
    {
        id: 404, title: 'Pagar contado',
        routerLink: '/cajas/contadocompra', href: null, icon: 'point_of_sale', target: null, hasSubMenu: false, parentId: 400
    },
    {
        id: 405, title: 'Pagar credito',
        routerLink: '/cajas/creditocompra', href: null, icon: 'point_of_sale', target: null, hasSubMenu: false, parentId: 400
    },

    {
        id: 500, title: 'Gestion Ventas',
        routerLink: null, href: null, icon: 'store', target: null, hasSubMenu: true, parentId: 0
    },
    {
        id: 501, title: 'Clientes',
        routerLink: '/clientes', href: null, icon: 'groups', target: null, hasSubMenu: false, parentId: 500
    },
    {
        id: 502, title: 'Ventas',
        routerLink: '/ventas', href: null, icon: 'shopping_cart', target: null, hasSubMenu: false, parentId: 500
    },

    {
        id: 600, title: 'Gestion Compras',
        routerLink: null, href: null, icon: 'local_shipping', target: null, hasSubMenu: true, parentId: 0
    },
    {
        id: 601, title: 'Proveedores',
        routerLink: '/proveedores', href: null, icon: 'groups', target: null, hasSubMenu: false, parentId: 600
    },
    {
        id: 602, title: 'Compras',
        routerLink: '/compras', href: null, icon: 'local_mall', target: null, hasSubMenu: false, parentId: 600
    },

    {
        id: 1000, title: 'Gestion Reportes',
        routerLink: null, href: null, icon: 'topic', target: null, hasSubMenu: true, parentId: 0
    },
    {
        id: 1001, title: 'Reporte 1',
        routerLink: '/reportes/reporte1', href: null, icon: 'drive_file_move', target: null, hasSubMenu: false, parentId: 1000
    },
    {
        id: 1002, title: 'Reporte 2',
        routerLink: '/reportes/reporte2', href: null, icon: 'drive_file_move', target: null, hasSubMenu: false, parentId: 1000
    },
    {
        id: 1003, title: 'Reporte 3',
        routerLink: '/reportes/reporte3', href: null, icon: 'drive_file_move', target: null, hasSubMenu: false, parentId: 1000
    },
    {
        id: 1004, title: 'Reporte 4',
        routerLink: '/reportes/reporte4', href: null, icon: 'drive_file_move', target: null, hasSubMenu: false, parentId: 1000
    },
    {
        id: 1005, title: 'Reporte 5',
        routerLink: '/reportes/reporte5', href: null, icon: 'drive_file_move', target: null, hasSubMenu: false, parentId: 1000
    }
];

