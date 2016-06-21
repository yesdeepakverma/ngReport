<dtml-comment>
</dtml-comment>
<div name="docStatus">
    <span id="filter_label">{{report.filters.labels.docStatus}}</span>
    <span id="filter_field">
        <select 
            name='docStatus' 
            id='docStatus'
            data-ng-options="status.name for status in report.docStatus track by status.id"
            data-ng-model="report.filters.docStatus" >
        </select>
    </span>
</div>
