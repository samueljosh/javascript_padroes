/* Privacy Failure */
/*
*  When you return directly a privacy variable from a privacy method and this variable it is a object or an array
* e external code could modify this variable, because it's passsed by reference
*/

function Gadget() {
    // private method
    var specs = {
        screen_width: 320,
        screen_height: 480,
        color: 'white',
    }
    this.getSpecs = function () {
        return specs;
    }
}

/*
    The problem here is because 'getSpecs' returns a reference of specs objects, This allows the gadget user
    to modify the seemingly hidden an private specs property
*/

var toy = new Gadget(),
    specs = toy.getSpecs();
    specs.color = 'black';
    specs.price = 'free';
    console.dir(toy.getSpecs());

/* Literal objects and privacy */
/*
* Is it possible to achieve privacy in literal objects
* using closure created by immediate function anonymous. 
*/
var myobj;
(function() {
    var name  =  "my, oh  my";
    // whitout var
    myobj = {
        getName: function() {
            return name;
        }
    }
}());
myobj.getName();

/*
* Module pattern
* The pattern provides tools for decoupled code snipping
*/

/*
* Create namespace
*/

var MYAPP = {
    utilities: {
        array: {}
    }
}

/*
* The next step it is create an auto immediate function that will provide a private scoped.
* The immediate function returns an object, a real module with own public interface, that will become available for
* the module's consumers 
*/

MYAPP.utilities.array = (function () {
    return {
        // to do ...
    }
}());

/*
* Next we will add some methods to the public interface
*/

MYAPP.utilities.array = (function () {
    return {
        inArray: function (needle, haystack) {
            // ...
        },
        isArray: function (a) {
            // ...

        }
    }
}());

/*
* Using the private scope by the auto immediate function, you will be able to 
* create private properties and methods as needed.
* The top of the auto immediate function will also be the place to create any dependency
* that your module may have.
*/

MYAPP.utilities.array = (function () {
    // dependencies 
    var uobj = MYAPP.utilities.object,
        ulang = MYAPP.utilities.lang,

        // private properties
        array_string = "[object Array]",
        ops = Object.prototype.toString;

    // optionally, unique procedures of initialization 

    // public api
    return {
        inArray: function (needle, haystack) {
            // ...
        },
        isArray: function (a) {
            // ...

        }
    }
}());


/*
* Revelation Module pattern

*/

MYAPP.utilities.array = (function () {
    // private properties
    var array_string = "[object Array]",
        ops = Object.prototype.toString

    // private methods
    inArray = function (haystack, needle) {
        // ...
    }
    isArray = function (a) {
        // ...
    }

    return {
        isArray: isArray,
        indexOf: inArray,
    }

}());

/*
* Importing global into the module
* You can pass arguments to the immediate function that encapsulates the module
* Importing globals helps speed up the resolution of global symbols within the immediate function
* because the imported variables become local to the function
*/

MYAPP.utilities.module = (function (app, global) {
    // referencias ao objeto global
    //
}(MYAPP, this));

/*
* Sandbox pattern 
* The sandbox pattern solves the problems of the namespace pattern.
* As the name suggests, "sandbox" provides an environment for modules to "play around" without
* affecting other modules and their personal sandboxes
*/

/*
* A global constructor
* In the namespace pattern, you have a global object; In the sandbox pattern, 
* the only global is a constructor, let's call it sandbox(). You create objects 
* using this constructor and also pass a callback function that will become the isolated
* sandbox environment of your code.
*/
new Sandbox(function (box) {
    // your code here
});
/*
* The box object will look like to MYAPP from the namespace example,
*/

/*
* Membros estáticos
* Propiedades e metódos estaticos são aqueles que não mudam de uma
* instancia para a outra
*/
// Construtor
var Gadget = function () {}
// Método estático
Gadget.isShiny = function () {
    return "you bet";
}

// Um método regular adicionado ao protótipo
Gadget.prototype.setPrice = function(price) {
    this.price = price;
}

// Chamando um método estático
Gadget.isShiny();
// Criando uma instância e chamando um método
var iphone = new Gadget();
iphone.isShiny();

/*
* Uma tentativa de chamar um método de instancia estaticamente não vai funcionar
o mesmo occorre com um metodo estático que utilize o objeto iphone instanciado
*/
console.log(typeof Gadget.setPrice)
console.log(typeof iphone.isShiny)

/*
* Membros estáticos privados
* Compartilhados por todos os objetos criados com a mesma função construtora
* Não acessíveis fora do construtor
*/

var Gadget = (function () {
    var counter = 0;
    return function () {
        console.log(counter += 1);
    }

}());

var g1 = new Gadget(); 
var g2 = new Gadget(); 
var g3 = new Gadget(); 


/*
* Constantes de objeto
* Não existe constantes no JavaScript, apesar de a maioria dos ambientes atuais
* oferecer a você a declaração const para criar constantes
* Como alternativa, uma abordagem comum é usar uma convenção de nomeação e destacar
* variáveis que não devem mudar usando apenas maiúsculas.
*/
Math.PI 
Math.SQRT2
Number.MAX_VALUE 
/*
* No caso das suas constantes, você pode adotar a mesma convenção de nomeação e adicioná-las 
* como propriedades estáticas a função construtora
*
*/

// construtor
var Widget = function () {
    // implementação
}
// constantes
Widget.MAX_HEIGHT = 320;
Widget.MAX_WIDTH = 480;

/*
* Padrao de encadeamento (chaining)
* myobj.method1('hello').method2().method3('world').method4();
* Ao criar metodos que nao tenham um valor de retorno signficativo, voce pode 
faze-los retornar this, a instancia do objeto com o qual se esta trabalhando,
isso permitira aos consumidores deste objeto chamar o proximo metodo encadeado ao anterior

*/

var obj = {
    value: 1,
    increment: function () {
        this.value += 1;
        return this;
    },
    add: function (v) {
        this.value += v;
        return this;
    },
    shout: function () {
        console.log(this.value);
    }
};

//chamadas encadeadas do metodo
obj.increment().add(3).shout();

/*
* Metodo method()
* Usar funcoes construtoras se assemelha a usar classes em java.
* Elas tambem permitem que voce adicione propriedades de instancia a this dentro do corpo
* do construtor. No entanto, adicionar metdos a this e ineficiente, porque eles acabam sendo recriados a cada instancia,
* o que consome mais memoria, E por isso que mnetodos reutilizaveis devem ser adicionados a propriedades prototype do construtor
*/

var person = function (name) {
    this.name = name;
}.method('getName', function () {
    return this.name;
}).method('setName', function (name) {
    this.name = name;
    return this;
})

/*
* Assim que o method e implementado
*/
if (typeof Function.prototype.method !== "function") {
    Function.prototype.method = function (name, implementation) {
        this.prototype[name] = implementation;
        return this;
    }
}