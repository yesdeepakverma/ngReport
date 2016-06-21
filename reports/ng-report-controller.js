var reportApp = angular.module('reportApp');

var report_filter_controller = function($scope){
}

var report_table_controller = function($scope, $http){
}

var report_controller = function($scope, $location, $http, filterService){
    $scope.loading = true;
    $scope.initialized = false;
    $scope.disableQuestion= true;
    $scope.report = {
        testAnswer: '1:2:3:4:5|1:2:3:4:53|6:7:8:9:10',
        reportDataFixture: [],
        reportConfig : [],
        ReportHeader : '',
        generated: false,
        reportFilterURL : '/getReportFilterData',
        reportPostURL : '/pyreportData',
        reportProcedure : '',
        reportFilters : [],
        reportFiltersPyscriptMapping : {},
        filterProcedures:{},
        staticFilters : ['employeeStatus', 'docStatus'],
        totalRecords: 0,
        itemPerPageList: [],
        reportCols: 0,
        spinner:{},
        filters: {
            labels: {},
            texts:{
                groupId:'All',
                svapIns:'All',
                docId:'All',
                docQuestionID:''    
                },
            reportName: '',
            pageNum: 1,
            // docStatus: {"id":1,"name":"Accepted"},
            docStatus: {"id":-1,"name":"All"},
            docStatusF: -1,
            groupId: -1,
            svapIns: -1,
            docId: -1,
            docQuestionID: '',
            report_header: '',
            keyword: ''
        }
    }

    $scope.orderBy = '';
    $scope.reverse = true;
    $scope.report.defaults = angular.copy($scope.report.filters);
    $scope.setResetFilter = function(modelName, resetRelated){
        if (!$scope.report.filters.texts[modelName].trim().length){
            if(resetRelated){$scope.setToDefault(resetRelated);}
            $scope.setToDefault(modelName);
        }
        // check if after selection input filed is cleared or not
    }
    $scope.setToDefault = function(modelName){
        // $scope.report.filters.texts[modelName] = $scope.report.defaults.texts[modelName];
        $scope.report.filters[modelName] = $scope.report.defaults[modelName];
    }
    $scope.ajaxReportService = function(url, requesBody, method, dataType, callBackHook){
        var response_ = [];
        if (url.indexOf('/')!=0){
            url = '/'+url;
        }
        requesBody['r_'] = Math.random();
        if (requesBody.purpose=='DOWNLOAD'){
            var downloadForm = $('<form />', {action: url,name:'Download Report', target:'_blank', method:'post'});
            $.each(requesBody, function(key, value){
                var inputHidden = $('<input />', {type:'hidden', name:key, value: value});
                $(downloadForm).append(inputHidden);
            });
            var submitBtn = $('<input />', {type:'submit'})
            downloadForm.append(submitBtn);
            downloadForm.attr("enctype", "multipart/form-data");
            downloadForm.appendTo('body').submit();
            downloadForm.remove();
        }
        else{
            var req = {
                method: method || 'GET',
                dataType: dataType || 'json',
                url: url,
                params : requesBody
            }

            $http(req).then(function(response){
                if(callBackHook){
                    callBackHook(requesBody, response.data);
                }
            }, function(response){
                alert('Server Error: 502');
                if (window.console){
                    console.warn(response);
                }
            });
        }
        return true;
    }


    $scope.sortReport = function (column) {
        $scope.orderBy = column;
        $scope.reverse = !$scope.reverse;
    }
    $scope.predicate = function(rows) {
        return rows[$scope.orderBy];
    }


    $scope.initializeReport = function(reportHeader){
        // Initialize the report , get filters and other meta data from the backend
        $scope.report.ReportHeader = reportHeader;
        $scope.report.totalRecords = 0;
        $scope.report.itemPerPage = 100;
        $scope.createReportFilters();
        $("#noresult").hide();
    }

    $scope.createReportFilters = function(){
        var report = $scope.report;
        $scope.ajaxReportService('/pyreportData', {report_header:report.ReportHeader, purpose: 'reportInitialize', 'pcd': 'usp_GetReportFilter'}, 'GET', 'json', $scope.filterCallback);
    }

    $scope.filterCallback = function(requesBody, data){
        // Call this ASAP response available, 
        //this creates mapping and renders the filters using their directives
        var report = $scope.report;
        var responseFilterData = data.data;
        $.each(responseFilterData, function(idx, row){
            report.ReportHeader = row.ReportHeader;
            report.filters.report_header = row.ReportHeader;

            report.reportProcedure = row.ReportProcedureName;
            report.filterProcedures[row.FilterName] = row.FilterProcedure;

            report.filters.labels[row.FilterName] = row.FilterLabel;
            report.reportFilters.push(row.FilterName);

            report.reportFiltersPyscriptMapping[row.FilterName] = row.FilterPythonScript;
            report.reportPostURL = row.ReportPyScript;
            report.reportId = report.filters.reportId = row.ReportId;

            report.arrayPageLst = row.arrayPageLst || [50, 100, 150, 200];
            if ((row.DisplayColumns.lastIndexOf('~')+1)==row.DisplayColumns.length){
                report.DisplayColumns = row.DisplayColumns.trim().slice(0, -1);
            }
            report.displayHeaders = report.DisplayColumns.trim().split('~');
            report.filters.displayColumns = report.DisplayColumns;
        });

        $.each(report.staticFilters, function(idx, sFilter){
            if (report.reportFilters && report.reportFilters.indexOf(sFilter)!=-1 ){
                $scope.ajaxReportService('/pyreportFilter', 
                    {'filter_name':sFilter, 'reportId': report.reportId, 'pcd':report.filterProcedures[sFilter]},
                     'GET', 
                     'json', 
                     $scope.callbackStaticFilter);
            }
        });
        $scope.loading = false;
        $scope.initialized = true;
    }
    $scope.callbackStaticFilter = function(requesBody, response){
        $scope.report[requesBody['filter_name']] = response.data;
        $scope.report.filters[requesBody['filter_name']] = response.data[0];

    }

    $scope.autoComplete = function(element, ajaxURl, requestBody_){
        var requestBody = requestBody_;
        $(element).autocomplete({
        focus: function( event, ui ) {
                $(element).val(ui.item.label );
                return false;
            },
        notFound: function(term){
            return "No items were found starting with '" + term + "'";
        },
        source: function(request, response) {
           requestBody['typeAhead'] = request.term;
           requestBody['async'] = false;

           var requestBodyAjax_ = createRequestBody($scope.report.filters, requestBody);
           requestBodyAjax_['pcd'] = $scope.report.filterProcedures[requestBodyAjax_['filter_name']];

           var responseFixture = lagacyAjaxService(ajaxURl, requestBodyAjax_, 'GET', 'json', undefined);
           array = $.map(responseFixture.data, function (value, key) {
                    label = value.name;
                    if (requestBody.elemKey=='docQuestionID' && value.type==9){
                        // if table tyoe question in autocomplete
                        label = label.split('&#124;')[0];
                    }
                    return {
                           label: $('<p/>').html(label).text(),
                           value: value.id
                           };
                    });
                var fiteredArray = $.ui.autocomplete.filter(array, request.term);
                if (!fiteredArray.length){
                    noresult_ = [{label: 'No result found', value: -1}]
                    Array.prototype.push.apply(noresult_, fiteredArray);
                    fiteredArray = noresult_;
                }
                else{
                    all_ = [{label: 'All', value: -1}]
                    Array.prototype.push.apply(all_, fiteredArray);
                    fiteredArray = all_;
                }
                response(fiteredArray);
                },
                select: function( event, ui ) {
                    label = ui.item.label;
                    value = ui.item.value;
                    if(label=='No result found'){
                        label='All';
                    }
                    $(this).val(label);
                    if (requestBody && requestBody.elemKey){
                       $(this).attr(requestBody.elemKey, value);

                        if($scope){
                            $scope.report.filters[requestBody.elemKey] = value;                            
                            if (requestBody.elemKey=='docId' && value==-1){
                                $scope.report.filters.docQuestionID=$scope.report.defaults.docQuestionID;
                                $scope.report.filters.texts.docQuestionID=$scope.report.defaults.texts.docQuestionID;
                                $("#question_autocomplate").attr('disabled', 'disabled');
                            }
                            else{
                                $("#question_autocomplate").removeAttr('disabled');
                            }
                        }
                    }
                    event.preventDefault();
               }
       });
    }

    $scope.generateReport = function(reportName, pageNum, purpose){
        var report = $scope.report;
        if (!report.filters.reportName.trim()){
            alert('Please enter Report Name.');
            return false;
        }
        $("div.inprocess").show();
        filters = report.filters;
        filters['pageNum'] = pageNum || 1;
        filters['itemPerPage'] = report.itemPerPage || 100;
        filters['docStatusId'] = report.filters.docStatus.id || 0;
        report.pageNum = pageNum || 1;
        report.generated = false;

        var requestBody = angular.copy(filters);
        requestBody['purpose'] = purpose || 'GET';
        requestBody['pcd'] = report.reportProcedure;

        if (purpose=='DOWNLOAD'){
            requestBody['itemPerPage'] = 999999;// Holy, 9 lacks records
            $scope.ajaxReportService(report.reportPostURL, requestBody, 'GET', 'json', undefined);
        }
        else{
            $scope.loading = true;
            $scope.ajaxReportService(report.reportPostURL, requestBody, 'GET', 'json', function(requestBody, response){
                report.reportDataFixture = response.data;
                report.totalRecords = response.totalRecords || response.data.length;

                if(report.totalRecords){
                    report.reportCols=Object.keys(report.reportDataFixture[0]);
                    report.reportConfig=report.reportCols;
                }
                report.totalPages = Math.ceil($scope.report.totalRecords/$scope.report.itemPerPage);
                report.pageIndexLst = $scope.pageRange(1, report.totalPages+1);
                report.generated = true;
                $scope.loading = false;
            });
        }
        return true;
    }

    $scope.pageRange = function(start, end, step) {
        pagenum = $scope.report.pageNum;
        if (arguments.length == 1) {
            end = start;
            start = 0;
        }
        // Validate the end and step numbers.
        end = end || 0;
        step = step || 1;
        // Create the array of numbers, stopping befor the end.
        for (var ret = []; (end - start) * step > 0; start += step) {
            ret.push([start, start]);
        }
        if (ret.length >10){
            var ret_ = ret;
            ret = [];
            if (pagenum>5){
                ret.push([1,1]);
                ret.push([2,2]);
                ret.push([0,'...']);
                ret.push([pagenum-2, pagenum-2]);
                ret.push([pagenum-1, pagenum-1]);
                ret.push([pagenum, pagenum]);
                if(ret_.length==pagenum){
                }
                else if(ret_.length-pagenum == 1){
                    ret.push([pagenum+1, pagenum+1]);
                }
                else if(ret_.length-pagenum == 2){
                    ret.push([pagenum+1, pagenum+1]);
                    ret.push([pagenum+2, pagenum+2]);
                }
                else if(ret_.length-pagenum == 3){
                    ret.push([pagenum+1, pagenum+1]);
                    ret.push([pagenum+2, pagenum+2]);
                    ret.push([ret_.length, ret_.length]);
                }
                else{
                    ret.push([pagenum+1, pagenum+1]);
                    ret.push([pagenum+2, pagenum+2]);
                    if(ret_.length-pagenum > 4){
                        ret.push([0,'...']);
                    }
                    ret.push([ret_.length-1, ret_.length-1]);
                    ret.push([ret_.length, ret_.length]);
                }
            }
            else{
                $.each([1,2,3,4,5,6,7], function(idx, value){
                    ret.push([value, value]);                   
                });
                ret.push([0,'...']);
                ret.push([ret_.length-1, ret_.length-1]);
                ret.push([ret_.length, ret_.length]);
            }
        }
        return ret;
    }

    $scope.scheduleReport = function(reportName){
        //|| $scope.reportName
    }

    $scope.resetReport = function(reportName){
        //|| $scope.reportName
        $scope.report.reportDataFixture = [];
    }

    //$scope.employeeSearchFunction = employeeSearchService.employeeSearch($scope);
}

//reportApp.controller('report_filter_controller', report_filter_controller);
//reportApp.controller('report_table_controller', report_table_controller);
reportApp.controller('report_controller', ['$scope', '$location', '$http', 'filterService', report_controller]);
