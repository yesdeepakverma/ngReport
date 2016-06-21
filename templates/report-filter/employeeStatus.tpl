<dtml-comment>
</dtml-comment>
<div name="employeeStatus">
    <span  id="filter_label">{{report.filters.labels.employeeStatus}}</span>
    <span  id="filter_field">
        <select 
        name='employeeStatus' 
        id='employeeStatus' 
        data-ng-options="status.name for status in report.employeeStatus track by status.id"
        data-ng-model="report.filters.employeeStatus"
        >
        </select>
    </span>
</div>
