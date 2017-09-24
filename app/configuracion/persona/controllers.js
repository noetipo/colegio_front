app

    .controller("PersonaCtrl", function($scope, $state, $stateParams, personaService, $window, $mdDialog, $log, toastr, $filter) {
        //Valores iniciales
        $scope.fields = 'nombre,descripcion';
        var params = {};
        $scope.lista = [];
        $scope.cargo = {};

        $scope.list = function(params) {
            $scope.isLoading = true;
            personaService.Persona.query(params, function(r) {
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
                personaService.Persona.delete({ id: d.id }, function(r) {
                    $log.log("Se eliminó Cargo:" + JSON.stringify(d));
                    toastr.success('Se eliminó el Cargo ' + d.nombre, 'Cargo');
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

    .controller("PersonaSaveCtrl", function($scope, $state, $stateParams, personaService, $window, $mdDialog, $log, toastr, $filter) {
        $scope.persona = {};
        
        $scope.sel = function() {
            personaService.Persona.get({ id: $stateParams.id }, function(r) {
                $scope.persona = r;
                
            }, function(err) {
                $log.log("Error in get:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        };
        if ($stateParams.id) {
            $scope.sel();
        }
        $scope.save = function() {
            if ($scope.persona.id) {
                personaService.Persona.update({ id: $scope.persona.id }, $scope.persona, function(r) {
                    $log.log("r: " + JSON.stringify(r));
                    toastr.success('Se editó el persona  ' + r.nombre, 'Persona');
                    $state.go('acuerdo.acuerdo.persona');
                }, function(err) {
                    $log.log("Error en actualizar:" + JSON.stringify(err));
                    toastr.error(err.data.detail, err.status + ' ' + err.statusText);
                });
            } else {
                $scope.persona.estado = true;
                personaService.Persona.save($scope.persona, function(r) {
                    $log.log("r: " + JSON.stringify(r));
                    toastr.success('Se insertó el Persona ' + r.nombre, 'Persona');
                    $state.go('acuerdo.acuerdo.persona');
                }, function(err) {
                    $log.log("Error in save:" + JSON.stringify(err));
                    toastr.error(err.data.detail, err.status + ' ' + err.statusText);
                });
            }
        };
        $scope.cancel = function() {
            $state.go('acuerdo.acuerdo.persona');



        };
    });
