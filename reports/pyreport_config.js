function EmployeeFilter(){
    /*This returns the required html to be places to create employee filter with select all checkbox
    This will be moved to angular directive further to be used like a plug and play thing
    */
}

function GroupFilter(){
    /*This returns the required html to be places to create Group filter with select all checkbox
    This will be moved to angular directive further to be used like a plug and play thing
    */
}

function EmployeeStatusFilter(){
    /*This returns the required html to be places to create Employee Status Filter filter with select all checkbox
    This will be moved to angular directive further to be used like a plug and play thing
    */
}

function DocumentStatusFilter(){
    /*This returns the required html to be places to create dynamic doc status filter Status Filter filter with select all checkbox
    This will be moved to angular directive further to be used like a plug and play thing
    */
}

function DynamicDocumentFilter(){
    /*This returns the required html to be places to create dynamic doc filter by their name Filter with select all checkbox
    This will be moved to angular directive further to be used like a plug and play thing
    */
}

function KeywordSearchFilter(){
    /*This returns the required html to be places to dynamic keyword filter by their name Filter with select all checkbox
    This will be moved to angular directive further to be used like a plug and play thing
    */
}

var dynamicDisclosureReportfilter = [
    'Employee', 'Group', 'DynamicDocument', 'dynamicDocQuestion', 'KeywordSearch'
]

var Report_DynamicDisclosureReport = [
            ['Employee Name','employee_name', 'employee_name'],
            ['Employee ID','employee_id','employee_id'],
            ['Job Title','job_title','job_title'],
            ['Division','division','division'],
            ['Org level 1','orglevel1','orglevel1'],
            ['Org level 2','orglevel2','orglevel2'],
            ['Document Name','document_name','document_name'],
            ['Group Name','group_name','group_name'],
            ['Document Status','document_status','document_status'],
            ['Accepted By','accepted_by','accepted_by'],
            ['Notes', 'notes',function(row){}],
            ['Communication','communication', function(row){}],
            ['Attachment(s)', 'attachment',function(row){}],
            ['Question Type','question_type','question_type'],
            ['Questions', 'question',function(row){}],
            ['Answers','answer', function(row){

            }]
]

report_config_mapping = {
    'employeeDisclosure': Report_DynamicDisclosureReport
}

