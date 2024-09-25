var escalaCromatica = [
    "C", "C#", "D", "D#", "E", "F",
    "F#","G", "G#", "A", "A#", "B",
    "C", "C#", "D", "D#", "E", "F",
    "F#","G", "G#", "A", "A#", "B",
    "C", "C#", "D", "D#", "E", "F",
    "F#","G", "G#", "A", "A#", "B",
];

var afinacao = ["E", "B", "G", "D", "A", "E"];
var braco = document.getElementById("guitarra");
var cordas = braco.getElementsByClassName("corda");
var selectEscala = document.getElementById("selecionaEscala")


function posicaoNota(nota){
    return escalaCromatica.indexOf(nota);
}

function inserindoNotaCordas(corda){
    indice = posicaoNota(afinacao[corda]);
    casas = cordas[corda].getElementsByTagName("div")
    for (i = 0; i < 13; i++ ){
        proxNota = escalaCromatica[indice + i];
        casas[i].innerHTML = proxNota;
    }
}


function preenchendoBraco(){
    nCordas = cordas.length;
    for (j = 0; j < cordas.length; j++){
        inserindoNotaCordas(j);
    }
}

function geraEscala(nota, escala = [2,2,1,2,2,2,1]){
    indice = posicaoNota(nota);
    next = indice;
    escalaGerada = [escalaCromatica[next]];
    for (i of escala){
        next += i;
        if (escalaGerada.indexOf(escalaCromatica[next]) == -1){
            escalaGerada.push(escalaCromatica[next]);
        }
    }
    return escalaGerada
}

function destacandoEscala(qualEscala){
    if (qualEscala == ""){
        return []
    }else{
        escala = geraEscala(qualEscala);
        nCordas = cordas.length;
        for (i = 0; i < nCordas; i++){
            casas = cordas[i].getElementsByTagName("div");
            for (c of casas){
                valor = c.innerHTML;
                if (escala.indexOf(valor) > -1){
                    c.classList.add("naEscala");
                    if(escala[0] == valor){
                        c.classList.add("notaPrincipal");
                    }else{
                        c.classList.remove("notaPrincipal");
                    }
                }else{
                    c.classList.remove("naEscala");
                }
            }
        }
    }
    

}



preenchendoBraco();


// Resgatando a mudança do select //

selectEscala.onchange = function(){
    valor = this.value
    destacandoEscala(valor)
}