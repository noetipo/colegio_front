app

    .controller("MatriculaCtrl", function($scope, $state, $stateParams, matriculaService, $window, $mdDialog, $log, toastr, $filter) {
        //Valores iniciales
        $scope.fields = 'nombre,descripcion';
        var params = {};
        $scope.lista = [];
        $scope.matricula = {};

        $scope.list = function(params) {
            $scope.isLoading = true;
            matriculaService.MatriculaGet.query(params, function(r) {
                $scope.lista = r.results;
                $scope.options = r.options;
                $scope.isLoading = false;
            }, function(err) {
                $log.log("Error in list:" + JSON.stringify(err));
                toastr.error(err.data.results.detail, err.status + ' ' + err.statusText);
            });
        };
        $scope.list(params);

        $scope.buscar = function() {
            params.page = 1;
            params.fields = $scope.fields;
            params.query = $scope.query;
            $scope.list(params);
        };

        $scope.onReorder = function(order) { //TODO
            $log.log('Order: ' + order);
        };

        $scope.delete = function(d) {
            var confirm = $mdDialog.confirm()
                .title('¿ELIMINAR?')
                .textContent('Todos los campos relacionados con: serán eliminados.')
                .ariaLabel('Lucky day')
                .targetEvent(d)
                .ok('Confirmar')
                .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
                matriculaService.Matricula.delete({ id: d.id }, function(r) {
                    $log.log("Se eliminó Cargo:" + JSON.stringify(d));
                    toastr.success('Se eliminó el matricula ');
                    $scope.list(params);
                }, function(err) {
                    $log.log("Error in delete:" + JSON.stringify(err));
                    toastr.error(err.data.detail, err.status + ' ' + err.statusText);
                });
            }, function() {
                $scope.status = 'You decided to keep your debt.';
            });
        };

    })

    .controller("MatriculaSaveCtrl", function($scope, $state, $stateParams, matriculaService, personaService, seccionService,  $window, $mdDialog, $log, toastr, $filter) {
        $scope.matricula = {};
        var params = {};
        $scope.sel = function() {
            matriculaService.Matricula.get({ id: $stateParams.id }, function(r) {
                $scope.matricula = r;
                
            }, function(err) {
                $log.log("Error in get:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        };
        if ($stateParams.id) {
            $scope.sel();
        }



        $scope.listPersona = function(params) {
        $scope.isLoading = true;
        personaService.Persona.query(params, function(r) {
                $scope.listPersona = r.results;
                $scope.options = r.options;
                $scope.isLoading = false;
            }, function(err) {
                $log.log("Error in listPeriodo:" + JSON.stringify(err));
                toastr.error(err.data.results.detail, err.status + ' ' + err.statusText);
            });
        };
        $scope.listPersona(params);

        $scope.listSeccion = function(params) {
        $scope.isLoading = true;
        seccionService.Seccion.query(params, function(r) {
                $scope.listSeccion = r.results;
                $scope.options = r.options;
                $scope.isLoading = false;
            }, function(err) {
                $log.log("Error in listGrado:" + JSON.stringify(err));
                toastr.error(err.data.results.detail, err.status + ' ' + err.statusText);
            });
        };
        $scope.listSeccion(params);


        $scope.save = function() {
            if ($scope.matricula.id) {
                matriculaService.Matricula.update({ id: $scope.matricula.id }, $scope.matricula, function(r) {
                    $log.log("r: " + JSON.stringify(r));
                    toastr.success('Se editó el matricula');
                    $state.go('acuerdo.acuerdo.matricula');
                }, function(err) {
                    $log.log("Error en actualizar:" + JSON.stringify(err));
                    toastr.error(err.data.detail, err.status + ' ' + err.statusText);
                });
            } else {
                $scope.matricula.estado = true;
                matriculaService.Matricula.save($scope.matricula, function(r) {
                    $log.log("r: " + JSON.stringify(r));
                    toastr.success('Se insertó el matricula ' + r.matricula, 'matricula');
                    $state.go('acuerdo.acuerdo.matricula');
                }, function(err) {
                    $log.log("Error in save:" + JSON.stringify(err));
                    toastr.error(err.data.detail, err.status + ' ' + err.statusText);
                });
            }
        };
        $scope.cancel = function() {
            $state.go('acuerdo.acuerdo.matricula');



        };
    }

    );
