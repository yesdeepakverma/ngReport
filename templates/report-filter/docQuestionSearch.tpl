<dtml-comment>
</dtml-comment>
<div name="docQuestionSearch"  id="docQuestionSearch">
    <span id="filter_label">{{report.filters.labels.docQuestionSearch}}
    </span>
    <span id="filter_field"> <textarea 
                    type="text" 
                    id="question_autocomplate" 
                    placeholder="Please enter question name" 
                    style="padding-right: 25px;"
                    data-ng-disabled="report.filters.docId==-1"
                    data-ng-model="report.filters.texts.docQuestionID"
                    data-ng-change="setResetFilter('docQuestionID')"
                    ></textarea>
                <i id="fontawesome" class="fa fa-search"></i>
        </span>
</div>