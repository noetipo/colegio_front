var ejemplo = { // nadie lo referencia, borrar
    "estado.nombre": {
        "url": "/url",
        "data": {
            "section": "Menu name",
            "page": "Menu item name"
        },
        "templateUrl": "appname_web_apps/appname_web/views/model/index.html"
    },
};
app.constant('ROUTERS', [
    {
        "acuerdo": {
            "url": "/acuerdos",
            "views": {
                "": {
                    "templateUrl": "dist/views/layouts/uno/layout.html"
                }
            },
            "loginRequired": false
        },
        "acuerdo.401_unauthorized": {
            "url": "/401_unauthorized",
            "data": {
                "page": "Error 401: unauthorized"
            },
            "views": {
                "": {
                    "templateUrl": "dist/views/layouts/401_unauthorized.html"
                }
            }
        },
        "acuerdo.dashboard": {
            "url": "/dashboard",
            "data": {
                "page": "Dashboard"
            },
            "views": {
                "": {
                    "templateUrl": "dist/views/layouts/dashboard.wall.html"
                }
            }
        },
        "acuerdo.acuerdo": {
            "url": "/acuerdos",
            "template": "<div ui-view ></div>"
        }
    },
    {
     "acuerdo.acuerdo.persona": {
            "url": "/persona",
            "data": {
                "section": "Configuración",
                "page": "Persona"
            },
            "templateUrl": "app/configuracion/persona/index.html"
        },
        "acuerdo.acuerdo.personaNew": {
            "url": "/persona/new",
            "data": {
                "section": "Configuración",
                "page": "Nuevo"
            },
            "templateUrl": "app/configuracion/persona/form.html"
        },
        "acuerdo.acuerdo.personaEdit": {
            "url": "/persona/edit/:id",
            "data": {
                "section": "Configuración",
                "page": "Editar"
            },
            "templateUrl": "app/configuracion/persona/form.html"
        },

     "acuerdo.acuerdo.periodo": {
            "url": "/periodo",
            "data": {
                "section": "Configuración",
                "page": "Periodo"
            },
            "templateUrl": "app/configuracion/periodo/index.html"
        },
        "acuerdo.acuerdo.periodoNew": {
            "url": "/periodo/new",
            "data": {
                "section": "Configuración",
                "page": "Nuevo"
            },
            "templateUrl": "app/configuracion/periodo/form.html"
        },
        "acuerdo.acuerdo.periodoEdit": {
            "url": "/periodo/edit/:id",
            "data": {
                "section": "Configuración",
                "page": "Editar"
            },
            "templateUrl": "app/configuracion/periodo/form.html"
        }

        ,

     "acuerdo.acuerdo.materia": {
            "url": "/materia",
            "data": {
                "section": "Configuración",
                "page": "Materia"
            },
            "templateUrl": "app/configuracion/materia/index.html"
        },
        "acuerdo.acuerdo.materiaNew": {
            "url": "/materia/new",
            "data": {
                "section": "Configuración",
                "page": "Nuevo"
            },
            "templateUrl": "app/configuracion/materia/form.html"
        },
        "acuerdo.acuerdo.materiaEdit": {
            "url": "/materia/edit/:id",
            "data": {
                "section": "Configuración",
                "page": "Editar"
            },
            "templateUrl": "app/configuracion/materia/form.html"
        }

        ,

     "acuerdo.acuerdo.seccion": {
            "url": "/seccion",
            "data": {
                "section": "Configuración",
                "page": "seccion"
            },
            "templateUrl": "app/configuracion/seccion/index.html"
        },
        "acuerdo.acuerdo.seccionNew": {
            "url": "/seccion/new",
            "data": {
                "section": "Configuración",
                "page": "Nuevo"
            },
            "templateUrl": "app/configuracion/seccion/form.html"
        },
        "acuerdo.acuerdo.seccionEdit": {
            "url": "/seccion/edit/:id",
            "data": {
                "section": "Configuración",
                "page": "Editar"
            },
            "templateUrl": "app/configuracion/seccion/form.html"
        }

         ,

     "acuerdo.acuerdo.matricula": {
            "url": "/matricula",
            "data": {
                "section": "Configuración",
                "page": "matricula"
            },
            "templateUrl": "app/configuracion/matricula/index.html"
        },
        "acuerdo.acuerdo.matriculaNew": {
            "url": "/matricula/new",
            "data": {
                "section": "Configuración",
                "page": "Nuevo"
            },
            "templateUrl": "app/configuracion/matricula/form.html"
        },
        "acuerdo.acuerdo.matriculaEdit": {
            "url": "/matricula/edit/:id",
            "data": {
                "section": "Configuración",
                "page": "Editar"
            },
            "templateUrl": "app/configuracion/matricula/form.html"
        }


        }
]);