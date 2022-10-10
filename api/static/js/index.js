let allow=true;
function showAdvanced(el) {
    let adv = el.parentElement.getElementsByClassName("advanced")[0];
    if (!allow){
        return
    }
    if (adv.className == "advanced") {
        adv.className = 'advanced showAdvanced';
    } else {
        adv.className = 'advanced';
    }
}

function changeColour(el) {
    if (el.value == "watching") {
        el.style.backgroundColor = "green";
    } else if (el.value == "waiting") {
        el.style.backgroundColor = "yellow";
    } else if (el.value == "rewatch") {
        el.style.backgroundColor = "blue";
    } else if (el.value == "finished") {
        el.style.backgroundColor = "green";
    } else if (el.value == "dropped") {
        el.style.backgroundColor = "red";
    }
}

function toEdit(el){
    allow = false;
    parent = el.parentElement.parentElement;
    adv = el.parentElement
    d = parent.getElementsByClassName("basicInfo");
    for (let i = 0; i<d.length; i++){
        d[i].removeAttribute("disabled");
    }
    adv.setAttribute("class", "editAdvanced")
    adv.getElementsByClassName("description")[0].removeAttribute("disabled");
    adv.getElementsByClassName("trailerInput")[0].style.display = "block";
    adv.getElementsByClassName("wikiLinkInput")[0].style.display = "block";
    adv.getElementsByClassName("trailer")[0].style.display = "none";
    adv.getElementsByClassName("wikiLink")[0].style.display = "none";
    adv.getElementsByClassName("save")[0].style.display = "block";
    adv.getElementsByClassName("cancel")[0].style.display = "block";
    adv.getElementsByClassName("edit")[0].style.display = "none";
    adv.getElementsByClassName("remove")[0].style.display = "none";
}

function cancel(el){
    allow = true;
    parent = el.parentElement.parentElement;
    adv = el.parentElement
    d = parent.getElementsByClassName("basicInfo");
    for (let i = 0; i<d.length; i++){
        d[i].setAttribute("disabled", "true");
    }
    adv.setAttribute("class", "advanced showAdvanced")
    adv.getElementsByClassName("description")[0].setAttribute("disabled", "true");
    adv.getElementsByClassName("trailerInput")[0].style.display = "none";
    adv.getElementsByClassName("wikiLinkInput")[0].style.display = "none";
    adv.getElementsByClassName("trailer")[0].style.display = "block";
    adv.getElementsByClassName("wikiLink")[0].style.display = "block";
    adv.getElementsByClassName("save")[0].style.display = "none";
    adv.getElementsByClassName("cancel")[0].style.display = "none";
    adv.getElementsByClassName("edit")[0].style.display = "block";
    adv.getElementsByClassName("remove")[0].style.display = "block";
}

function addNew(el){
    parent2 = el.parentElement;
    newElement = parent2.parentElement.getElementsByClassName("listing")[1].cloneNode(true);
    newElement.getElementsByClassName("advanced")[0].setAttribute("class", "advanced showAdvanced");
    newElement.getElementsByClassName("hid")[0].value = "";
    newElement.getElementsByClassName("title")[0].value = "";
    newElement.getElementsByClassName("status")[0].style.backgroundColor="green";
    newElement.getElementsByClassName("statusValue")[0].removeAttribute("selected");
    newElement.getElementsByClassName("rating")[0].value = "";
    newElement.getElementsByClassName("wikiLink")[0].removeAttribute("href");
    newElement.getElementsByClassName("trailer")[0].removeAttribute("href");
    newElement.getElementsByClassName("description")[0].value = "";
    newElement.getElementsByClassName("edit")[0].innerHTML = "SAVE";
    newElement.getElementsByClassName("cancel")[0].setAttribute("onclick", 'removeThis(this)');
    toEdit(newElement.getElementsByClassName("edit")[0]);
    parent2.parentElement.insertBefore(newElement, parent2.nextSibling);
    parent2.style.display = 'none';
}

function removeThis(el){
    parent3 = el.parentElement.parentElement.parentElement;
    parent3.getElementsByClassName("add")[0].parentElement.removeAttribute("style");
    toRem = parent3.getElementsByClassName("listing")[1];
    parent3.removeChild(toRem);
}