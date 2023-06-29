import { Menu } from './menu.model';


/*
const listaPermisos = localStorage.getItem('permisos');
export const verticalMenuItems = listaPermisos !== null ? JSON.parse(listaPermisos) : null;
*/
const listaPermisos = localStorage.getItem('permisos');
export const verticalMenuItems = listaPermisos !== null ? JSON.parse(listaPermisos) :
[new Menu(10, 'Inicio', '/', null, 'home', null, false, 0)];


// export const verticalMenuItems = JSON.parse(localStorage.getItem('permisos') || '{}');

/*
export const verticalMenuItems = [

    new Menu(10, 'Inicio', '/', null, 'home', null, false, 0),

    new Menu(20, 'Personas', '/personas', null, 'people', null, false, 0),
    new Menu(30, 'Usuarios', '/usuarios', null, 'how_to_reg', null, false, 0),

    new Menu(100, 'Empresa', null, null, 'ballot', null, true, 0),
    new Menu(101, 'Sucursales', '/sucursal/sucursal', null, 'home', null, false, 100),
    new Menu(102, 'Almacenes', '/sucursal/almacen', null, 'home', null, false, 100),

    new Menu(200, 'Productos', null, null, 'next_week', null, true, 0),
    new Menu(201, 'Productos', '/productos', null, 'next_week', null, false, 200),
    new Menu(202, 'Categorias', '/productos/categorias', null, 'pie_chart', null, false, 200),
    new Menu(203, 'Fabricantes', '/productos/fabricantes', null, 'miscellaneous_services', null, false, 200),
    new Menu(204, 'Clasificaciones', '/productos/clasificaciones', null, 'folder', null, false, 200),

    new Menu(300, 'Inventarios', null, null, 'inventory_2', null, true, 0),
    new Menu(301, 'Ingresos', '/inventarios/ingresos', null, 'add_circle_outline', null, false, 300),
    new Menu(302, 'Egresos', '/inventarios/egresos', null, 'remove_circle_outline', null, false, 300),

    new Menu(400, 'Caja', null, null, 'money', null, true, 0),
    new Menu(401, 'Arqueos', '/cajas/arqueo', null, 'monetization_on', null, false, 400),
    new Menu(402, 'Cobrar contado', '/cajas/contado', null, 'point_of_sale', null, false, 400),
];
*/


// console.log('MENUUUUUU', JSON.stringify(verticalMenuItems));

export const horizontalMenuItems = [

    new Menu(10, 'Inicio', '/', null, 'home', null, false, 0),

    new Menu(20, 'Personas', '/personas', null, 'people', null, false, 0),
    new Menu(30, 'Usuarios', '/usuarios', null, 'how_to_reg', null, false, 0),

    new Menu(100, 'Empresa', null, null, 'ballot', null, true, 0),
    new Menu(101, 'Sucursales', '/sucursales', null, 'home', null, false, 100),
    new Menu(102, 'Almacenes', '/almacenes', null, 'home', null, false, 100),

    new Menu(200, 'Productos', null, null, 'next_week', null, true, 0),
    new Menu(201, 'Productos', '/productos', null, 'next_week', null, false, 200),
    new Menu(202, 'Categorias', '/productos/categorias', null, 'pie_chart', null, false, 200),
    new Menu(203, 'Fabricantes', '/productos/fabricantes', null, 'miscellaneous_services', null, false, 200),
    new Menu(204, 'Clasificaciones', '/productos/clasificaciones', null, 'folder', null, false, 200),

    new Menu(300, 'Inventarios', null, null, 'inventory_2', null, true, 0),
    new Menu(301, 'Ingresos', '/inventarios/ingresos', null, 'add_circle_outline', null, false, 300),
    new Menu(302, 'Egresos', '/inventarios/egresos', null, 'remove_circle_outline', null, false, 300),

    new Menu(400, 'Caja', null, null, 'money', null, true, 0),
    new Menu(401, 'Arqueos', '/cajas/arqueo', null, 'monetization_on', null, false, 400),
    new Menu(402, 'Cobrar contado', '/cajas/contado', null, 'point_of_sale', null, false, 400),

];
