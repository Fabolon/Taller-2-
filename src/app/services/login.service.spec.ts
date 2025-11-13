import { TestBed } from "@angular/core/testing";
import { LoginService } from "./login.service";
//configurar cliente HTTP
import { provideHttpClient } from "@angular/common/http";
//Herramienta para Simular las solicitudes HTTP en las pruebas
import {provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";

describe('LoginService', ()=>{

    //definor nuestros mocks -> simulaciones realacionada con peticiones a una api
    // la configuración del entorno de pruebas
    let httpMock : HttpTestingController;
    let service : LoginService;
    const credencialslMock = {
        emailLogin: 'pepita@example.com',
        passwordLogin: 'password123'
    }
    const tokenMock = 'ascvdvavsdvasv';
    beforeEach(()=>{
        TestBed.configureTestingModule({
            providers: [
                LoginService,
                provideHttpClient(),
                provideHttpClientTesting()
            ]

        
        })
        httpMock = TestBed.inject(HttpTestingController);
        service = TestBed.inject(LoginService);



    });

    //2.Definir los casos de prueba 


    //Caso : Simular la peticion post para iniciar sesión
    it('Debería iniciar sesión y retornar un token', ()=>{
        const apiUrl = "http://localhost:9000/iniciarSesion";
        const responseMock = { "mensaje" : "Inicio de sesion exitoso"};

        service.login(credencialslMock.emailLogin, credencialslMock.passwordLogin).subscribe(
        (res)=>{
            expect(res).toEqual(responseMock);
        } )

        //Simular la petición HTTP
        const req = httpMock.expectOne(apiUrl);
        expect(req.request.method).toBe('POST');
        req.flush(responseMock);
        
    });

    it ('Caso 2: Obtener Token del localStorage', ()=>{
        //Simular el localStorage
        localStorage.setItem('token', tokenMock);
        expect(service.getToken()).toBe(tokenMock); //Me debe traer exactamemte el mismo token que se guarda en el localStorage
        
    });


    
    it ('Caso 3: verificar si esta loggeado o no', ()=>{
        localStorage.setItem('token', tokenMock);
        expect(service.isLoggedIn()).toBeTrue();
        
    });



    it ('Caso 4: Verificar si se cierra sesión', ()=>{
        localStorage.setItem('token', tokenMock);
        service.logout(); // primero cierro sesión
        expect(localStorage.getItem('token')).toBeNull(); // luego verifico que el token ya no esté en el localStorage
        
        
    });



});