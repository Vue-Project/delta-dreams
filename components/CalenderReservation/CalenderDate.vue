<template>
  <div class="col-12 col-xl-12 col-sm-12 order-1 order-lg-2 mb-4 mb-lg-0">
    <div class="card">
      <div class="card-datatable table-responsive">
        <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
          <div class="card-header pb-0 pt-sm-0">
            <div class="head-label text-start">
              <div class="col-md-6 col-12 mb-4">
                          <label for="flatpickr-date" class="form-label">Date Picker</label>
                          <input type="text" class="form-control flatpickr-input active" placeholder="YYYY-MM-DD" id="flatpickr-date" readonly="readonly">
                        </div>            </div>
            <div class="d-flex justify-content-center justify-content-md-end">
              <div id="DataTables_Table_0_filter" class="dataTables_filter"><label>Search:<input type="search"
                    class="form-control" placeholder="" aria-controls="DataTables_Table_0"></label></div>
            </div>
          </div>
          <table class="datatables-projects table border-top dataTable no-footer dtr-column" id="DataTables_Table_0"
            aria-describedby="DataTables_Table_0_info">
            <thead>
              <tr>
                <th class="control sorting_disabled dtr-hidden" rowspan="1" colspan="1"
                  style="width: 22.125px; display: none;" aria-label=""></th>
                <th class="sorting_disabled dt-checkboxes-cell dt-checkboxes-select-all" rowspan="1" colspan="1"
                  style="width: 18.4375px;" data-col="1" aria-label=""><input type="checkbox" class="form-check-input">
                </th>
                <th class="sorting sorting_desc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
                  style="width: 83.9375px;" aria-sort="descending" aria-label="Name: activate to sort column ascending">
                  Name</th>
                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
                  style="width: 104.531px;" aria-label="Leader: activate to sort column ascending">Leader</th>
                <th class="sorting_disabled" rowspan="1" colspan="1" style="width: 78.0156px;" aria-label="Team">Team
                </th>
                <th class="w-px-200 sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
                  style="width: 200px;" aria-label="Status: activate to sort column ascending">Status</th>
                <th class="sorting_disabled" rowspan="1" colspan="1" style="width: 110.953px;" aria-label="Actions">
                  Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr class="odd">
                <td valign="top" colspan="6" class="dataTables_empty">Loading...</td>
              </tr>
            </tbody>
          </table>
          <div class="row mx-2">
            <div class="col-sm-12 col-md-6">
              <div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 0 to 0
                of 0 entries</div>
            </div>
            <div class="col-sm-12 col-md-6">
              <div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                <ul class="pagination">
                  <li class="paginate_button page-item previous disabled" id="DataTables_Table_0_previous"><a
                      aria-controls="DataTables_Table_0" aria-disabled="true" role="link" data-dt-idx="previous"
                      tabindex="-1" class="page-link">Previous</a></li>
                  <li class="paginate_button page-item next disabled" id="DataTables_Table_0_next"><a
                      aria-controls="DataTables_Table_0" aria-disabled="true" role="link" data-dt-idx="next"
                      tabindex="-1" class="page-link">Next</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "CalenderData",
layout: "main",

};
</script>


