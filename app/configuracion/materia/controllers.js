app

    .controller("MateriaCtrl", function($scope, $state, $stateParams, materiaService, $window, $mdDialog, $log, toastr, $filter) {
        //Valores iniciales
        $scope.fields = 'nombre,descripcion';
        var params = {};
        $scope.lista = [];
        $scope.materia = {};

        $scope.list = function(params) {
            $scope.isLoading = true;
            materiaService.Materia.query(params, function(r) {
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
                .textContent('Todos los campos relacionados con: '+d.nombre+' serán eliminados.')
                .ariaLabel('Lucky day')
                .targetEvent(d)
                .ok('Confirmar')
                .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
                materiaService.Materia.delete({ id: d.id }, function(r) {
                    $log.log("Se eliminó materia:" + JSON.stringify(d));
                    toastr.success('Se eliminó el materia ' + d.materia, 'materia');
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

    .controller("MateriaSaveCtrl", function($scope, $state, $stateParams, materiaService, $window, $mdDialog, $log, toastr, $filter) {
        $scope.materia = {};
        
        $scope.sel = function() {
            materiaService.Materia.get({ id: $stateParams.id }, function(r) {
                $scope.materia = r;
                
            }, function(err) {
                $log.log("Error in get:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        };
        if ($stateParams.id) {
            $scope.sel();
        }
        $scope.save = function() {
            if ($scope.materia.id) {
                materiaService.Materia.update({ id: $scope.materia.id }, $scope.materia, function(r) {
                    $log.log("r: " + JSON.stringify(r));
                    toastr.success('Se editó el Materia  ' + r.nombre, 'Materia');
                    $state.go('acuerdo.acuerdo.materia');
                }, function(err) {
                    $log.log("Error en actualizar:" + JSON.stringify(err));
                    toastr.error(err.data.detail, err.status + ' ' + err.statusText);
                });
            } else {
                $scope.materia.estado = true;
                materiaService.Materia.save($scope.materia, function(r) {
                    $log.log("r: " + JSON.stringify(r));
                    toastr.success('Se insertó el materia ' + r.nombre, 'Materia');
                    $state.go('acuerdo.acuerdo.materia');
                }, function(err) {
                    $log.log("Error in save:" + JSON.stringify(err));
                    toastr.error(err.data.detail, err.status + ' ' + err.statusText);
                });
            }
        };
        $scope.cancel = function() {
            $state.go('acuerdo.acuerdo.materia');



        };
    });
