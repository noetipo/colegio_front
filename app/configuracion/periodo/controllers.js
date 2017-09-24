app

    .controller("PeriodoCtrl", function($scope, $state, $stateParams, periodoService, $window, $mdDialog, $log, toastr, $filter) {
        //Valores iniciales
        $scope.fields = 'nombre,descripcion';
        var params = {};
        $scope.lista = [];
        $scope.periodo = {};

        $scope.list = function(params) {
            $scope.isLoading = true;
            periodoService.Periodo.query(params, function(r) {
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
                .textContent('Todos los campos relacionados con: '+d.periodo+' serán eliminados.')
                .ariaLabel('Lucky day')
                .targetEvent(d)
                .ok('Confirmar')
                .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
                periodoService.Periodo.delete({ id: d.id }, function(r) {
                    $log.log("Se eliminó Cargo:" + JSON.stringify(d));
                    toastr.success('Se eliminó el Cargo ' + d.periodo, 'Cargo');
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

    .controller("PeriodoSaveCtrl", function($scope, $state, $stateParams, periodoService, $window, $mdDialog, $log, toastr, $filter) {
        $scope.periodo = {};
        
        $scope.sel = function() {
            periodoService.Periodo.get({ id: $stateParams.id }, function(r) {
                $scope.periodo = r;
                
            }, function(err) {
                $log.log("Error in get:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        };
        if ($stateParams.id) {
            $scope.sel();
        }
        $scope.save = function() {
            if ($scope.periodo.id) {
                periodoService.Periodo.update({ id: $scope.periodo.id }, $scope.periodo, function(r) {
                    $log.log("r: " + JSON.stringify(r));
                    toastr.success('Se editó el periodo  ' + r.nombre, 'Periodo');
                    $state.go('acuerdo.acuerdo.periodo');
                }, function(err) {
                    $log.log("Error en actualizar:" + JSON.stringify(err));
                    toastr.error(err.data.detail, err.status + ' ' + err.statusText);
                });
            } else {
                $scope.periodo.estado = true;
                periodoService.Periodo.save($scope.periodo, function(r) {
                    $log.log("r: " + JSON.stringify(r));
                    toastr.success('Se insertó el periodo ' + r.nombre, 'periodo');
                    $state.go('acuerdo.acuerdo.periodo');
                }, function(err) {
                    $log.log("Error in save:" + JSON.stringify(err));
                    toastr.error(err.data.detail, err.status + ' ' + err.statusText);
                });
            }
        };
        $scope.cancel = function() {
            $state.go('acuerdo.acuerdo.periodo');



        };
    });
