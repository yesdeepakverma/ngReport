// Master ng-application for reports

var ngReportDependency = [];
var reportApp  = angular.module('reportApp', ngReportDependency);

//reportApp.config(function(paginationTemplateProvider) {
//    paginationTemplateProvider.setPath('/report-filter/dirPagination.tpl.html');
//});

// idea is to create a seperate controller for every report that will share directive