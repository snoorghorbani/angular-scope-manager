angular
	.module("scopeManager", ["sutility"])
		.service('scopeManager', ['$rootScope', '$injector', '$state', '_', function ($rootScope, $injector, $state, _) {
		    var CS_DB_COMMAND_PREFIX = 'cs.db.';

		    var ScopeManager = function ScopeManager(scope, identifier) {
		        this.scope = scope;
		        this.identifier = identifier;
		        //TODO : think about remove scope.emitter
		        //scope.emitter = this.emitter = new Emitter('controller', scope, identifier);
		        //scope.states = this.states = new States(scope);
		        //scope.states.register('load', function () {
		        //    return true;
		        //});
		        //scope.states.register('save');

		        scope.CONTROLLER_NAME = identifier;
		        scope.fn = {};
		        scope.value = {};
		        scope.shared = scope.shared || {};

		        scope.cs = this;
		    }

		    //#region ScopeManager Prototype
		    ScopeManager.prototype.db = ScopeManager.prototype.db || {};
		    ScopeManager.prototype.model = ScopeManager.prototype.model || {};
		    ScopeManager.prototype.notification = ScopeManager.prototype.notification || {};

		    ScopeManager.prototype.value = function (key, value) {
		        if ($rootScope.debugMode && this.scope.value[key]) debugger;

		        return (this.scope.value[key]) ? this.scope.value[key] : this.scope.value[key] = value;
		    };
		    ScopeManager.prototype.shared = function (key, value) {
		        if ($rootScope.debugMode && this.scope.shared[key]) debugger;

		        return (this.scope.shared[key]) ? this.scope.shared[key] : this.scope.shared[key] = value;
		    };
		    ScopeManager.prototype.fn = function (name, fn) {
		        if ($rootScope.debugMode && this.scope.fn[name]) debugger;

		        this.scope.fn[name] = fn;
		    };
		    ScopeManager.prototype.uiModel = function (context, name, uiModelPropertiesConstructor) {
		        ScopeManager.prototype.model[context][name].prototype.uiModelPropertiesConstructor = uiModelPropertiesConstructor;
		    };
		    //#endregion

		    //#region register command handler

		    var commandHandler = function (command) {
		        var fn;
		        //var command = Emitter.prototype.parse(command);
		        var action = '';
		        if (command.identifier.search(CS_DB_COMMAND_PREFIX) > -1) {
		            action = command.identifier.substr(CS_DB_COMMAND_PREFIX.length);
		            var actionPath = action.split('.')
		            if (!ScopeManager.prototype.db[actionPath[0]][actionPath[1]]) alert('incorrect command: ' + CS_DB_COMMAND_PREFIX + command);

		            fn = ScopeManager.prototype.db[actionPath[0]][actionPath[1]];
		        } else return null;

		        return {
		            fn: fn,
		            command: null
		        }
		    }
		    //Emitter.handler(commandHandler);

		    //#endregion


		    return ScopeManager;
		}]);