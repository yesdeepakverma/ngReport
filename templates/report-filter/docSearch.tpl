<dtml-comment>
</dtml-comment>
<div name="docSearch">
    <span  id="filter_label">{{report.filters.labels.docSearch}}</span>
    <span id="filter_field">
        <input 
            type="text" 
            id="doc_autocomplate" 
            placeholder="Please type document name" 
            style="padding-right: 25px;"
            data-ng-model="report.filters.texts.docId"
            data-ng-change="setResetFilter('docId', 'docQuestionID')"
            />
            <i id="fontawesome" class="fa fa-search"></i>
    </span>
</div>
