$(function () {
  $("table.datatable").DataTable({
    retrieve: true,
    paging: true,
    lengthChange: true,
    searching: true,
    ordering: true,
    info: true,
    autoWidth: false,
    responsive: true,
  });
});
