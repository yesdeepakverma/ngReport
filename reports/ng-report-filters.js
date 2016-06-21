var reportApp = angular.module('reportApp');
var cleanHtml = function(){
    return function(value_, key_, row){
        var value = value_;
        key = key_.toLowerCase()
        if(key=='questions' || key=='notes'){
            value = $('<p/>').html(value).text();
            if (row && row['Question Type'] && row['Question Type'].toLowerCase()=='table'){
                value= tableTypeQuestion(value);
            }
        }
        // else if(key=='answers'){
        //     // value = tableTypeAnswer(value, row);
        // }
        // else if(key=='communication' || key=='communicaton'){
        //     value = createCommunicationLink(value, row);
        // }
        return value;
    }
}

var tableTypeQuestion = function(value){
    return value.split('|')[0];
}

// var tableTypeAnswer = function(value, row){
//     if(row && row['Question Type'] && row['Question Type'].toLowerCase()=='table'){
//         var question = row['Questions'] || '';
//         var col_headers_ = question.split('|')[1];// check for length here
//         var table_ = $('<table />');
//     }
//     return value;
// }

// var createCommunicationLink = function(value, row){
//     if (value!='N/A'){
//         var empIns = row['Svap_Instance'] || 0;
//         var docName = row['Document Name'] || '';
//         var docId = row['doc ID'] || 0;
//         var href_ = "/COE/Create_doc_Case?empins="+empIns+"&docname="+docName+"&docid="+docId;
//         var value =  $('<span />').append($('<a />', {href: href_, target: '_blank'}).text('View')).html();
//     }
//     return value;
// }


reportApp.filter('cleanHtml', cleanHtml);