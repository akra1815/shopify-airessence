//------------ changement du titre en h2 au lieu de h1

var title = document.querySelector("div.product__title h1");
var titletext = title.innerHTML;
var divtitle = document.querySelector("div.product__title");
var titleh2 = document.createElement("h2");
titleh2.classList.add("titlekg")
titleh2.innerHTML = titletext;
divtitle.appendChild(titleh2);
title.style.display = "none";

/*
//Ajout du "à partir de" dans le prix
var pricekgspan = document.querySelector("span.price-item--last");
var pricekg = pricekgspan.innerHTML;
var ajoutpricekg = "<span style = 'font-size: 15px;'>à partir de </span>";
pricekgspan.innerHTML = ajoutpricekg + pricekg;
*/

/*

//Ajout de la mini description au sommet de la page produit
var positionminidesc = document.querySelector("div.price--show-badge");
var minidescdiv = document.createElement("div");
var minidesctitre = document.createElement("span");
var minidesc = document.createElement("p");
minidesctitre.classList.add("minidesctitre");
minidesctitre.innerHTML = "Crée une ambiance unique dans ta voiture !";
minidesc.classList.add("minidesc");
minidesc.innerHTML = "&emsp;<b style='color: #00B894; font-size :18px;'>•</b> Parfums Premium - durée de vie 1 mois<br>&emsp;<b style='color: #00B894; font-size :18px;'>•</b> 100% personnalisable avec ton image<br>&emsp;<b style='color: #00B894; font-size :18px;'>•</b> Idée cadeau originale pour toute occasion<br>";
positionminidesc.appendChild(minidesctitre);
positionminidesc.appendChild(minidesc);

*/



//fonction qui change le texte du titre de la forme
function changetexteforme(forme) {
var formetitletext = document.querySelector("div.formetitle");
formetitletext.innerHTML = "Étape 2 - Forme : " + forme;
}


//fonction qui déplace la dropdown parfum en dessous du bouton ajouter recharge
function dropdownrecharge() {
var divdropdownrecharge = document.querySelector(".pplr-parfum-recharge");
var srcrecharge = document.getElementById("inputrecharge").parentElement;
var texterecharge = document.querySelector(".rechargetext");
srcrecharge.appendChild(divdropdownrecharge);
srcrecharge.appendChild(texterecharge);
}


function modifaddimage() {
  /*
var inputrefaddimage = document.querySelectorAll("input[data_name='_<div class=imageadded>Upload Image supplémentaire<div>']");

var inputrefaddimageclass0 = inputrefaddimage[0].parentElement.getAttribute("class");
inputrefaddimage[0].parentElement.setAttribute("class", inputrefaddimageclass0 + " divaddimageupload");
  
var inputrefaddimageclass2 = inputrefaddimage[2].parentElement.getAttribute("class");
inputrefaddimage[2].parentElement.setAttribute("class", inputrefaddimageclass2 + " divaddimageupload");

var inputrefaddimageclass4 = inputrefaddimage[4].parentElement.getAttribute("class");
inputrefaddimage[4].parentElement.setAttribute("class", inputrefaddimageclass4 + " divaddimageupload");

var inputrefaddimageclass6 = inputrefaddimage[6].parentElement.getAttribute("class");
inputrefaddimage[6].parentElement.setAttribute("class", inputrefaddimageclass6 + " divaddimageupload");



var divspanaddimage = document.querySelectorAll(".divaddimageupload");
  
var spanaddimage0 = divspanaddimage[0].getElementsByTagName('span');
var spanaddimage1 = divspanaddimage[1].getElementsByTagName('span');
var spanaddimage2 = divspanaddimage[2].getElementsByTagName('span');
var spanaddimage3 = divspanaddimage[3].getElementsByTagName('span');
  console.log(spanaddimage0);
var spanaddimageclass0 = spanaddimage0[0].getAttribute("class");
var spanaddimageclass1 = spanaddimage1[0].getAttribute("class");
var spanaddimageclass2 = spanaddimage2[0].getAttribute("class");
var spanaddimageclass3 = spanaddimage3[0].getAttribute("class");
  
spanaddimage0[0].setAttribute("class", spanaddimageclass0 + " spanaddimage");
spanaddimage1[0].setAttribute("class", spanaddimageclass1 + " spanaddimage");
spanaddimage2[0].setAttribute("class", spanaddimageclass2 + " spanaddimage");
spanaddimage3[0].setAttribute("class", spanaddimageclass3 + " spanaddimage");
  */
/*
var divregroup = document.createElement("div");
divregroup.setAttribute("id", "divregroup");
divregroup.appendChild(spanaddimage0[0].parentElement);
divregroup.appendChild(spanaddimage1[0].parentElement);
divregroup.appendChild(spanaddimage2[0].parentElement);
divregroup.appendChild(spanaddimage3[0].parentElement);

var textinfoimage = document.querySelector(".addimagetext");
var parentdivaddimage = document.querySelector("div.addimage").parentElement;
parentdivaddimage.appendChild(divregroup);
parentdivaddimage.appendChild(textinfoimage);
*/


}

//fonction qui change le texte descriptif du parfum
function changetexteparfum() {
var descriptionparfum = document.querySelector("p.parfumtext");
var selecteurparfum = document.querySelector("select.pplr_select");

/*
  
if (selecteurparfum.value == "Bois de oud") {
descriptionparfum.innerHTML = "<b>• Notes</b> : Boisé, ambré <b>• Ambiance</b> : Luxe, oriental";
} 
else if (selecteurparfum.value == "Cèdre du Liban") {
descriptionparfum.innerHTML = "<b>• Notes</b> : Boisé, fruité <b>• Ambiance</b> : Vanillé, oriental";
}
else if (selecteurparfum.value == "Vanille") {
descriptionparfum.innerHTML = "<b>• Notes</b> : Floral, musqué <b>• Ambiance</b> : Vanillé, relaxant";
}
else if (selecteurparfum.value == "Fruits des bois") {
descriptionparfum.innerHTML = "<b>• Notes</b> : Floral, musqué <b>• Ambiance</b> : Fruité, miellé";
}
else if (selecteurparfum.value == "Fleur de cerisier") {
descriptionparfum.innerHTML = "<b>• Notes</b> : Floral, fruité <b>• Ambiance</b> : Printemps, frais";
}
else if (selecteurparfum.value == "Fleur des îles") {
descriptionparfum.innerHTML = "<b>• Notes</b> : Floral, musqué <b>• Ambiance</b> : Estival, vanillé";
}
else if (selecteurparfum.value == "Fruit de la passion") {
descriptionparfum.innerHTML = "<b>• Notes</b> : Fruité, passion <b>• Ambiance</b> : Tropical, gourmand";
}
else if (selecteurparfum.value == "Mojito") {
descriptionparfum.innerHTML = "<b>• Notes</b> : Menthe, citron <b>• Ambiance</b> : Estival, frais";
}
else if (selecteurparfum.value == "Nuit d'orient") {
descriptionparfum.innerHTML = "<b>• Notes</b> : Boisé, épicé <b>• Ambiance</b> : Vanillé, oriental";
}
else if (selecteurparfum.value == "Pastèque-melon") {
descriptionparfum.innerHTML = "<b>• Notes</b> : Fruité <b>• Ambiance</b> : Estival, gourmand";
}
else {
  descriptionparfum.innerHTML = "";
}

  */
  
}



/*
var titleparf = document.querySelector('h2.parfum');
var subtitlesparf = document.querySelector('p.subtitles.parfum');
var divdestparfum = document.querySelector('div.kgdesttxtparfum');
divdestparfum.appendChild(titleparf);
divdestparfum.appendChild(subtitlesparf);

*/
  

window.onload=function()  { 

  var listprice = document.querySelector('div.listprice');

var divContainer = document.createElement('div');
  console.log(divContainer);
  divContainer.className = 'quantite-container';
  var selector = document.querySelector('.quantity');
 divContainer.appendChild(selector);
var divsource = document.querySelector('div.product-form__quantity');
    console.log(divsource);
var progressbarkg = document.querySelector('.progress-container');
var kgeco = document.querySelector('.kgeco');
  divsource.appendChild(divContainer);
    divsource.appendChild(kgeco);
  divsource.appendChild(progressbarkg);
  var paraquant = document.createElement('p');
  paraquant.className = 'paraquant';
  paraquant.innerHTML ="";
  divContainer.appendChild(paraquant);
  var inputselector = document.querySelector('input.quantity__input');
  var inputval = 0;
  var qtycart = 0;
  var inputvalcart = 0;

var btnaddtocart = document.querySelector('div.product-form__buttons button span');
var btnaddtocarthtml = btnaddtocart.innerHTML;

  var btnaddtocartbtn = document.querySelector('div.product-form__buttons button');

  var divcontenantaddtocart = document.querySelector('div.product-personalizer');
  divcontenantaddtocart.appendChild(divsource);
  //  divsource.appendChild(btnaddtocartbtn);
  
function updateContent() {
  var qtycart = parseInt(document.querySelector('span.quantity-cart').innerHTML, 10) || 0;
  var inputval = parseInt(inputselector.value, 10) || 0;
  var inputvalcart = inputval + qtycart;
  var kgecotxt = document.querySelector('.kgecotxt');
  var savingsMessage = '';
if (inputvalcart >= 1 && inputvalcart <= 19) {
    var kgdiff = 20-inputvalcart;
    var savings = (inputvalcart).toFixed(2);  // Formater l'économie avec deux décimales
    savingsMessage = '<strong class="strongparaquantbis">Débloquez <strong class="strongparaquant">-35%</strong> en ajoutant encore <strong class="strongparaquant">' + kgdiff + ' pièces</strong></strong><br>Vous ne paierez que 2.30€ au lieu de 3.50€ / pièce.';
    paraquant.innerHTML = inputselector.value + ' sent-bon (3.50€ / p)';
    btnaddtocart.innerHTML = btnaddtocarthtml + ' - ' + (inputval * 3.50).toFixed(2) + '€';
    kgecotxt.innerHTML = savingsMessage;  
  } else if (inputvalcart >= 20 && inputvalcart <= 49) {
    var kgdiff = 50-inputvalcart;
    var savings = (inputvalcart * 2.00).toFixed(2);  // Formater l'économie avec deux décimales
    savingsMessage = '<strong class="strongparaquantbis">Débloquez <strong class="strongparaquant">-45%</strong> en ajoutant encore <strong class="strongparaquant">' + kgdiff + ' pièces</strong></strong><br>Vous ne paierez que 1.90€ au lieu de 2.30€ / pièce.';
    //paraquant.innerHTML = inputselector.value + ' sent-bon (2.30€ / p)<br>' + savingsMessage;
    paraquant.innerHTML = inputselector.value + ' sent-bon (2.30€ / p)';
    kgecotxt.innerHTML = savingsMessage;
    btnaddtocart.innerHTML = btnaddtocarthtml + ' - ' + (inputval * 2.30).toFixed(2) + '€';
  } else if (inputvalcart >= 50 && inputvalcart <= 99) {
    var kgdiff = 100-inputvalcart;
    var savings = (inputvalcart * 2.40).toFixed(2);
    savingsMessage = '<strong class="strongparaquantbis">Débloquez <strong class="strongparaquant">-50%</strong> en ajoutant encore <strong class="strongparaquant">' + kgdiff + ' pièces</strong></strong><br>Vous ne paierez que 1.70€ au lieu de 1.90€ / pièce.';
    //paraquant.innerHTML = inputselector.value + ' sent-bon (1.90€ / p)<br>' + savingsMessage;
    paraquant.innerHTML = inputselector.value + ' sent-bon (1.90€ / p)';
    kgecotxt.innerHTML = savingsMessage;
    btnaddtocart.innerHTML = btnaddtocarthtml + ' - ' + (inputval * 1.90).toFixed(2) + '€';
  } else if (inputvalcart >= 100 && inputvalcart <= 199) {
    var kgdiff = 200-inputvalcart;
    var savings = (inputvalcart * 3.00).toFixed(2);
   savingsMessage = '<strong class="strongparaquantbis">Débloquez <strong class="strongparaquant">-55%</strong> en ajoutant encore <strong class="strongparaquant">' + kgdiff + ' pièces</strong></strong><br>Vous ne paierez que 1.60€ au lieu de 1.70€ / pièce.';
    //paraquant.innerHTML = inputselector.value + ' sent-bon (1.70€ / p)<br>' + savingsMessage;
    paraquant.innerHTML = inputselector.value + ' sent-bon (1.70€ / p)'
    kgecotxt.innerHTML = savingsMessage;
    btnaddtocart.innerHTML = btnaddtocarthtml + ' - ' + (inputval * 1.70).toFixed(2) + '€';
  } else if (inputvalcart >= 200 && inputvalcart <= 499) {
    var kgdiff = 500-inputvalcart;
    var savings = (inputvalcart * 3.30).toFixed(2);
    savingsMessage = '<strong class="strongparaquantbis">Débloquez <strong class="strongparaquant">-60%</strong> en ajoutant encore <strong class="strongparaquant">' + kgdiff + ' pièces</strong></strong><br>Vous ne paierez que 1.40€ au lieu de 1.60€ / pièce.';
    //paraquant.innerHTML = inputselector.value + ' sent-bon (1.60€ / p)<br>' + savingsMessage;
    paraquant.innerHTML = inputselector.value + ' sent-bon (1.60€ / p)';
    kgecotxt.innerHTML = savingsMessage;
    btnaddtocart.innerHTML = btnaddtocarthtml + ' - ' + (inputval * 1.60).toFixed(2) + '€';
  } else if (inputvalcart >= 500) {
    var savings = (inputvalcart * 3.50).toFixed(2);
    savingsMessage = 'Vous payez actuellement 1.40€ la pièce.';
    //paraquant.innerHTML = inputselector.value + ' sent-bon (1.40€ / p)<br>' + savingsMessage;
    paraquant.innerHTML = inputselector.value + ' sent-bon (1.40€ / p)';
    kgecotxt.innerHTML = savingsMessage;
    btnaddtocart.innerHTML = btnaddtocarthtml + ' - ' + (inputval * 1.40).toFixed(2) + '€';
  }

}
  

selector.addEventListener('change', updateContent);
updateContent();


   divsource.insertBefore(listprice, divsource.firstChild);

  /*
  
  if(titletext.includes("Teams"))
  {} else {
var txtqtykg = document.querySelector("label.quantity__label").innerHTML;
document.querySelector("label.quantity__label").innerHTML = "Étape 4 -" + txtqtykg;


var qtykg = document.querySelector("div.product-form__quantity");

var formkg = document.querySelector("div.pplr-dropdown");
formkg.appendChild(qtykg);
  }

*/
  
var titreajoutimage = document.querySelector(".imagetitle").parentElement;
titreajoutimage.setAttribute("id", "titreajoutimage");

//on capture les 4 formes et on récupère leur fonction onclick
var formes = document.querySelectorAll("div.pplr_thumb_image span.pplr-swatch-element");
//on récupère le nom de la forme et on ajoute la fonction pour changer le nom du titre (Choisis ta forme : + Forme) dans le onclick
//Forme 0 :
var onclickbase0 = formes[0].getAttribute("onclick");
var texteforme0 = formes[0].querySelector("span.img_dropdown").innerHTML;
var onclickmodif0 = onclickbase0 + "changetexteforme('" + texteforme0 + "');";
formes[0].setAttribute('onclick', onclickmodif0);
//Forme 1 :
var onclickbase1 = formes[1].getAttribute("onclick");
var texteforme1 = formes[1].querySelector("span.img_dropdown").innerHTML;
var onclickmodif1 = onclickbase1 + "changetexteforme('" + texteforme1 + "');";
formes[1].setAttribute('onclick', onclickmodif1);
//Forme 2 :
var onclickbase2 = formes[2].getAttribute("onclick");
var texteforme2 = formes[2].querySelector("span.img_dropdown").innerHTML;
var onclickmodif2 = onclickbase2 + "changetexteforme('" + texteforme2 + "');";
formes[2].setAttribute('onclick', onclickmodif2);
//Forme 3 :
var onclickbase3 = formes[3].getAttribute("onclick");
var texteforme3 = formes[3].querySelector("span.img_dropdown").innerHTML;
var onclickmodif3 = onclickbase3 + "changetexteforme('" + texteforme3 + "');";
formes[3].setAttribute('onclick', onclickmodif3);

var formeselected = document.querySelector("div.pplr_thumb_image span.selected");
var texteformeselected = formeselected.querySelector("span.img_dropdown").innerHTML;
changetexteforme(texteformeselected);
  

//Ajout du texte en dessous du selecteur de parfum
var parfumtitle = document.querySelector("div.pplr-dropdown");
var selectparfum = document.querySelector("select.pplr_select");
var onchangeselect = selectparfum.getAttribute("onchange");
selectparfum.setAttribute("onchange", onchangeselect + "changetexteparfum();");
var parfumtext = document.createElement("p");
parfumtext.classList.add("parfumtext");
parfumtitle.appendChild(parfumtext)
changetexteparfum()

  /*
  
//Ajout de l'image info parfums de Grasse
var divgrasse = document.createElement ("div");
var positionref2 = document.querySelector("div.parfumtitle");
positionref2.appendChild(divgrasse);
divgrasse.classList.add("divgrasse");
var infograsse = document.createElement("p");
var iconeparfum = document.createElement("img");
iconeparfum.setAttribute("src", "https://cdn.shopify.com/s/files/1/0769/3831/4030/files/icone_parfum.jpg?v=1685217755");
infograsse.innerHTML = "Parfums Premium conçus à Grasse 🇫🇷, capitale mondiale de la parfumerie";
infograsse.classList.add("infograsse");
iconeparfum.classList.add("iconeparfum");
divgrasse.appendChild(iconeparfum);
divgrasse.appendChild(infograsse);

  */

//on transforme la checkbox ajout recharge parfum en bouton
//var inputrecharge = document.querySelector("div.recharge").parentElement.getElementsByTagName("input");
//inputrecharge[0].setAttribute('id', 'inputrecharge');

//on insère l'image unchecked
  /*
var imgrechargeunchecked = document.createElement("img");
imgrechargeunchecked.classList.add("imgrecharge-unchecked");
imgrechargeunchecked.src = "https://cdn.shopify.com/s/files/1/0769/3831/4030/files/bouton_recharge_de_parfum.jpg?v=1685308296";
var srcrecharge = document.getElementById("inputrecharge").parentElement;
srcrecharge.appendChild(imgrechargeunchecked);

//on insère l'image checked
var imgrechargechecked = document.createElement("img");
imgrechargechecked.classList.add("imgrecharge-checked");
imgrechargechecked.src = "https://cdn.shopify.com/s/files/1/0769/3831/4030/files/bouton_recharge_de_parfum_check.jpg?v=1685355006";
var srcrecharge = document.getElementById("inputrecharge").parentElement;
srcrecharge.appendChild(imgrechargechecked);
  
//Ajout du texte sous le bouton ajouter recharge
var rechargetext = document.createElement("p");
rechargetext.classList.add("rechargetext");
rechargetext.innerHTML = "ℹ️ Spray de 1 ml - prolonge la durée de vie de ton sent-bon, découvre d'autres senteurs, etc.";
srcrecharge.appendChild(rechargetext);


//Déplacement de la dropdown parfum en dessous du bouton ajouter recharge
var checkboxrecharge = document.getElementById("inputrecharge");
var onchangerecharge = checkboxrecharge.getAttribute("onchange");
checkboxrecharge.setAttribute("onchange", onchangerecharge + "dropdownrecharge();");

  
//on transforme la checkbox ajout image suppl en bouton
var inputaddimage = document.querySelector("div.addimage").parentElement.getElementsByTagName("input");
inputaddimage[0].setAttribute('id', 'inputaddimage');

//on insère l'image unchecked
var addimageunchecked = document.createElement("img");
addimageunchecked.classList.add("addimage-unchecked");
addimageunchecked.src = "https://cdn.shopify.com/s/files/1/0769/3831/4030/files/bouton_ajouter_image_suppl_1706a340-6d17-47e5-b84d-c9f32786295b.jpg?v=1685392468";
var srcaddimage = document.getElementById("inputaddimage").parentElement;
srcaddimage.appendChild(addimageunchecked);

//on insère l'image checked
var addimagechecked = document.createElement("img");
addimagechecked.classList.add("addimage-checked");
addimagechecked.src = "https://cdn.shopify.com/s/files/1/0769/3831/4030/files/bouton_image_suppl_vert.jpg?v=1685385884";
var srcaddimage = document.getElementById("inputaddimage").parentElement;
srcaddimage.appendChild(addimagechecked);
  

//Ajout du texte sous le bouton ajouter image suppl
var addimagetext = document.createElement("p");
addimagetext.classList.add("addimagetext");
addimagetext.innerHTML = "ℹ️ Une moitié des pièces avec la 1ère image et l'autre moitié avec la 2ème image";
srcaddimage.appendChild(addimagetext);
  

//modif onchange de la checkbox ajout image suppl
var checkboxaddimage = document.getElementById("inputaddimage");
var onchangeaddimage = checkboxaddimage.getAttribute("onchange");
checkboxaddimage.setAttribute("onchange", onchangeaddimage + "modifaddimage();");
  
//Ajout du texte au dessus du titre des packs
var bundletitle = document.querySelector("div.bundletitle");
var bundletext = document.createElement("p");
bundletext.classList.add("bundletext");
  
//bundletext.innerHTML = "Fais des réserves ou offre-en autour de toi ! Chaque sent-bon est soigneusement emballé pour préserver son parfum en attendant son utilisation.<br>";
// bundletext.innerHTML = "ℹ️ Les sent-bon se conservent sans limite de temps !<br>";
  
//var positionref = document.querySelector("div.pplr-checkbox label.pplrlabel");
var positionref = document.querySelector("div.bundletitle");
positionref.appendChild(bundletext)

*/
  
//------------ on transforme les checkbox en bundles

/*
  
//------------ checkbox 0

//on trouve la checkbox et on lui met un ID pour la retrouver facilement
var input0 = document.querySelector("input[data-value='1 pièce']");
input0.setAttribute('id', 'input0');

//on insère l'image unchecked de la 0ère checkbox
var img0unchecked = document.createElement("img");
img0unchecked.classList.add("img0-unchecked");
img0unchecked.src = "https://cdn.shopify.com/s/files/1/0769/3831/4030/files/Bundle_0_gris.jpg?v=1687814237";
var src0 = document.getElementById("input0").parentElement;
src0.appendChild(img0unchecked);

//on insère l'image checked de la 0ère checkbox
var img0checked = document.createElement("img");
img0checked.classList.add("img0-checked");
img0checked.src = "https://cdn.shopify.com/s/files/1/0769/3831/4030/files/Bundle_0_vert.jpg?v=1687814237";
var src0 = document.getElementById("input0").parentElement;
src0.appendChild(img0checked);

//on enlève le texte de la 0ère checkbox
document.getElementById("input0").nextSibling.remove();

*/


  
//------------ checkbox 1

//on trouve la checkbox et on lui met un ID pour la retrouver facilement

  /*
  
var input1 = document.querySelector("input[data-value='2 pièces']");
input1.setAttribute('id', 'input1');

  

//on insère l'image unchecked de la 1ère checkbox
var img1unchecked = document.createElement("img");
img1unchecked.classList.add("img1-unchecked");
img1unchecked.src = "https://cdn.shopify.com/s/files/1/0769/3831/4030/files/Bundle_1_gris_82815d71-4c49-46a9-9401-6206c8fa849f.jpg?v=1691408220";
var src1 = document.getElementById("input1").parentElement;
src1.appendChild(img1unchecked);

//on insère l'image checked de la 1ère checkbox
var img1checked = document.createElement("img");
img1checked.classList.add("img1-checked");
img1checked.src = "https://cdn.shopify.com/s/files/1/0769/3831/4030/files/Bundle_1_vert_0c8fedaf-8ee5-43c4-9adc-5096ef058fea.jpg?v=1691408220";
var src1 = document.getElementById("input1").parentElement;
src1.appendChild(img1checked);

//on enlève le texte de la 1ère checkbox
document.getElementById("input1").nextSibling.remove();
  
//------------- on passe à la 2ème checkbox

//on trouve la checkbox et on lui met un ID pour la retrouver facilement
var input2 = document.querySelector("input[data-value='3 achetés + 1 offert']");
input2.setAttribute('id', 'input2');

//on insère l'image unchecked de la 2ème checkbox
var img2unchecked = document.createElement("img");
img2unchecked.classList.add("img2-unchecked");
img2unchecked.src = "https://cdn.shopify.com/s/files/1/0769/3831/4030/files/Bundle_2_gris_b9aee380-ba43-4483-84c7-1b368946b7d8.jpg?v=1691408220";
var src2 = document.getElementById("input2").parentElement;
src2.appendChild(img2unchecked);

//on insère l'image checked de la 2ème checkbox
var img2checked = document.createElement("img");
img2checked.classList.add("img2-checked");
img2checked.src = "https://cdn.shopify.com/s/files/1/0769/3831/4030/files/Bundle_2_vert_f3fdc8a0-4aeb-43e1-a5ae-e50c5119d49e.jpg?v=1691408220";
var src2 = document.getElementById("input2").parentElement;
src2.appendChild(img2checked);

//on enlève le texte de la 2ème checkbox
document.getElementById("input2").nextSibling.remove();

//------------- on passe à la 3ème checkbox

//on trouve la checkbox et on lui met un ID pour la retrouver facilement
var input3 = document.querySelector("input[data-value='4 achetés + 2 offerts']");
input3.setAttribute('id', 'input3');

//on insère l'image unchecked de la 3ème checkbox
var img3unchecked = document.createElement("img");
img3unchecked.classList.add("img3-unchecked");
img3unchecked.src = "https://cdn.shopify.com/s/files/1/0769/3831/4030/files/Bundle_3_gris_32f467c4-95fe-4f5e-8127-c79f1aecd81b.jpg?v=1691408220";
var src3 = document.getElementById("input3").parentElement;
src3.appendChild(img3unchecked);

//on insère l'image checked de la 3ème checkbox
var img3checked = document.createElement("img");
img3checked.classList.add("img3-checked");
img3checked.src = "https://cdn.shopify.com/s/files/1/0769/3831/4030/files/Bundle_3_vert_9de8e4b4-7136-484c-a317-7f6d32f3b1a5.jpg?v=1691408220";
var src3 = document.getElementById("input3").parentElement;
src3.appendChild(img3checked);

//on enlève le texte de la 3ème checkbox
document.getElementById("input3").nextSibling.remove();

  */
  
}