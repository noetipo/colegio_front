app

    .controller("SeccionCtrl", function($scope, $state, $stateParams, seccionService, $window, $mdDialog, $log, toastr, $filter) {
        //Valores iniciales
        $scope.fields = 'nombre,descripcion';
        var params = {};
        $scope.lista = [];
        $scope.seccion = {};

        $scope.list = function(params) {
            $scope.isLoading = true;
            seccionService.SeccionGet.query(params, function(r) {
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
                .textContent('Todos los campos relacionados con: '+d.seccion+' serán eliminados.')
                .ariaLabel('Lucky day')
                .targetEvent(d)
                .ok('Confirmar')
                .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
                seccionService.Seccion.delete({ id: d.id }, function(r) {
                    $log.log("Se eliminó Cargo:" + JSON.stringify(d));
                    toastr.success('Se eliminó el Cargo ' + d.seccion, 'Cargo');
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

    .controller("SeccionSaveCtrl", function($scope, $state, $stateParams,gradoService, seccionService, periodoService,  $window, $mdDialog, $log, toastr, $filter) {
        $scope.seccion = {};
        var params = {};
        $scope.sel = function() {
            seccionService.Seccion.get({ id: $stateParams.id }, function(r) {
                $scope.seccion = r;
                
            }, function(err) {
                $log.log("Error in get:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        };
        if ($stateParams.id) {
            $scope.sel();
        }



        $scope.listPeriodo = function(params) {
        $scope.isLoading = true;
        periodoService.Periodo.query(params, function(r) {
                $scope.listPeriodo = r.results;
                $scope.options = r.options;
                $scope.isLoading = false;
            }, function(err) {
                $log.log("Error in listPeriodo:" + JSON.stringify(err));
                toastr.error(err.data.results.detail, err.status + ' ' + err.statusText);
            });
        };
        $scope.listPeriodo(params);

        $scope.listGrado = function(params) {
        $scope.isLoading = true;
        gradoService.Grado.query(params, function(r) {
                $scope.listGrado = r.results;
                $scope.options = r.options;
                $scope.isLoading = false;
            }, function(err) {
                $log.log("Error in listGrado:" + JSON.stringify(err));
                toastr.error(err.data.results.detail, err.status + ' ' + err.statusText);
            });
        };
        $scope.listGrado(params);


        $scope.save = function() {
            if ($scope.seccion.id) {
                seccionService.Seccion.update({ id: $scope.seccion.id }, $scope.seccion, function(r) {
                    $log.log("r: " + JSON.stringify(r));
                    toastr.success('Se editó el seccion  ' + r.seccion, 'seccion');
                    $state.go('acuerdo.acuerdo.seccion');
                }, function(err) {
                    $log.log("Error en actualizar:" + JSON.stringify(err));
                    toastr.error(err.data.detail, err.status + ' ' + err.statusText);
                });
            } else {
                $scope.seccion.estado = true;
                seccionService.Seccion.save($scope.seccion, function(r) {
                    $log.log("r: " + JSON.stringify(r));
                    toastr.success('Se insertó el seccion ' + r.seccion, 'seccion');
                    $state.go('acuerdo.acuerdo.seccion');
                }, function(err) {
                    $log.log("Error in save:" + JSON.stringify(err));
                    toastr.error(err.data.detail, err.status + ' ' + err.statusText);
                });
            }
        };
        $scope.cancel = function() {
            $state.go('acuerdo.acuerdo.seccion');



        };
    }

    );
