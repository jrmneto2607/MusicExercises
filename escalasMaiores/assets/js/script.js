var escalaCromatica = [
    "C", "C#", "D", "D#", "E", "F",
    "F#","G", "G#", "A", "A#", "B",
    "C", "C#", "D", "D#", "E", "F",
    "F#","G", "G#", "A", "A#", "B",
    "C", "C#", "D", "D#", "E", "F",
    "F#","G", "G#", "A", "A#", "B",
    "C", "C#", "D", "D#", "E", "F",
    "F#","G", "G#", "A", "A#", "B",
];


modelosEscalas = [
    [[4,1,2],[2,2,1],[2,2,1],[2,2],[2,1,2],[2,1,2]],
    [[7,2],[2,1,2],[2,1,2],[2,2,1],[2,2,1],[2,2]],
    [[9,2,1],[2,2,1],[2,2],[2,1,2],[2,1,2],[2,2,1]],
    [[11,1,2],[2,1,2],[2,2,1],[2,2,1],[2,2],[2,1,2]],
    [[2,2,1],[2,2],[2,1,2],[2,1,2],[2,2,1],[2,2,1]],
];

//var afinacao = ["E", "B", "G", "D", "A", "E"];
var afinacao = ["E", "A", "D", "G", "B", "E"];
var braco = document.getElementById("guitarra");
var cordas = braco.getElementsByClassName("corda");
var selectEscala = document.getElementById("selecionaEscala");
selectEscala.value = ""
var imgModelosEscalas = document.getElementsByClassName("trocaModeloEscala");



function posicaoNota(nota){
    return escalaCromatica.indexOf(nota);
}

function inserindoNotaCordas(corda){
    indice = posicaoNota(afinacao[corda]);
    casas = cordas[corda].getElementsByClassName("casa")
    for (var i = 0; i < casas.length; i++ ){
        proxNota = escalaCromatica[indice + i];
        casas[i].innerHTML = proxNota;
    }
}


function preenchendoBraco(){
    nCordas = cordas.length;
    for (var j = 0; j < cordas.length; j++){
        inserindoNotaCordas(j);
    }
}

function geraEscala(nota, escala = [2,2,1,2,2,2,1]){
    if (nota == ""){
        escalaGerada = [];
    }else{
        indice = posicaoNota(nota);
        next = indice;
        escalaGerada = [escalaCromatica[next]];
        for (var i of escala){
            next += i;
            if (escalaGerada.indexOf(escalaCromatica[next]) == -1){
                escalaGerada.push(escalaCromatica[next]);
            }
        }
    }
    
    return escalaGerada;
}

function geraModelo(nota, modelo){
    if (modelo == 0){
        modeloGerado = [];
    }else{
        iAlvo = posicaoNota(nota);
        modelo -= 1;
        modeloSelecionado = modelosEscalas[modelo]
        nCordas = cordas.length;
        modeloGerado = [];
        for (var i = 0; i < nCordas; i++){
            modeloGerado.push([]);
            for (var j of modeloSelecionado[i]){
                iAlvo += j;
                modeloGerado[i].push(escalaCromatica[iAlvo]);
            }
        }
    }

    return modeloGerado;
}


function zerandoEstilo(){
    for (var i = 0; i < cordas.length; i++){
        casas = cordas[i].getElementsByClassName("casa");
        for (c of casas){
            c.classList.remove("naEscala");
            c.classList.remove("notaPrincipal");
        }
    }
}

function casainicio(arrModelo){
    if(modelo > 0){
        notasinicioCordas = [];
        for (var i = 0; i < cordas.length; i++){
            casas = cordas[i].getElementsByClassName("casa");
            for (var c = 0; c < casas.length; c++){
                if (casas[c].innerHTML == arrModelo[i][0]){
                    notasinicioCordas.push(c);
                    break;
                }
            }
        }

        if (notasinicioCordas.indexOf(11) > -1){
            notasinicioCordas = notasinicioCordas.map(n => n == 0? 12 : n);
        }
        return notasinicioCordas;
    }
}

function destacandoEscala(qualEscala, modelo = 0){ 
    zerandoEstilo();
    nCordas = cordas.length;
    if(modelo == 0 || qualEscala == ""){
        escala = geraEscala(qualEscala);   
        for (var i = 0; i < nCordas; i++){
            casas = cordas[i].getElementsByClassName("casa");
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
                    c.classList.remove("notaPrincipal");
                }
            }
        }
    }else{
        arrModelo = geraModelo(qualEscala, modelo);
        casaReferencia = casainicio(arrModelo);
        console.log(casaReferencia);
        for (var i = 0; i < nCordas; i++){
            casas = cordas[i].getElementsByClassName("casa");
            jaFoi = []
            for (var j = 0; j < casas.length; j++){
                c = casas[j];
                valor = c.innerHTML;
                if ((arrModelo[i].indexOf(valor) > -1) && (jaFoi.indexOf(valor) == -1)  && (j >= (casaReferencia[i] - 1))){
                    if (jaFoi.indexOf(arrModelo[i][0]) > -1 || valor == arrModelo[i][0]){
                        jaFoi.push(valor);
                        c.classList.add("naEscala");
                        if(qualEscala == valor){
                            c.classList.add("notaPrincipal");
                        }else{
                            c.classList.remove("notaPrincipal");
                        }
                    }
                    
                }else{
                    c.classList.remove("naEscala");
                    c.classList.remove("notaPrincipal");
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

for (var e of imgModelosEscalas){
    e.addEventListener("click", function(event){
        modelo = this.getAttribute("value");
        destacandoEscala(selectEscala.value, modelo)
    })
}