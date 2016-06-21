var reportApp = angular.module('reportApp');

filterTypeTagMapping = {
    'employeeSearch': 'employeeSearch.tpl',
    'groupSearch': 'groupSearch.tpl',
    'employeeStatus': 'employeeStatus.tpl',
    'docSearch': 'docSearch.tpl',
    'docStatus': 'docStatus.tpl',
    'docQuestionSearch': 'docQuestionSearch.tpl',
    'KeywordSearch': 'keywordSearch.tpl'
}

var filterDir = 'report-filter/'
var getTemplateUrl = function(filterName){
    template_name_ = filterTypeTagMapping[filterName];
    return filterDir+filterName+'.tpl';
}


var reportFilter = function($rootScope, $compile, $http, filterService){
    return{
        restrict: 'E',
        replace: true,      
        scope:true,
        link: function($scope, elem, attrs){
                filterName = attrs.filterName;
                template_name = getTemplateUrl(filterName);
                $http.get(template_name).then(function(result){
                        $(elem).html(result.data).show();
                        $compile(elem.contents())($scope);
                        fName = elem.attr('filter_name');
                        try{
                            filterService[fName] && filterService[fName]($scope);}
                        catch(err){}
                    });
        },
    }
}

reportApp.directive('reportFilter', ['$rootScope', '$compile', '$http', 'filterService', reportFilter]);
// reportApp.directive('autoComplete', ['$compile', '$http', 'employeeSearchService', autoComplete]);
