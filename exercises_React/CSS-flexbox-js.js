let a = 1;

function show_hide(){
    if (a == 1){
        document.getElementById("tooltip").style.display="inline-block";
        return a=0;
    }
    else {
        document.getElementById("tooltip").style.display="none";
        return a=1;
    }
}