import {browser, element, by } from 'protractor';
 
describe('Mi Test', ()=>{
    //configuramos nuestro bloque
    beforeEach(()=>{
        browser.get("/");

    });
    //creación de prueba 1
    it("El page 1 se muestra por defecto", ()=>{
        expect(element(by.css(".color02 ion-title")).getText()).toContain("Home");
    });
    
    it("El titulo de energia eolica se muestra por defecto",()=>{
        expect(element(by.css(".tittle01 ion-card-title")).getText()).toContain("Wind power");
    });

});


 















