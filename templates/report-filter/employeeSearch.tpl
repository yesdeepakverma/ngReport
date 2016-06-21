<dtml-comment>
</dtml-comment>
<div name="employeeSearch">
    <span  id="filter_label">{{report.filters.labels.employeeSearch}}
    </span>
    <span id="filter_field">
        <input 
            type="text" 
            id="svap_autocomplate" 
            placeholder="Please enter employee name" 
            style="padding-right: 25px;" 
            data-ng-model="report.filters.texts.svapIns"
            data-ng-change="setResetFilter('svapIns')"
            />
            <i id="fontawesome" class="fa fa-search"></i>
    </span>
</div>
