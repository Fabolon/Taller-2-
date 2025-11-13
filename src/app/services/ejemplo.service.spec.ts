//Importaciones necesarias para las pruebas
import { TestBed } from '@angular/core/testing';
import { EjemploService } from './ejemplo.service';

//grupo de pruebas para el servicio EjemploService
describe('EjemploService', () => {
  let service: EjemploService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EjemploService]
    });
    service = TestBed.inject(EjemploService);
  });


  it('Debería sumar 2 números correctamente', ()=>{
    const resultado = service.suma(2,5);
    expect(resultado).toBe(7);
  })
});
