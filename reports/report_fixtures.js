// sample data for reports
/*
Backend procedure name for employee disclosure report
usp_DisclosureDocumentReport
    @Client_Instance INT,
    @Instance   INT=0,
    @Login_Instance  INT,
    @Group_ID   INT=0,
    @DOC_ID    INT=0,
    @Question   varchar(8000)='Question',
    @DDReport_Status VARCHAR(20)='All',
    @Searched_Keyword varchar(500)='Keyword'
/

/*
            ['Employee Name','employee_name'],
            ['Employee ID','employee_id'],
            ['Job Title','job_title'],
            ['Division','division'],
            ['Org level 1','orglevel1'],
            ['Org level 2','orglevel2'],
            ['Document Name','document_name'],
            ['Group Name','group_name'],
            ['Document Status','document_status'],
            ['Accepted By','accepted_by'],
            ['Notes',function(row){}],
            ['Communication', function(row){}],
            ['Attachment(s)',function(row){}],
            ['Question Type','Currency'],
            ['Questions','Post_Date'],
            ['Answers', function(row){}]
*/

employeeDisclosureFixture = [{
    'employee_name': 'Deepak verma',
    'employee_id': 1,
    'job_title': 'Software Engineer',
    'division': 'Technology',
    'orglevel1': 'Services',
    'orglevel2': 'Technology',
    'document_name': 'My document',
    'group_name': 'General Group',
    'document_status': 'Pending',
    'accepted_by': 'Sample User',
    'notes':'These are my notes',
    'communication': 123123,//caseid
    'attachment': 123, //file_id
    'question_type': '1',//question type
    'question':'<p>This is my question in html</p>',
    'answer':'<p>This is my answer</p>'
},{
    'employee_name': 'Software Engineer II',
    'employee_id': 2,
    'job_title': 'Software Engineer I',
    'division': 'Technology',
    'orglevel1': 'Services',
    'orglevel2': 'Technology',
    'document_name': 'My document',
    'group_name': 'General Group',
    'document_status': 'Pending',
    'accepted_by': 'Sample User',
    'notes':'These are my notes',
    'communication': 123123,//caseid
    'attachment': 123, //file_id
    'question_type': 1,//question type
    'question':'<p>This is my question in html</p>',
    'answer':'<p>This is my answer</p>'
},{
    'employee_name': 'Enginner 3',
    'employee_id': 123123,
    'job_title': 'Software Engineer II',
    'division': 'Technology',
    'orglevel1': 'Services e',
    'orglevel2': 'Technology',
    'document_name': 'My document',
    'group_name': 'General Group',
    'document_status': 'Pending',
    'accepted_by': 'Sample User',
    'notes':'These are my notes',
    'communication': 123123,//caseid
    'attachment': 123, //file_id
    'question_type': 1,//question type
    'question':'this is table header|date:date of birth:M|amount:what is your salary|single,opt1,opt2,opt3: choose one|mulitple,op1,op2,op3: select mulitple',
    'answer':'date:amount:single:multiple|12/12/2015:123:opt1:op1,op2|11/11/2016:121212:opt2:op1'
}
]

report_fixture_mapping = {
    'employeeDisclosure': employeeDisclosureFixture
}