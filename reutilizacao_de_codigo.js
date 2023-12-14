/*
* Resultado esperado quando se usa herança clássica
* O objetivo de implementar a herança clássica é fazer objetos
* criados por uma função construtora Child() receber as propriedades que 
* venham de outro construtor parent()(pai)
*/
// exemplo

// construtor-pai
function Parent(name) {
    this.name || 'Adam';
}
// adicionando funcionalidades ao prototipo
Parent.prototype.say = function () {
    return this.name;
}
/*
* O metodo inherit nao existe no javascript (legacy) e deve ser implementado
*/

// padrao classico 1
function inherit(C, P) {
    C.prototype = new P();
}

function Child(name) { }

inherit(Child, Parent);


/*
* A propriedade prototype deve apontar para um objeto (instancaia), e nao para uma funcao
*/
// var kid = new Child();
// kid.say();

var parent = new Parent();
parent.say("teste")

console.log(new Parent().say())

/*
* Um problema desse padrão é que você herda tanto as propriedades particulares adicionadas
* a this quanto as propriedades do protótipo. Na maior parte das vezes vocë não vai querer as propriedades
* particulares, porque elas tendem a ser especificas a uma instancia não sendo reutilizáveis
*/
/*
Outra coisa sobre o uso de uma função inherit() genérica é que ela não lhe permite 
passar parâmetros ao construtor-filho, que os passaria, então ao pai. Considere este exemplo: 
*/
var s = new Child('Seth');
s.say(); // "Adam"

//  Padrão rent-a-constructor
/*
* O próximo padrão resolve o problema de passar argumentos do filho para o pai.
*
*/

function Child(a, c, b, d) {
    Parent.apply(this, arguments);
}

/*
* Dessa forma você consegue herdar apenas as propriedades adicionadas a this dentro de construtor pai.
* Você não herda membros que tenham sido adicionados ao protótipo.
*/

/*
* A Cadeia de protótipos
*/

// Construtor-pai
function Parent(name) {
    this.name = name || 'Adam';
}

Parent.prototype.say = function () {
    return this.name;
}

// Construtor filho
function Child(name) {
    Parent.apply(this, arguments)
}

var kid = new Child("Patrick")
console.log(kid.name);

/*
* Neste caso perceberá que não existe mais uma ligação entre
* o novo objeto Child e Parent, isso porque o Child.prototype não foi utilizado em momento algum.
*/

/* Herança múltipla por empréstimo de construtores */

function Cat() {
    this.legs = 4;
    this.say = function () {
        return "meaoww";
    }
}

function Bird() {
    this.wings = 2;
    this.fly = true;
}

function CatWings() {
    Cat.apply(this);
    Bird.apply(this);
}

var jane = new CatWings();
console.dir(jane);

/*
* O problema desse padrão é que obviamente nada do protótipo é herdado e, como 
* foi mencionado anteriormente, o protótipo é o lugar para adicionar métodos e propriedades reutilizáveis
* que não serão recriados a cada instância 
*
* Um benefício é que você obtem cópias reais dos membros particulares do pai, e não há o risco de que um filho
* possa acidentalmente sobrescrever uma propriedade do pai.
*/

/*
* Padrão rent and set (Aluga e define) o protóripo
* Combina os dois padrões anteriores
* Você primeiro toma emprestado o construtor e, então, define o protótipo
* do filho para que aponte para uma nova instância do construtor
*/

function Child(a, c, b, d) {
    Parent.apply(this, arguments);
}

Child.prototype = new Parent();

/*
* O benfício disso é que os objetos resultantes obtêm cópias dos membros particulares
* do pai e referências as funcionalidades reutilizáveis do pai.
* O filho também pode passar quaisquer argumentos aos construtores-pai. 
* Esse comportamento é provavelmente o mais próximo que você conseguirá chegar do Java.
* você herda tudo que existe no pai, e ao mesmo tempo é seguro modificar as propriedades particulares 
* sem o risco de modificar o pai.
* Um único problema disso é que o construtor-pai é chamado duas vezes (propriedades como name, por exemplo são herdadas duas vezes).
*/

/* Vamos dar uma olhada e fazer alguns testes */

// o construtor-pai
function Parent(name) {
    this.name || 'Adam';
}

//  adicionando a funcionalidade ao pai
Parent.prototype.say = function () {
    return this.name;
}

// construtor-filho
function Child(name) {
    Parent.apply(this, arguments);
}

Child.prototype = new Parent();

var kid = new Child("Patrick");
kid.name // Patrick
kid.say(); // Patrick
delete kid.name;
kid.say(); // Adam

// Padrão - compartilhe o protótipo

/*
* Diferentemente do padrão clássico de herança anterior, que exigia duas chamadas ao construtor-pai
*, o próximo padrão não envolve chamar o construtor-pai
* O princípio básico era que os membros reutilizáveis deveriam ir para o protótipo, e 
* não para o this. Portanto para os propósitos da herança, qualquer coisa que valia a pena ser herdado
* deveria estar no protótipo.
*/

function inherit(C, P) {
    C.prototype = P.prototype;
}

/*
* Isso lhe dá pesquisas de cadeias de protótipos curtas e rápidas 
*, porque todos objetos, na verdade, compartilham o mesmo protótipo. Mas isso também
* poder ser um problema, pois, caso um filho ou neto em algum lugar na cadeia modifique o protótipo, isso
* afetará todos os pais e avós.
*/

// Padrão - um construtor temporário

/*
* O próximo padrão resolve o problema do mesmo protótipo quebrando a ligação direta entre o protótipo do pai
* e do filho, enquanto ao mesmo tempo se beneficia da cadeia de protótipos.
*/

/*
* A seguir é mostrada uma implementação desse padrão, em que você tem uma função vazia F()
* que serve como proxy (procurador) entre o filho e o pai. A propriedade prototype de F() aponta para o 
* protótipo do pai. O protótipo do filho é uma instância da função em branco.
*/

function inherit(C, P) {
    var F = function () { };
    F.prototype = P.prototype
    C.prototype = new F();

}

/*
* Esse padrão tem um comportamento ligeiramente diferente do padrão comum, porque aqui o filho
* herda apenas as propriedades do protótipo.
* E geralmente isso não é um problema, na verdade é preferível, porque o protótipo é o lugar para funcionalidades
* reutilizáveis. Nesse padrão, qualquer membro que o construtor-pai adicione a this não será herdado.
*/
var kid = new Child();

/*
* Se você acessar kid.name, ele estará indefinido. Nesse caso, name é uma propriedade particular do pai,
* e durante a herança nunca chamamos new Parent(), de forma que essa propriedade nunca foi criada.
*/

// armazenando superclasse

/*
*  Usando o padrão anterior como base, você pode adicionar uma referência ao pai original.
* Isto é como ter acesso a superclasse em outras linguagens, o que pode ser útil em certas ocasiões.
* A propriedade é chamada de uber porque "super" é uma palavra reservada.
*/

function inherit(C, P) {
    var F = function () { };
    F.prototype = P.prototype;
    C.prototype = new F();
    C.uber = P.prototype
}

// Redefinindo o ponteiro do construtor

/*
* A última coisa a ser adicionada nessa função de herança clássica quase perfeita
* é redefinir o ponteiro para a função construtora, no caso de precisá-lo ao longo do caminho.
* Se você não redefinir o ponteiro para o construtor, todos os objetos-filhos dirão que Parent() foi o seu 
* construtor, o que não é útil. Então, usando a implementação anterior de inherit(), você pode observar este comportamento.
*/

function Parent() { }
function Child() { }
inherit(Child, Parent)

var kid = new Child();
console.log(kid.constructor.name)
console.log(kid.constructor === Parent)
console.dir(kid)

/*
* A versão Santo Graal final desse padrão de herança clássica ficaria assim:
*/

function inherit(C, P) {
    var F = function () { };
    F.prototype = P.prototype
    C.prototype = new F();
    C.uber = P.prototype;
    C.prototype.constructor = C;
}

/*
* Uma otimização comum do padrão Santo Graal é evitar a criação do construtor temporário (proxy) toda vez
* que você ncessesite da herança. É suficiente criá-lo uma vez e apenas alterar seu protótipo.
* Você pode usar uma função imediata e armazenar a função de proxy em seu closure.
*/

var inherit = (function () {
    var F = function () { };
    return function (C, P) {
        F.prototype = P.prototype
        C.prototype = new F();
        C.uber = P.prototype;
        C.prototype.constructor = C;
    }
})

/*
* Herança prototípica
* Nesse padrão, não há classes envolvidas; aqui os objetos herdam de outros objetos.
* você pode imaginar isso desta maneira: você tem um objeto que gostaria de reutilizar e deseja criar um
* segundo objeto que obtém suas funcionalidades a partir do primeiro 
* 
*/

//  var parent = {
//     name: 'Papa'
//  }

//  var child = object(parent)

//  console.log(child.name)

function object(o) {
    function F() { }
    F.prototype = o
    return new F();
}

function Person() {
    //uma propriedade "particular"
    this.name = "Adam";
}

Person.prototype.getName = function () {
    return this.name;
}

// herança 
var kid = object(Person.prototype)

console.log(typeof kid.getName) // "function" Porque ela estava no protótipo
console.log(typeof kid.name) // "undefined" Porque apenas o protótipo foi herdado

/*
* No ECMAScript5 o padrão de herança prototípica torna-se oficialmente parte da linguagem.
* Esse padrão é implementado por meio do método Object.create(). Em outras palavras, você não precisará criar sua função
* semelhante a Object(), ela já estará embutida na linguagem
*/

var child = Object.create(parent);

/*
* Object.create() aceita um parâmetro adicional, um objeto. As propriedades do objeto extra serão
* adicionadas como propriedades particulares do novo objeto-filho retornado.
*/

var child = Object.create(parent, {
    age: { value: 2 }
});

child.hasOwnProperty("age") // true


/* 
* Herança por cópia de propriedades
* Nesse padrão, um objeto obtém funcionalidades de outro objeto simplesmente copiando-o. Aqui está 
* um exemplo de implementação de uma função extend() que faz isso
*/

function extend(parent, child) {
    var i,
        child = child || {};

    for (i in parent) {
        if (parent.hasOwnProperty(i)) {
            child[i] = parent[i];
        }

        return child;
    }
}
/*
* Essa é uma implementação é simples, que itera e copia todos os membros do pai. Nessa implementação, child é opcional;
* se você não passar um objeto existente para que seja expandido, um objeto novo em folha é criado e retornado
*/

var dad = { name: 'Adam' }
var kid = extend(dad);
console.log(kid.name)

/*
* A implementação dada realiza uma "Cópia rasa" do objeto. Uma cópia profunda, por outro lado signficaria 
* verificar se a propriedade que você está para copiar é um objeto ou array e, caso seja, iterar suas propriedade recursivamente
* e copiá-las também. Com a copia rasa (porque objetos são passsados por referência no JavaScript), se você alterar uma propriedade
* do filho, e por um acaso essa propriedade for um objeto, você também modificará o pai. Isso normalmente é preferível para métodos (
* já que funções também são objetos e são passadas por referência), mas pode causar algumas surpresas quando se está trabalhando com outros objetos
* e arrays. Considere isto:
*/
var dad = {
    counts: [1, 2, 3],
    reads: { paper: true }
};

var kid = extend(dad)
kid.counts.push(4);
console.log(dad.counts.toString());
console.log(dad.reads === kid.reads);

/*
* Agora vamos modificar a função extend() para que faça cópias profundas. Tudo que você 
* precisa é verificar se o tipo de uma propriedade é um objeto e, caso seja, copiar suas propriedades recursivamente.
* Outra verificação que você precisa fazer é se o objeto é realmente um objeto ou se é um array. Vamos usar a verificação da "natureza" de um array, discutida o capítulo 3.
*/

function extendDeep(parent, child) {
    var i,
        toStr = Object.prototype.toString;
    astr = "[object Array]";

    child = child || {};

    for (i in parent) {
        if (parent.hasOwnProperty(i)) {
            if (typeof parent[i] === "object") {
                child[i] = (toStr.call(parent[id]) === astr) ? [] : {};
                extendDeep(parent[i], child[i]);
            } else {
                child[i] = parent[i];
            }
        }
    }
    return child;
}
// Mix-ins (mistura)
/*
* Em vez de copiar de apenas um objeto, vc pode copiar de qualquer quantidade de objetos e misturá-lo em um novo objeto
*
*/


function mix() {
    var arg, prop, child = {};
    for (arg = 0; arg < arguments.length; arg += 1) {
        for (prop in arguments[arg]) {
            child[prop] = arguments[arg][prop];
        }
    }
    return child;
}

var cake = mix(
    { eggs: 2, large: true },
    { butter: 1, salted: true },
    { flour: "3 cups" },
    { sugar: "sure" },
)

console.dir(cake);

/* Métodos emprestados */

/* 
* Pode acontecer algumas vezes de você se interessar por apenas um ou dois metodos de um objeto existente.
* Você deseja reutilizá-los, mas não quer formar um relacionamento pai-filho.
* Nesses casos você pode usar call ou applçy
*/

noymyobj.doStuff.call(myobj, param1, p2, p3);
nomyobj.doStuff.apply(myobj, [param1, p2, p3]);

// Exemplo emprestando um array
/*
* Os arrays possuem métodos úteis, que os objetos semelhantes a array, como arguments. não possuem.
*/

function f() {
    var args = [].slice.call(arguments, 1, 3);
    return args;
}

// forma mais longa seria: Array.prototype.slice.call(...) 

/* Empresta e liga (borrow and bind) */

/*Empresta e liga*/

/*
* Quando você pega métodos emprestados por meio de call/apply() ou por meio de uma atribuição simples, o objeto para quem this aponta dentro do método emprestado
* é determinado com base na expressão chamada. Mas as vezes é melhor ter o valor de this "travado", ou ligado a um objeto específico, que tenha sido determinado previamente.
*/

var one = {
    name: 'object',
    say: function (greet) {
        return  console.log(greet + ", " + this.name);
    }
};

one.say("hi")

var two = {
    name: "another object"
};

one.say.apply(two, ['hello']);

/*
 Mas e no caso de cenários que você atribui o ponteiro da função a uma variável global ou em que você passa a função como um callback?
*/

// atribuindo a uma variavel
// 'this' apontará para o objeto global
var say = one.say
say('hoho');

//passando callback

var yetanother = {
    name: 'Yet another object',
    method: function (callback) {
        return callback("Hola");
    }
}

yetanother.method(one.say)

// Em ambos os casos, o this dentro de say() apontou para o objeto global, e o exemplo
// e o exemplo não funcionoiu, para ligar um objeto a um método, podemos usar uma função simples como essa

function bind(o, m) {
    return function () {
        return m.apply(o, [].slice.call(arguments));
    }
}

/*
 Essa função bind() aceita um objeto o e um método m, liga um ao outro, e então retorna outra função
 . A função retornada tem acesso a o e m por meio de um closeure. Portanto, mesmo depois do retorno de bind,
 a função interna terá acesso a o e m, sempre apontarão para o objeto e métodos originais.
*/
var twosay = bind(two, one.say);
twosay('yo');

/*
    Como você pode ver, mesmo que twosay() tenha sido criada como uma função global, this não aponta para o objeto global,
    mas sim para o objeto two, que foi passado para bind(d.
*/

// Function.prototype.bind
// Isso signfica ligar someFunc() a myobj, além de preencher os tres primeiros  argumentos que someFunc() espera.
// isso também é exemplo de aplicação de função parcial
var newFunc = obj.someFunc.bind(myobj, 1, 2 ,3 );