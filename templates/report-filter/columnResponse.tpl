<dtml-comment>
</dtml-comment>

<div>
    <span data-ng-if="(config=='Communication')">
        <span data-ng-show="row[config]!='N/A'">
            <a href="/Reporting/COEReports/View_Communication?{{row['case_id']}}" target="_blank">View</a>
        </span>
        <span data-ng-show="row[config]=='N/A'">
            {{ row[config] }}
        </span>
    </span>
    <span data-ng-if="config!='Communication'">
        <span data-ng-if="config=='Answers' && row['Question Type']=='Table'">
            <span data-ng-show="row['Answers']" data-ng-if="row['Question Type']=='Table'"> 
                <table>
                    <thead>
                        <tr>
                            <th data-ng-repeat="(inx_, header_) in row['Questions'].split('&amp;#124;')" data-ng-if="inx_ > 0">                        
                                {{header_.split('&amp;#58;')[1]}}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr data-ng-repeat="(idx ,row_) in row['Answers'].split('|')" ng-if="idx > 0">
                            <td data-ng-repeat="col_ in row_.split(':')">
                                {{col_}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </span>
            <span data-ng-if="row['Question Type']!='Table'">
                {{row[config] | cleanHtml:config:row}}                
            </span>
        </span>
        <span data-ng-if="config!='Answers'">
            <span data-ng-if="config=='Attachment(s)'">
                <a data-ng-show="row[config]!='N/A'" href="/downloadFiles/{{row[config]}}" target="_blank">{{row[config]}}</a>
                {{(row[config]=='N/A' && 'N/A') || ''}}
            </span>
            <span data-ng-if="config!='Attachment(s)'">
                {{row[config] | cleanHtml:config:row}}
            </span>
        </span>
    </span>
</div>