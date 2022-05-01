

let seznamReceptu = document.getElementById("recepty");

predejIndex();

let vyhledavani = document.querySelector("#hledat");
vyhledavani.addEventListener("change", vyhledej);


let kategorieReceptu = document.getElementById("kategorie");
kategorieReceptu.addEventListener("click", podleKategorie);

let hodnoceniReceptu = document.querySelector("#razeni");
hodnoceniReceptu.addEventListener("click", podleHodnoceni);

let zobrazRecept = document.querySelectorAll(".recept");
for (i = 0; i < zobrazRecept.length; i++) {
    zobrazRecept[i].addEventListener("click", zobrazDetailReceptu(i));
}

zobrazLocalStorage();

/* 1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".
HTML vzor, jak vygenerovaný recept vypadá, je zakomentovaný v index.html.*/

// Předává index pro vypsání celého seznamu receptů
function predejIndex() {
    for (let i = 0; i < recepty.length; i++) {
        vypisRecepty(i);
    }

}

// Vytvoří šablonu pro recept
function vypisRecepty(index) {
    let recept = document.createElement("div");
    recept.className = "recept";
    document.querySelector(".recepty").appendChild(recept);

    let receptObrazek = document.createElement("div");
    receptObrazek.className = "recept-obrazek";
    recept.appendChild(receptObrazek);
    let obrazekReceptu = document.createElement("img");

    console.log(index);

    obrazekReceptu.src = recepty[index].img;
    obrazekReceptu.alt = recepty[index].nadpis;
    receptObrazek.appendChild(obrazekReceptu);

    let nazevReceptu = document.createElement("div");
    nazevReceptu.className = "recept-info";
    nazevReceptu.innerHTML = recepty[index].nadpis;
    recept.appendChild(nazevReceptu);
}

/* 2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat
by se měl seznam receptů vyfiltrovat podle hledaného slova.*/

// Funkce pro vyhledání receptů
function vyhledej() {
    seznamReceptu.innerHTML = "";
    let zobrazeneRecepty = [];

    for (i = 0; i < recepty.length; i++) {
        let receptLowerCase = recepty[i].nadpis.toLowerCase();
        let vyhledavaniLowerCase = vyhledavani.value.toLowerCase();
        if (receptLowerCase.includes(vyhledavaniLowerCase)) {
            zobrazeneRecepty.push(recepty[i]);
            vypisRecepty(i);
        }
    }
}

/* 3) Doplň filtrovanání receptů podle kategorie.*/

// Funkce pro třídění receptů podle dané kategorie (snídaně, hlavní jídlo, dezert)
function podleKategorie() {
    seznamReceptu.innerHTML = "";
    let vybranaKategorie = [];
    for (i = 0; i < recepty.length; i++) {
        if (kategorieReceptu.value === recepty[i].kategorie) {
            vybranaKategorie.push(recepty[i]);
            vypisRecepty(i);
        } else if (kategorieReceptu.value == "") {
            vybranaKategorie.push(recepty[i]);
            vypisRecepty(i);
        }
    }
}


/* 4) Doplň řazení receptů podle hodnocení.*/

// Funkce podleNejhorsihoHodnoce a podNejlepsihoHodnoceni pripravuji hodnoceni pro následující sorting ve funkci podleHodnoceni
function podleNejhorsihoHodnoceni(a, b) {
    if (a.hodnoceni < b.hodnoceni) {
        return -1;
    }
    if (a.hodnoceni > b.hodnoceni) {
        return 1;
    }
    return 0;
}

function podleNejlepsihoHodnoceni(a, b) {
    if (a.hodnoceni > b.hodnoceni) {
        return -1;
    } if (a.hodnoceni < b.hodnoceni) {
        return 1;
    } return 0;
}

// podleHodnoceni vypisuje recepty podle výše jejich hodnocení
function podleHodnoceni() {
    seznamReceptu.innerHTML = "";
    let vybraneHodnoceni = [];

    for (i = 0; i < recepty.length; i++) {
        if (hodnoceniReceptu.value == "2") {
            recepty.sort(podleNejhorsihoHodnoceni);
            vypisRecepty(i);
        }
        else if (hodnoceniReceptu.value == "1") {
            recepty.sort(podleNejlepsihoHodnoceni);
            vypisRecepty(i);
        }
    }
}

/* 5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
recept-hodnoceni, recept-nazev, recept-popis.*/

// zobrazDetailRceptu vytváří detail zvoleného receptu po kliknutí na něj a závoreň uloží poslední recept co Local Storage 
function zobrazDetailReceptu(i) {
    return function () {
        document.querySelector("#recept-foto").src = recepty[i].img;
        document.querySelector("#recept-kategorie").innerHTML = recepty[i].kategorie;
        document.querySelector("#recept-hodnoceni").innerHTML = recepty[i].hodnoceni;
        document.querySelector("#recept-nazev").innerHTML = recepty[i].nadpis;
        document.querySelector("#recept-popis").innerHTML = recepty[i].popis;

        let vybranyRecept = recepty[i];
        localStorage.clear();
        localStorage.vybranyRecept = JSON.stringify(vybranyRecept);
    }
}


/*6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl.
*/

// zobrazLocalStorage zajištujě vypsání posledního receptu (u kterého byl zobrazen detail) přes local Storage po opětovném načtení stránky
function zobrazLocalStorage() {
    let receptLocalStorage = JSON.parse(localStorage.vybranyRecept);
    document.querySelector("#recept-foto").src = receptLocalStorage.img;
    document.querySelector("#recept-kategorie").innerHTML = receptLocalStorage.kategorie;
    document.querySelector("#recept-hodnoceni").innerHTML = receptLocalStorage.hodnoceni;
    document.querySelector("#recept-nazev").innerHTML = receptLocalStorage.nadpis;
    document.querySelector("#recept-popis").innerHTML = receptLocalStorage.popis;
}



