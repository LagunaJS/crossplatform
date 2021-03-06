//Usamos una "Immediate Function" para iniciar la aplicacion sin dejar que nada este fuera del scope global
(function () {
    //Ya no son variables locales, son objetos de las vistas
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html()); // Guarda el template home
    EmployeeListView.prototype.template = Handlebars.compile($("#employee-list-tpl").html()); // Guarda el template empleados
    EmployeeView.prototype.template = Handlebars.compile($("#employee-tpl").html());
    /* ---------------------------------- Variables Locales ---------------------------------- */
    var service = new EmployeeService();
    var slider = new PageSlider($('body'));
    service.initialize().done(function () {
        slider.slidePage(new HomeView(service).render().$el);

        router.addRoute('employees/:id', function(id) { //creamos una nueva ruta que acepta un argumento (el id del empleado)
            service.findById(parseInt(id)).done(function(employee) { //convertimos el argumento a un entero
                slider.slidePage(new EmployeeView(employee).render().$el);; //renderisamos la vista rellenando los datos con el empleado
            });
        });

        router.addRoute('home', function() { //creamos una nueva ruta para home
                slider.slidePage(new HomeView(service).render().$el);
        });

        router.start();
    });

    /* --------------------------------- Registro de Eventos -------------------------------- */
    document.addEventListener('deviceready', function () {
      FastClick.attach(document.body); //registramos el script para implementarse cuando el dispositivo este listo
    }, false);

    /* ---------------------------------- Funciones Locales ---------------------------------- */

}());
