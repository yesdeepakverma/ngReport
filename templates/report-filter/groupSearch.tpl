<dtml-comment>
</dtml-comment>
<div name="groupSearch">
    <span id="filter_label">{{report.filters.labels.groupSearch}}</span>
    <span id="filter_field"> 
        <input 
            type="text" 
            id="group_autocomplate" 
            inst_attr='0' 
            placeholder="Please enter group name" 
            style="padding-right: 25px;"
            data-ng-model="report.filters.texts.groupId"
            data-ng-change="setResetFilter('groupId')"
            />
        <i id="fontawesome" class="fa fa-search"></i>
    </span>
</div>
