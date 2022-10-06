function showAdvanced(el){
    let adv = el.parentElement.getElementsByClassName("advanced")[0];
    if(adv.className == "advanced"){
        adv.className = 'advanced showAdvanced';
    }else{
        adv.className = 'advanced';
    }
}