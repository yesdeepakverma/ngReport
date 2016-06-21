// Some angular scripts to get filter data and call service when clicked on 'Generate Report'
var reportApp = angular.module('reportApp');

var filterService = function($http){
    this.employeeSearch = function($scope){
            var employeeBody = {'filter_name':'employeeSearch', 'elemKey':'svapIns'}
            $scope.autoComplete($('#svap_autocomplate'),
                $scope.report.reportFiltersPyscriptMapping['employeeSearch'],
                employeeBody
            );
    }
    this.groupSearch = function($scope){
        var groupBody=  {'filter_name':'groupSearch', 'elemKey':'groupId'}
        $scope.autoComplete($('#group_autocomplate'),
            $scope.report.reportFiltersPyscriptMapping['groupSearch'],
            groupBody);
    }
    this.docSearch = function($scope){
        var docBody = {'filter_name':'docSearch', 'elemKey':'docId'}
        $scope.autoComplete($('#doc_autocomplate'),
        $scope.report.reportFiltersPyscriptMapping['docSearch'],
        docBody);
    }
    this.docQuestionSearch = function($scope){
        var questionBody = {'filter_name':'docQuestionSearch', 'elemKey':'docQuestionID'};
        $scope.autoComplete($('#question_autocomplate'),
            $scope.report.reportFiltersPyscriptMapping['docQuestionSearch'],
            questionBody);
    }
    this.keywordSearch = function($scope){

    }
}

var lagacyAjaxService = function(url, data, method, dataType, callback){
    var response_ = [];
    if (data.purpose=='DOWNLOAD'){
        var downloadForm = $('<form />', {action: url, target:'_blank'});
        $.each(data, function(key, value){
            var inputHidden = $('<input />', {type:'hidden', name:key, value: value});
            downloadForm.append(inputHidden);
        });
        var submitBtn = $('<input />', {type: 'submit', value:'submit'});
        downloadForm.submit();
        return;
    }
    var async_ = true;
    if(data['async'] != undefined){
        async_ = false;
    }
    $.ajax({
        method: method || 'GET',
        url: url,
        dataType: dataType || 'json',
        cache: false,
        async: async_,
        data: data || {},
        //random_: Math.random(),
        success: function(response, statusText, jqXhr){
            if (callback){
                callback();
            }
            response_=response;
        },
        error: function(){
            alert('Server Error');
            }
    });
    return response_;
}


function createRequestBody(baseDict, otherDict){
    var requestBody = angular.copy(baseDict);
    for (var key in otherDict) { requestBody[key] = otherDict[key]; };
    return requestBody;
}
reportApp.service('filterService', ['$http', filterService]);