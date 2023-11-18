// Map inistailisation 
var map = L.map("map").setView([30.615965936476076, 1.2080078125], 5.0);// set the map to algeria corrdinater [28.0339, 2.9999825]
// set Max and Min 
// Creating OSM Layer
var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

/*  **********  */
// We Can ADD Any Map from here : https://leaflet-extras.github.io/leaflet-providers/preview/
// https://stackoverflow.com/questions/33343881/leaflet-in-google-maps
googleStreets = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);

function initMAP() {
  // adding OSM TO MAP 
  osm.addTo(map);
  // add google layer to map
  googleStreets.addTo(map);
}


/* ********************************************* 
                Functions 
/* ********************************************* */
// We Need It for Geting the name of wilaya with the Code of Wilaya :)
function getWilayadeName(code) {
  const l = listWilayat.filter((e) => e.code == code);
  return l[0].name;
}
/* ************************************************************************** */


/* ************************************************************************** */

// Init Wilaya a:)
function SetWilaya() {
  const numberWY = document.getElementById("wilaya").value;
  const NameWY = getWilayadeName(numberWY);
  var LocIcon = L.icon({
  iconUrl: "/images/Vector.svg",
  iconSize: [38, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [18, 48], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor
});
  

  var wilayat = L.geoJSON(globelwilaya, {
    onEachFeature: function (feature, layer) {
      layer.bindPopup(`Wilaya de ${feature.properties.name}`).openPopup();
    },
    filter: function (nameoff) {
      if (nameoff.properties.name == NameWY) {
        var latlng = L.latLng(
          nameoff.geometry.coordinates[1],
          nameoff.geometry.coordinates[0]
        );
        // Positionement dans le Interval de la wilya
        map.panTo(latlng);
        map.setZoomAround(latlng, 10);
        // return vrai pour Ajouter un Marker pour cette wilaya 
        return true;
      }
      return false;
    },
    pointToLayer: function (GeoGesonPont, latlng) {
      return L.marker(latlng,{icon:LocIcon});
    },
  });
  wilayat.addTo(map);
  wilayat.on('click', function (e){
    // console.log(e); //[latlng.lat , latlng.lng]
    // Zoom to the Place Where is Wilaya :) here we do things like view Places of pharmacie 
    if (map.getZoom() < 15) {
      map.flyTo(e.latlng, map.getZoom() + 5); 
    }
    // console.log(
    //   `Latlng : ${e.latlng} get Center:${map.getCenter()} Zoom:${map.getZoom()} GET BOUNDS :${map.getBounds()}`
    // );
    map.setMaxZoom(15);
  })

}

/* ************************************************************************** */


/* ************************************************************************** */

function SetListMedicament() {
  console.log(
    `SetListMedicament  ${document.getElementById("medication").value}`
  );
}

/* ************************************************************************** */


/* ************************************************************************** */
function CreateAlert(text,styleofAlert='info') {
  // Create the div element :)
  const newPharmaciy = document.createElement("div");
  // add class and style :)
  newPharmaciy.setAttribute("class", `alert alert-${styleofAlert}`);
  newPharmaciy.setAttribute("role", "alert");
  // and give it some content
  const newContent = document.createTextNode(`${text}`);
  newPharmaciy.appendChild(newContent);

  return newPharmaciy;
}
/* ************************************************************************** */

/* ************************************************************************** */
function getListPharmaciy() {
  // List Pharmacie existe in wilaya and online :) and containe the 
  const ListPharmaciy = document.getElementById("listpharmacie"); // get the object of DOM 
  const getNumeroWilaya = document.getElementById('wilaya').value; // get Numero de la Wilaya :)

  if (getNumeroWilaya !== 0) {
   for (i = 0; i <= getNumeroWilaya-1; i++) {
     // Create the div element :)
     const newPharmaciy = CreateAlert(
       `Pharmacy ${getWilayadeName(document.getElementById("wilaya").value)} ${i + 1}`
     );
     ListPharmaciy.appendChild(newPharmaciy);
   }
 }
   /*  IF Auccun Pharmacy Existe  */
   const auccunPharmacy = CreateAlert(
     "Aucune pharmacie trouvée, vous pouvez chercher sur Internet",
     'danger'
  );
  // ListPharmaciy.appendChild(auccunPharmacy);
}
/* ************************************************************************** */


/* ************************************************************************** */
function CreateOption(name, value) {
    var opt = document.createElement('option');
    opt.value = value;
    opt.text = name;
  return opt;
}
/* ************************************************************************** */


/* ************************************************************************** */
// add A list of Option to the Filed List Pharmacie Selon la Wilaya :)
function ListOptionWilaya() {
  const ListPharmaciy = document.getElementById("Pharmaciename"); // get the object of DOM 
  const getNumeroWilaya = document.getElementById('wilaya').value; // get Numero de la Wilaya :)
//Liste des Pharmacie
  const ph = CreateOption("Liste des Pharmacie", 0);
  ListPharmaciy.appendChild(ph);

  if (getNumeroWilaya !== 0) {
      for (i = 0; i <= getNumeroWilaya - 1; i++){ 
      // Create the div element :)
      const newPharmaciy = CreateOption(
        `${getWilayadeName(getNumeroWilaya)}[${i}]`,
        i
      );
      ListPharmaciy.appendChild(newPharmaciy);
    }
  }
}
/* ************************************************************************** */


/* ************************************************************************** */
// Get the Date Of Today and Set It In The Field of Date In Page
function getDateToday() {
  var yourDateValue = new Date();
  //Format the date value
  var formattedDate = yourDateValue.toISOString().substr(0, 10);
  return formattedDate;
}
/* ************************************************************************** */
