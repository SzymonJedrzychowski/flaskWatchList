function showAdvanced(el) {
    let adv = el.parentElement.getElementsByClassName("detailedData")[0];
    if (adv == undefined) {
        let adv2 = el.parentElement.getElementsByClassName("editDetailedData")[0];
        if (adv2 != undefined) {
            return;
        }
    }

    if (adv.className == "detailedData") {
        adv.className = "detailedData showDetailedData";
    } else {
        adv.className = "detailedData";
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

function toEdit(el) {
    parent = el.parentElement.parentElement;
    detailedDataShow = el.parentElement;
    detailedDataShow.setAttribute("class", "editDetailedData");
    editable = parent.getElementsByClassName("editable");
    for (let i = 0; i < editable.length; i++) {
        editable[i].removeAttribute("disabled");
    }
    toHide = parent.getElementsByClassName("toHide");
    for (let i = 0; i < toHide.length; i++) {
        toHide[i].style.display = "none";
    }
    toShow = parent.getElementsByClassName("toShow");
    for (let i = 0; i < toShow.length; i++) {
        toShow[i].style.display = "block";
    }
}

function cancel(el) {
    parent = el.parentElement.parentElement;
    detailedDataShow = el.parentElement;
    detailedDataShow.setAttribute("class", "detailedData showDetailedData");
    editable = parent.getElementsByClassName("editable");
    for (let i = 0; i < editable.length; i++) {
        editable[i].setAttribute("disabled", "true");
    }
    toHide = parent.getElementsByClassName("toHide");
    for (let i = 0; i < toHide.length; i++) {
        toHide[i].style.display = "block";
    }
    toShow = parent.getElementsByClassName("toShow");
    for (let i = 0; i < toShow.length; i++) {
        toShow[i].style.display = "none";
    }
}

function addNew(el) {
    parent = el.parentElement;
    newElement = parent.parentElement.getElementsByClassName("watchListItem")[1];
    newElement.removeAttribute("style");
    parent.style.display = 'none';
    toEdit(newElement.getElementsByClassName("itemEditButton")[0]);
}

function removeThis(el) {
    parent = el.parentElement.parentElement.parentElement;
    parent.getElementsByClassName("addNewItem")[0].parentElement.removeAttribute("style");
    toRemove = parent.getElementsByClassName("watchListItem")[1];
    toRemove.style.display = "none";
    for (let i = 0; i < editable.length; i++) {
        if(editable[i].getAttribute("class") == "basicInformation itemStatus editable"){
            editable[i].value = "watching";
            editable[i].style.backgroundColor = "green";
        }else{
            editable[i].value = "";
        }
    }
    editable = toRemove.getElementsByClassName("editable");
}