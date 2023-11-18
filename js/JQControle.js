jQuery(document).ready(function () {
  // inisialization de map
  initMAP();
  $("#datetextbox").val(getDateToday());

  $("#wilaya").change(function () {
    $("#listpharmacie").empty(); // set the list of pharmacy empty
    $("#Pharmaciename").empty();
    SetWilaya();
    getListPharmaciy();
    // add a list of options to LIST
    ListOptionWilaya();
  });

  $("#Pharmaciename").change(function (e) {
    alert("Selectionment de pharmacy");

  });

  // Create le event pour faire les traitement
  $("#chercher").click(function () {
    history.go(0); // refrech de page
    initMAP();    
  });

  $("#medication").change(function () {
    $(".alert-dark").fadeOut();
    SetListMedicament();
  });
})