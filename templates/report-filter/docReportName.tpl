<dtml-comment>
</dtml-comment>
<div name="docSearch">
    <span  id="filter_label">{{report.filters.labels.docReportName}}</span>
    <span  id="filter_field"> 
        <input 
            type="text" 
            id="reportName" 
            placeholder="Please enter report name" 
            style="padding-right: 25px;" 
            data-ng-model="report.filters.reportName"
            />
    </span>
</div>