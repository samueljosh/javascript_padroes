 /*
 Separação de interesses
   => Conteúdo
   => Apresentação
   => Comportamento
 */

/*
 Técnica para testar diferenças de navegadores
*/

// antipadrão
if (navigator.userAgent.indexOf("MSIE") !== -1) {
    document.attachEvent("onclick", console.log);
}
// melhor
if (document.attachEvent) {
    document.attachEvent("onclick", console.log);
}

// ou ainda mais específico 
if (typeof document.attachEvent !== "undefined") {
    document.attachEvent("onclick", console.log);
}

/*
Scripts em dom
Trabalhar com a árvore DOM de uma página é uma das tarefas mais comuns do JavaScript no lado do cliente.
Isso também é uma das principais causas de dores de cabeça (e dá o JavaScript uma má reputação), porque os 
métodos DOM são implementados de forma incosistente nos navegadores.
*/

/*
Acessar ao DOM
O acesso ao dom é caro; ele é o maior gargalo no que diz respeito a desempenho no JavaScript.
É por isso que o DOM costuma ser implementado separadamente do mecanismo JavaScript. Do ponto de vista de um navegador,
faz sentido usar essa abordagem, porque uma aplicação JavaScript pode nem precisar do DOM.

O ponto principal é que o acesso ao DOM deveria ser reduzido ao mínimmo. Isso signfica:
    * Evitar acesso ao DOM dentro de loops;
    * Atribuir referências ao DOM em variáveis locais e trabalhar com essas variáveis locais
    * Usar a API Selectors (seletores) quando estiver disponível.
    * Prealocar o comprimento quando estiver iterando coleções HTML.

Considere o exemplo a seguir, em que o segundo loop (melhor), apesar de ser mais longo, será 
algumas dezenas ou centenas de vezes mais rápido, dependendo do navegador:
*/

// antipadrão

for (var i = 0; i < 100; i += 1) {
    document.getElementById("result").innerHTML += i + ",";
}

// melhor atualiza uma variável local

var i, content = "";

for ( i = 0; i < 100; i += 1) {
     content += i + ",";
}

document.getElementById("result").innerHTML += content;


/*
 No próximo trecho, o segundk exemplo (que usa uma variável local style) é melhor,
 apesar de exigir mais uma linha de código e mais uma variável:
*/

// antipadrão
var padding = document.getElementById("result").style.padding,
    margin = document.getElementById("result").style.margin;

    // melhor 
    var style = document.getElementById("result").style
        padding = style.padding,
        margin = style.margin;

// Usar API Selectors signfica usar os métodos:
 document.querySelector("ul .selected");