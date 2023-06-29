import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriaService } from 'src/app/aplicacion/servicios/categoria.service';
import { ClasificacionService } from 'src/app/aplicacion/servicios/clasificacion.service';
import { FabricanteService } from 'src/app/aplicacion/servicios/fabricante.service';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { ProductoService } from 'src/app/aplicacion/servicios/producto.service';
import { CategoriaFormularioComponent } from '../categoria-formulario/categoria-formulario.component';
import { ClasificacionFormularioComponent } from '../clasificacion-formulario/clasificacion-formulario.component';
import { FabricanteFormularioComponent } from '../fabricante-formulario/fabricante-formulario.component';

@Component({
  selector: 'app-producto-editar',
  templateUrl: './producto-editar.component.html',
  styleUrls: ['./producto-editar.component.scss']
})
export class ProductoEditarComponent implements OnInit {

  registroFormGroup!: FormGroup;
  registroControl = false;

  categorias: any;
  fabricantes: any;
  clasificaciones: any;

  // CONSTRUCTOR
  constructor(
    private productoServicio: ProductoService,
    private categoriaServicio: CategoriaService,
    private fabricanteServicio: FabricanteService,
    private clasificacionServicio: ClasificacionService,
    private fb: FormBuilder,
    private cargando: NgxSpinnerService,
    public dialog: MatDialog,
    public mensajeServicio: MensajeService,
    public dialogRef: MatDialogRef<ProductoEditarComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.cargando.show();
    if (data.nuevo) {

      // FORM NUEVO
      this.registroFormGroup = this.fb.group({
        Categoria: [null, Validators.required],
        Fabricante: [null, [Validators.required]],
        Clasificacion: [null, [Validators.required]],
        codigo: [{ value: null, disabled: true }, [Validators.required]],
        descripcion: [null, [Validators.required, Validators.minLength(3)]],
        detalle: [null, [Validators.required, Validators.minLength(5)]],
        codigoBarra: [null],
        codigoProveedor: [null, Validators.required],
      });

    } else {

      // FORM EDITAR
      this.productoServicio.obtenerPorId(data.objeto._id).subscribe((respuesta: any) => {
        console.log('RESPUESTA DE OBTENER POR ID: ', respuesta);
        this.registroFormGroup = this.fb.group({
          Categoria: [respuesta.objeto.Categoria, [Validators.required]],
          Fabricante: [respuesta.objeto.Fabricante, [Validators.required]],
          Clasificacion: [respuesta.objeto.Clasificacion, [Validators.required]],
          codigo: [{ value: respuesta.objeto.codigo, disabled: true }, [Validators.required]],
          descripcion: [respuesta.objeto.descripcion, [Validators.required, Validators.minLength(3)]],
          detalle: [respuesta.objeto.detalle],
          codigoBarra: [respuesta.objeto.codigoBarra],
          codigoProveedor: [respuesta.objeto.codigoProveedor, Validators.required],
        });
        this.cargando.hide();
      });
    }
  }

  // INICIAR
  ngOnInit(): void {
    this.filtros();
  }

  // FILTROS
  filtros(): void {
    this.categoriaServicio.obtener().subscribe((respuestaCategoria: any) => {
      this.categorias = respuestaCategoria.lista;
      console.log('RESPUESTA DE CATEGORIAS: ', respuestaCategoria);

      this.fabricanteServicio.obtener().subscribe((respuestaFabricante: any) => {
        this.fabricantes = respuestaFabricante.lista;

        this.clasificacionServicio.obtener().subscribe((respuestaClasificacion: any) => {
          this.clasificaciones = respuestaClasificacion.lista;
          this.cargando.hide();
        });
      });
    });
  }

  // FORM
  get r(): any { return this.registroFormGroup.controls; }

  // REGISTRAR
  onSubmit(): void {
    this.registroControl = true;
    if (this.registroFormGroup.invalid) {
      this.mensajeServicio.error_rapido('por favor complete los datos requeridos');
      return;
    } else {
      this.cargando.show();
      if (this.data.nuevo) {
        this.productoServicio.crear(this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
          // console.log('PERSONA NUEVA: ', respuesta.id);
          this.mensajeServicio.ok_rapido('Producto creada, exitosamente');
          this.dialogRef.close(true);
          this.cargando.hide();
        }, error => {
          this.mensajeServicio.error_rapido('Error de servidor');
          this.cargando.hide();
        });
      } else {
        this.productoServicio.editar(this.data.objeto._id, this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
          this.mensajeServicio.ok_rapido('Producto actualizada, exitosamente');
          this.dialogRef.close(true);
          this.cargando.hide();
        }, error => {
          this.mensajeServicio.error_rapido('Error de servidor');
          this.cargando.hide();
        });
      }
      // alert('OK!! :-)\n\n' + JSON.stringify(this.formRegistro.getRawValue()))
    }
  }

  // SELECCIONAR CLASIFICACION
  seleccionarClasificacion(fila: any): void {
    this.cargando.show();
    this.productoServicio.obtenerUltimoPorClasificacion(fila._id).subscribe((respuesta: any) => {
      console.log('RESPUESTA DE ULTIMA CLASIFICACION: ', respuesta);
      if (respuesta.objeto) {
        this.r.codigo.setValue(+respuesta.objeto.codigo + +1);
      } else {
        this.r.codigo.setValue(fila.inicio);
      }
      this.cargando.hide();
    });
  }

  // NUEVO CATEGORIA
  nuevoCategoria(): void {
    const dialogRef = this.dialog.open(CategoriaFormularioComponent, {
      width: '500px',
      data: {
        nuevo: true,
        objeto: null
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filtros();
      }
    });
  }

  // NUEVO FABRICANTE
  nuevoFabricante(): void {
    const dialogRef = this.dialog.open(FabricanteFormularioComponent, {
      width: '500px',
      data: {
        nuevo: true,
        objeto: null
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filtros();
      }
    });
  }

  // NUEVO CATEGORIA
  nuevoClasificacion(): void {
    const dialogRef = this.dialog.open(ClasificacionFormularioComponent, {
      width: '500px',
      data: {
        nuevo: true,
        objeto: null
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filtros();
      }
    });
  }

  // COPIAR CODIGO
  copiarCodigo(): void {
    this.r.descripcion.setValue(this.r.codigoProveedor.value);
  }

  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
