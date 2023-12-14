/*Singleton*/
var obj = {
    myprop: 'my value',
};

/*
 A ideia do padrão singleton é ter apenas uma mesma instância de uma classe. Isso signfica que, na segunda vez
 que usar a mesma classe para criar um novo objeto, você deverá obter o mesmo objeto que foi criado na primeira vez.
 
 No JavaScript, não existem classes, apenas objetos. Quando você cria um objeto, na verdade não existe nenhum outro objeto igual a ele, e o novo
 objeto já é um singleton
 */

 var obj2 = {
    myprop: 'my value',
 };
 
 console.log(obj === obj2);


 /*
  O JavaScript não possui classes, então a definição literal de singleton tecnicamente não faz sentido,
  mas o JavaScript possui a sintaxe de new para criar objetos por meio de funções construtoras e as vezes
  vc pode querer uma implementação de singleton usando essa sintaxe. A ideia e que, quando voce utiliza new para criar objetos
  usando o mesmo construtor, vc devera obter apenas novos ponteiros exatamente para o mesmo objeto.
 */


  /* Instancia em uma propriedade estatica */
  function Universe() {
    // nos temos uma instancia existente?
    if (typeof Universe.instance === "object") {
        return Universe.instance;
    }

    // prossiga normalmente
    this.start_time = 0;
    this.bang = "big";

    //alocação 
    Universe.instance = this;
    // retorno implicito 
    return this;
  }

  var uni = new Universe();
  var uni2 = new Universe();
  console.log(uni === uni2);

  /*
   O único problema é que a instancia é publica.
  */

/* Instancia em closure*/

/*
Outra maneira de gerar o singleton no estilo de classes e usando um closure para proteger a instancia unica.
Vc pode implementar isso usando o padro de membro estatico privado.
*/

function Universe() {
    // instancia alocada
    var instance = this;

    // prossiga normalmente
    this.start_time = 0;
    this.bang = "big";

    // reescreva o construtor
    Universe = function () {
        return instance;
    }

}

var uni = new Universe();
var uni2 = new  Universe();
console.log(uni === uni2);

/*
Padrão factory
O objetivo da fábrica é criar objetos. Ela costuma ser implementada em uma classe
ou em um método estático de uma classe, que tem os seguintes propósitos:
 * Realizar operações repetidas quando se definem objetos semelhantes.
 * Oferecer uma forma ao cliente de a fábrica criar objetos sem conhecer o tipo específico (classe) em tempo de compilação.
Vejamos um exemplo de implementação em que temos:
 * Um construtor pai CarMaker
 * Um método estático do CarMaker chamado factory(), que cria objetos de carros.
 * Construtores especializados CarMaker.Compact, CarMaker.SUV, CarMaker.Convertible, que herdam de CarMaker.
*/

var corolla = CarMaker.factory("Compact");
var solstice = CarMaker.factory("Convertible");
var cherokee = CarMaker.factory('SUV');
 
corolla.drive();
solstice.drive();
cherokee.drive();

/*
 Essa parte :
    var corolla = CarMaker.factory('compact')
É provavelmente a mais reconhecível no padrão de Fábrica. Você tem um método que aceita uma string
em tempo de execução que, então, cria e retorna objetos do tipo requisitado.
Não há construtores usados com new, nem objetos literais a vista, apenas uma função que cria objetos baseados em um tipo
identificado por uma string.    
 */

function CarMaker() {};

// metodo pai
CarMaker.prototype.drive = function () {
    return "Vroom, I have " + this.doors + " doors";
};

// metodo de fabrica estatico
CarMaker.factory = function (type) {
    var constr = type,
    newcar;

    if (typeof CarMaker[constr] !== "function") {
        throw {
            name: "Error",
            message: constr + " doesn't exist"
        };
    }
    // herda o pai
    if (typeof CarMaker[constr].prototype.drive !== "function") {
        CarMaker[constr].prototype = new CarMaker();
    }

    // cria uma nova instancai
    newcar = new CarMaker[constr]();
    return newcar;
}

// Define construtores de carros especificos
CarMaker.Compact = function () {
    this.doors = 4;
};

CarMaker.Convertible = function () {
    this.doors = 2;
};

CarMaker.SUV = function () {
    this.doors = 24;
}

/*
Fabrica de objetos embutidas

Como um exemplo de "fábrica na prática", considere o construtor global embutido Object().
Ele também se comporta como uma fábrica, porque cria diferentes objetos dependendo da entrada. 
Se você passar para ele um número primitivo, ele pode criar um objeto com o construtor Number() nos 
bastidores. O mesmo é verdade para valores de string e booleanos.

*/

var o = new Object(),
    n = new Object(1),
    s = Object('1'),
    b = Object(true);

    console.log(o.constructor === Object);
    console.log(n.constructor === Number);
    console.log(s.constructor === String);
    console.log(b.constructor === Boolean);



    /*
    Iterator
    No padrão iterator, você tem um objeto contendo algum tipo de dado agregado.
    Esse dado pode ser armazenado internamente em uma estrutura complexa, e você
    deseja fornecer acesso fácil a cada elemento da estrutura. O consumidor do objeto
    não precisa saber como você estrutura seus dados; tudo que ele precisa saber é como trabalhar
    com os elementos individuais.
    No padrão iterator, seu objeto precisa fornecer um método next(). Chamar Next() em sequência
    deverá retornar o próximo elemento consecutivo que cabe você decidir o que "next" signfica
    em sua estrutura de dados específica. 
    */
   var element;
   while (element = agg.next()) {
    console.log(element);
   }

   /*
   * No padrão iterator, o objeto agregado normalmente fornece também um método de conveniência
   hasNext
   */
  while (agg.hasNext()) {
    console.log(agg.next());
  }

  /*
   Exemplo de implementação
  */

   var agg = (function () {
    var index = 0,
        data = [1, 2, 3, 4, 5],
        length = data.length
    return {
        next: function () {
            var element;
            if (!this.hasNext) {
                return null;
            }

            element = data[index];
            index = index + 2;
            return element;
        },
        hasNext: function () {
            return index < length;
        },
        rewind: function () {
            index = 0;
        },
        current: function () {
            return data[index];
        }
        
    };

   }());

while (agg.hasNext()) {
    console.log(agg.next());
}

agg.rewind();
console.log(agg.current());
// Generator function retorna um generator
function* makeRangeIterator(start = 0, end = Infinity, step = 1) {
    let iterationCount = 0;
    for (let i = start; i < end; i += step) {
      iterationCount++;
      // pausa e resume uma generator function
      yield i;
    }
    return iterationCount;
  }

  var it = makeRangeIterator(1, 10, 1);
  console.log(it.next());

  /*
  Decorator
   No padrão decorador, funcionalidades extras podem ser adicionadas dinamicamente
   a um objeto a tempo de execução
  */


   /*
    Utilização
   */

    var sale = new Sale(100);
    sale = sale.decorate("fedtax");
    sale = sale.decorate("quebec");
    sale = sale.decorate("money");
    sale.getPrice();
 /*
 Como você pode ver, essa é uma maneira muito flexível de adicionar funcionalidade
 e ajustar um objeto em tempo de execução.
 */

 /*
 Implementação
 Uma maneira de implementar o padrão decorator é fazendo cada objeto decorador 
 ser um objeto que contenha métodos a ser sobrescritos.
*/

// Começa com um construtor e um método do tipo protótipo
function Sale(price) {
    this.price = price || 100;
}

Sale.prototype.getPrice = function () {
    return this.price;
}

// Todos os objetos decoradores serão implementados como propriedades de uma propriedade do construtor
Sale.decorators = {};
/* Vejamos um decorador de exemplo. Ele é um objeto que implementa o método getPrice() customizado.
 Perceba que o método obtém o valor do método-pai e, então, modifica esse valor.
*/

Sale.decorators.fedtax = {
    getPrice: function () {
        var price = this.uber.getPrice();
        price += price * 5 / 100;
        return price;
    }
}

/*
 De maneira semelhante, podemos implementar outros decoradores, tantos quantos
 forem necessários. Eles podem ser extensões da funcionalidade central de Sale(), implementando
 como plugins. Eles podem até "Viver" em arquivos adicionais e serem desenvolvidos e compartilhados por desenvolvedores
 terceirizados:
*/

Sale.decorators.quebec = {
    getPrice: function () {
        var price = this.uber.getPrice();
        price += price * 7.5 / 100;
        return price;
    }
};

Sale.decorators.money = {
    getPrice: function () {
        return "$" + this.uber.getPrice().toFixed(2);
    }
}

Sale.decorators.cdn = {
    getPrice: function () {
        return "CDN$ " + this.uber.getPrice().toFixed(2);
    }
}
/*
Finalmente, vejamos o método "Mágico" chamado decorate(), que junta todas as peças
Lembre que ele será chamado assim:
*/

sale = sale.decorate('fedtax');

/*
A string 'fedtax' corresponderá a um objeto implementado em Sales.decorators.fedtax.
O objeto recém-decorado newobj herdará o objeto que temos até agora (seja o original ou aquele após
a adição do último decorador), que é o objeto this. Para fazer a parte da herança, vamos usar o padrão
de construtor temporário do capítulo anterior.
Também definimos a propriedade uber de newobj para que os filhos tenham acesso ao pai. Em seguida, 
copiamos  toda as propriedades extras do decorador ao objeto recém-decorado newobj.
No final newobj é retornado e, no nosso exemplo de uso concreto, ele se torna o objet o sale atualizado.
*/

Sale.prototype.decorate = function (decorator) {
    var F = function () {}, 
    overrides = this.constructor.decorators[decorator],
    i, newobj;
    F.prototype = this;
    newobj = new F();
    newobj.uber = F.prototype;
    for (i in overrides) {
        if (overrides.hasOwnProperty(i)) {
            newobj[i] = overrides[i];
        }
    }
    return newobj;
}

/*Implementação usando uma lista*/
/*
Vamos explorar uma implementação ligeiramente diferente, que se beneficia da natureza dinâmica 
do JavaScript e que não necessita do uso de herança. Além disso, em vez de fazermos cada método
decorado chamar o método anterior da cadeia, podemos simplesmente passar o resultado do método
anterior como parâmetro ao próximo método.

Tal implementação poderia também permitir a fácil "desadornação", ou seja, desfazer a decoração, o que
significa simplesmente remover um item da lista de decoradores.
*/

var sale = new Sale(100);
sale.decorate('fedtax')
sale.decorate('quebec')
sale.decorate('money')

/*
* O construtor Sale() agora possui uma lista de decoradores como uma propriedade particular
*/

function Sale(price) {
    this.price (price > 0) || 100;
    this.decorators_list = [];
}

/*
 Os decoradores disponíveis são, mais uma vez, implementados como propriedades de Sale.decorators. Perceba que os métodos
 getPrice() agora são mais simples porque eles não chamam getPrice() do pai para obter resultados intermediários; esse resultado
 é passado a eles como um parâmetro.
*/

Sale.decorators = {};

Sale.decorators.fedtax = {
    getPrice: function (price) {
        return price + price *  5 / 100;
    }
};

Sale.decorators.quebec = {
    getPrice: function (price) {
        return price + price *  7.5 / 100;
    }
};

Sale.decorators.money = {
    getPrice: function (price) {
        return "$" + price.toFixed(2);
    }
};

/*
* A parte interessante acontece nos métodos decorate() e getPrice(). Na implementação
* anterior decorate() era um tanto complexo e getPrice() era bem simples.
* Na implementação a seguir ocorre o contrário: decorate() apenas anexa a uma lista, enquanto
* getPrice() faz todo o trabalho O trabalho inclui percorrer a lista dos decoradores atualmente adicionados e chamar
* cada um dos métodos getPrice(), passando o resultado do anterior.
*/

Sale.prototype.decorate = function (decorator) {
    this.decorators_list.push(decorator);
}

Sale.prototype.getPrice = function () {
    var price = this.price,
        i,
        max = this.decorators_list.length,
        name;

        for (i = 0; i < max; i += 1) {
            name = this.decorators_list[i];
            price = Sale.decorators[name].getPrice(price);
        }

        return price;
}

/* Strategy */
/*
O padrão estratégia permite a você selecionar algoritmos em tempo de execução.
Os clientes de seu código podem trabalhar com  mesma interface, mas selecionando a partir de uma quantidade 
de algoritmos disponíveis para tratar suas tarefas específicas, dependendo do contexto daquilo que estejam fazendo.

Um exemplo de uso do padrão de estratégia seria resolver o problema da validação de formulário. Você pode criar um objeto validator
com um método validate(). Esse é o método que será chamado independentemente do tipo contreto de formulário e que sempre 
retornará o mesmo resultado - uma lista de dados que não validaram e quaisquer mensagens de erro.

Porém dependendo do formulário concreto e dos dados a serem validados, os clientes de seu validador podem escolher tipos diferentes
de verificações.  O seu validador seleciona a melhor estratégia para tratar a tarefa e delega as verificações de dados 
concretos para o algoritmo apropriado 

Exemplo de validação de dados

Digamos que você tenha o seguinte bloco de dados, provavelmente vindo de um formulário em uma página e que você deseja verificar se é válido:
*/

var data = {
    first_name: "Super",
    last_name: "Man",
    age: "Unknow",
    username: "o_O"
}

/*
Para o validador saber qual é a melhor estratégia a utilizar nesse exemplo concreto, primeiro você precisa configurar o validator
e definir as regras daquilo que você considera ser válido e aceitável.

Digamos que você não exija um sobrenome e que aceita qualquer coisa como primeiro nome, mas você exige que a idade seja um número e que o nome de usuário tenha
apenas letras e números, sem símbolos especiais. A configuração seria algo assim:
*/

validator.config = {
    first_name: "isNonEmpty",
    age: "isNumber",
    username: "isAlphaNum"
}

/*
    Agora que o objeto validator está configurado para tratar seus dados, você chama o seu método validate() e imprime qualquer erro de validação no console.
*/
validator.validate(data);
if (validator.hasErrors()) {
    console.log(validator.messages.join("\n"));
}


/*
Agora vejamos como o validator é implementado. Os algoritmos disponíveis para as verificações são objetos
com uma interface predefinida - eles fornecem um método validate() e uma informação de ajuda em uma linha , para ser usada em mensagens de erro:
*/

// verifica se os valores não estão vazios
validator.types.isNonEmpty = {
    validate: function (value) {
        return value !== "";
    },
    instructions: "The value cannot be empty"
}

// Verifica se o valor é um número
validator.types.isNumber = {
    validate: function (value) {
        return !isNaN(value);
    },
    instructions: "The value can oly be a valid number, e.g 1, 3.14 or 2023"
}

// Verifica se o valor contém apenas letras e números
validator.types.isAlphaNum = {
    validate: function (value) {
        return !/[^a-z0-0]/i.test(value);
    },
    instructions: "The value can only contain characters and numbers, no special symbols"
}

// e finalmente, o núcleo do objeto validator:

var validator = {
    //todas as verificações disponíveis
    type: {},
    // mensagens de erro da sessão de validação atual
    messages: [],
    // configuração de validação atual
    // nome: tipo de validação
    config: {},
    // o método de interface
    // 'data' contém pares chave => valor
    validate: function (data) {
        var i, msg, type, checker, result_ok;
        for (i in data) {
            if (data.hasOwnProperty(i)) {
                type = this.config[i];
                checker = this.types[type];

                if (!type) {
                    continue; // não há necessidade de validar
                }

                if (!checker) {
                    throw {
                        name: "ValidationError",
                        message: "No handler to validate type " + type
                    }
                }
                result_ok = checker.validate(data[i])
                if (!result_ok) {
                    msg = "Invalid value for *" + i + "*, " + checker.instructions;
                    this.messages.push(msg)
                }

            }
        }
        return this.hasErrors();
    },
    //auxiliar
    hasErrors: function () {
        return this.messages.length !== 0;
    }

}

/*
Como você pode ver, o objeto validator é genérico e poderia ser mantido dessa forma
para todos os casos de uso de validação. A maneira de melhorá-lo seria adicionando
mais tipos de verificações. Se você usá-lo em várias páginas, em breve terá uma bela
coleção de verificações específicas. Então, tudo que precisa fazer para cada um dos
novos casos de uso é configurar o validador e executar o método validate
*/


// Facade
/*
* A fachada é um padrão simples: ela fornece apenas uma interface alternativa pra um objeto, é uma boa prática de projeto manter seus métodos curtos
* e não força-los a realizar muito trabalho. Ao seguir essa prática, Você acabará com um número muito maior de métodos do que se tivesse métodos uber
* com muitos parâmetros. Algumas vezes, dois ou mais métodos podem comumente ser chamados em conjunto. Em tais casos, faz sentido criar outro método que encapsule as chamadas a métodos
* repetitivas

* Por exemplo, ao tratar eventos de navegador, você tem os seguintes métodos:
* stopPropagation()
*   Captura o evento e não o deixa ser transmitido aos nós-pais
* preventDefault()
* Não permite que o navegador faça a ação padrão (por exemplo, seguir um link ou enviar um formulário)
*/

/*
* Temos dois métodos separados com propósitos diferentes, e eles devem ser mantidos separados, mas ao mesmo tempo, eles costumam ser chamados em conjunto
*. Então, em vez de duplicar as chamadas dos dois métodos ao longo de toda a aplicação, você pode criar um método de fachada que chamaria ambos os métodos:
*/

var myevent = {
    stop: function(e) {
        e.preventDefault();
        e.stopPropagation();
    }
};

 /*
 * O padrão de fachada também serve no caso de scripts de navegador em que as diferenças entre os navegadores podem ser escondidas em uma fachada.
 * Continuando do exemplo anterior. você pode adicionar o código que trata as diferenças na API de evento do IE.
 * 
 */

 var myevent = {
    stop: function(e) {
        if (typeof e.preventDefault === "function") {
            e.preventDefault();
        }
        if (typeof e.stopPropagation === "function") {
            e.stopPropagation();
        }
        // IE
        if (typeof e.returnValue === "function") {
            e.returnValue = false;
        }
        if (typeof e.cancelBubble === "boolean") {
            e.cancelBubble = true;
        }
    }
 }


/* 
* O padrão de fachada é útil nos casos de esforços de reengenharia e refatoração. Quando você deseja substituir um objeto por uma implementação diferente,
* você precisará fazê-lo durante certo tempo (é um objeto complexo), enquanto, paralelamente, o novo código que usa esse objeto está sendo escrito. Você 
* pode começar pensando a respeito da API do novo objeto e, então, prosegguir para a criação de uma fachada na frente do objeto antigo que obedecerá a nova API.
* Dessa maneira, quando conseguir substituir completamente o objeto antigo, você terá menos código de cliente para modificar, porque qualquer código de cliente recente já 
* utilizará a nova API.
*/

/* Proxy */

/*
 No padrão de proxy (procurador), um objeto atua como uma interface para outro objeto.
 Ele é diferente do padrão de fachada, em que tudo que você tem são métodos de conveniência que combinam
 várias outras chamadas a métodos. O proxy fica entre o cliente de um objeto e o objeto em si e protege o acesso a esse objeto.
 Esse padrão pode parecer uma sobrecarga, mas ele é útil por questões de desempenho.
 O Proxy serve como um guardião do objeto (também chamado de "sujeito real") e tenta minimizar o trabalho realizado pelo sujeito real.
 Um exemplo de usuo seria algo que podemos chamar de inicialização preguiçosa. Imagine que inicialziar o sujeito real é dispendioso e aconteça de o cliente   
 inicializá-lo, mas nunca utilizá-lo. Nesse caso o proxy pode ajudar sendo a interface do sujeito real.
 O proxy recebe a requisição de inicialização, mas não a passa adiante até ter certeza de que o sujeiro real
 será utilizado de fato.
 */

 /*
 * Um exemplo
 * O padrão de proxy é útil quando o sujeito real realiza algo caro. Em aplicações Web, uma das operações
 * mais dispendiosas que você pode fazer é uma requisição de rede, então faz sentido combinar requisições HTTP
 * o máximo possível. Vamos pegar um exemplo que faz exatamente isso para demonstrar o padrão de proxy em ação
 */

// colocar um exemplo aqui (exemplo do livro depreciado)


/* Mediator */

/*
 Aplicações - grandes e pequenas - são compostas de objetos separados. Todos
 esses objetos precisam de uma maneira de se comunicar entre si que não atinja negativamente
 a manutenção e a sua capacidade de alterar com segurança uma parte da aplicação sem quebrar o resto dela.
 Conforme a aplicação cresce, você adiciona mais e mais objetos. Então, durante a refatoração, objetos são
 removidos e rearranjados.
 Quando os objetos sabem muito um do outro e se comunicam diretamente (chamam métodos uns dos outros e alteram propriedades),
 isso pode levar a um acoplamento forte indesejado. Quando os objetos estão intimamente acoplados, não é fácil
 alterar um objeto sem afetar vários outros. Então, mesmo a mudança mais simples em uma aplicação deixa de ser trivial, tornando-se
 virtualmente impossível estimar o tempo que uma mudança levará

 O padrão mediator alivia essa situação promovendo o acoplamento fraco e ajuda a melhorar a manutenibilidade.
 Nesse padrão, os objetos indepedentes (colegas) não se comunicam diretamente, mas através de um objeto mediador. Quando um dos 
 colegas altera um estado, ele notifica o mediador, e o mediador comunica a mudança a quaisquer outros colegas que precisem saber disso.

 Exemplo
*/

/*
Os objetos de jogador são criados com um construtor Player() e possuem as propriedades particulares points e name. 
O método play() do protótipo incrementa os pontos em um e, em seguida, notifica o mediador:
*/

function Player(name) {
    this.points = 0;
    this.name = name;
}

Player.prototype.play = function () {
    this.points += 1;
}

/*
O objeto scoreboard possui um método update(), que é chamado pelo objeto mediador após cada turno de cada jogador.
O placar não sabe da existência de jogadores e não mantem os valores; ele exibe apenas o placar dado a ele pelo mediador
*/

var scoreboard = {
    // elemento HTML a ser atualizado
    element: document.getElementById("results"), 
    // atualiza a exibição do placar
    update: function (score) {
        var i, msg = "";
        for (i in score) {
            if (score.hasOwnProperty(i)) {
                msg += "<p><strong>" + i + "<\/strong>: ";
                msg += score[i]
                msg + "<\/p>"
            }
        }
        this.element.innerHTML = msg;
    }
}

var mediator = {
    // todos os jogadores
    players: {},
    // inicialização
    setup: function () {
        var players = this.players;
        players.home = new Player("home");
        players.guest = new Player("guest");
    },
    // alguém jogou, atualize o placar
    played: function () {
        var players = this.players,
        score = {
            Home: players.home.points,
            Guest: players.guest.points,
        };
        scoreboard.update(score);
    },
    // trata as interações de usuário
    keypress: function (e) {
        e = e || window.event; // IE
        if (e.which === 49) { // tecla "1"
            mediator.players.home.play();
            return;
        }
        if (e.which == 48) {
            mediator.players.guest.play();
            return;
        } //tecla 0
    }
};

// E a ultima coisa é definir e executar o jogo
mediator.setup();
window.onkeypress = mediator.keypress

// fim do jogo em 30 segundos
setTimeout(function () {
    window.onkeypress = null;
    alert("Game Over!");
}, 3000)

/*
 Observer
 O padrão observador é amplamente usado em programação JavaScript no lado do cliente.
 Todos os eventos de navegador (mouseover, keypress, etc.) são exemplos do padrão.
 Outro nome para ele seria eventos customizados, significando eventos que você cria por meio de programação
 , ao contrário dos eventos que o navegador dispara.
 Ainda outro nome seria padrão subscriber/publisher.

 A principal motivação por trás desse padrão é promover o acoplamento fraco. Em vez de um objeto chamar um método de outro objeto, um objeto
 se inscreve (subscribes) na atividade específica de outro objeto e é notificado. O subscriber também é chamado de observador, enquando o objeto
 sendo observado é chamado publisher ou sujeito. 
 O publisher notifica (chama) todos os subscribers quando um evento importante ocorre e normalmente pode passar uma mensagem na forma de um objeto de evento.
*/

/*
Exemplo 1
Para entender como implementar esse padrão, vamos analisar um exemplo concreto.
Digamos que você tenha uma editora que publique um jornal diário e uma revista mensal em um papel.
Um subscriber joe será notificado sempre que algo novo for publicado.

O objeto paper precisa ter uma propriedade subscribers, um array que armazena todos os assinantes. O ato de inscrição não passa de uma adição
a esse array. O último método importante de paper é publish(), que chamará os métodos dos objetos inscritos. Em resumo, um objeto publisher precisa ter estes
membros:
*/

/*
Subscribers - um array
subscribe()
    Adiciona ao array de subscribers
unsubscribe()
    Remove do array de subscribers
Publish()
    Itera os subscribers e chama os métodos fornecidos por eles no momento de inscsrição
*/

/*
Todos os três métodos precisam de um parametro type, porque um publisher pode disparar vários eventos (publicar uma revista e um jornal)
e os assinantes podem escolher assinar um, mas não outro.
*/
var publisher = {
    subscribers: {
        any: [] // tipo do evento: subscribers
    },
    subscribe: function (fn, type) {
        type = type || 'any';
        if (typeof this.subscribers[type] === "undefined") {
            this.subscribers[type] = [];
        }
        this.subscribers[type].push(fn);
    },
    unsubscribe: function (fn, type) {
        this.visitSubscribers('unsubscribe', fn, type);
    },
    publish: function (publication, type) {
        this.visitSubscribers('publish', publication, type);
    },
    visitSubscribers: function (action, arg, type) {
        var pubtype = type || 'any',
        subscribes = this.subscribers[pubtype],
        i,
        max = subscribes.length;

        for (i = 0; i < max; i += 1) {
            if (action === 'publish') {
                subscribes[i](arg);
            } else {
                if (subscribes[i] === arg) {
                    subscribes.splice(i, 1);
                }
            }

        }
    }

};
/*
E aqui está uma função que pega um objeto e transforma-o em um publisher, simplesmente copiando os métodos do publisher genérico.
*/
function makePublisher(o) {
    var i;
    for (i in publisher) {
        if (publisher.hasOwnProperty(i) && typeof publisher[i] === "function") {
            o[i] = publisher[i];
        }
    }
    o.subscribers = {any: []}
}
// Agora vamos implementar o objeto paper. Tudo que ele pode fazer é publicar diária e mensalmente:
var paper = {
    daily: function() {
        this.publish("big news today")
    },
    montly: function () {
        this.publish("Interesting analysis", "monthly");
    }
};
// Transformando em um publisher:
makePublisher(paper);

// Agora que temos um publisher, vejamos o objeto subscriber chamado joe, que possui dois métodos:
var joe = {
    drinkCoffee: function (paper) {
        console.log("Just Read" + paper);
    }, 
    sundayPreNap: function (monthly) {
        console.log('About to fall asleep reading this ' + monthly);
    }
};

// Agora paper inscreve joe (em outras palavras, joe se inscreve em paper)
paper.subscribe(joe.drinkCoffee);
paper.subscribe(joe.sundayPreNap, "monthly");

/*
 Como você pode ver, joe fornece um método que será chamado no caso do evento-padrão "any" e um outro método que será achamado quando o tipo de evento
 "monthly" ocorrer. Agora vamos disparar alguns eventos.
*/

paper.daily();
paper.daily();
paper.daily();
paper.monthly();
/*
Todas essas publicações chamam os métodos apropriados de Joe, e o resultado no console é:
A parte boa aqui é que o objeto paper não armazenou o objeto joe, e joe não armazenou o objeto paper.
Também não existe um objeto mediador que sabe de tudo. Os objetos participantes estão
fracamente acoplados e, sem modificá-los, podemos adicionar mais subscribers a paper; além disso, joe pode cancelar
a sua assinatura a qualquer momento.

Vamos levar esse exemplo um passo adiante e transformar joe em um publisher (afinal, com os blogs e microblogs, qualquer um pode se tornar um publisher)
Assim, joe torna-se um publisher e pode postar atualizações de estado no twitter.

*/

makePublisher(joe);
joe.tweet = function (msg) {
    this.publish(msg);
};

/*
 Agora, imagine que o departamento de relações públicas do jornal decida ler o que os seus leitores twittam e se inscreve em Joe, fornecendo o método readTweets():
*/

paper.readTweets = function (tweet) {
    alert('Call big meeting! Someone ' + tweet);
}

joe.subscribe(paper.readTweets);

joe.tweet("Hated the paper today!")

/*
Exemplo 2: O jogo de pressionamento de teclas
Vejamos outro exemplo. Vamos implementar o mesmo jogo de pressionamento de teclas do exemplo de padrão
mediador, mas dessa vez usando o padrão observer.
Para torná-lo um pouco mais avançado, vamos aceitar um número ilimitado de jogadores.
E não apenas dois. Ainda teremos o construtor Player() que cria objetos de jogador e o objeto scoreboard.
Só que o mediador agora vai se transformar no objeto game.

No padrão mediador, o objeto mediator sabe tudo sobre todos os outros objetos participantes 
e chama seus métodos. O objeto game no padrão de observador não fará isso;
em vez disso, ele vai deixar que os objetos se inscrevam nos eventos interessantes. 
Por exemplo, o scoreboard vai se inscrever no evento "scorechange" de game.

Primeiro, vamos rever o objeto publisher genérico e ajustar um pouco a sua interface
para deixá-la mais próxima do mundo dos navegadores.
 * Em vez de publish(), subsribe() e unsubscribe(), teremos fire(), on() e remove();
 * O tipo de evento será usado todas as vezes, então ele será o primeiro argumento das três funções
 * Um extra content pode ser fornecido, além da função do subscriber, para permitir que o método callback use this como referência ao seu objeto.
 
O novo objeto publisher torna-se:]
*/

var publisher = {
    subscribers: {
        any: [],
    }, 
    on: function(type, fn, context) {
        type = type || 'any';
        fn = typeof fn === "function" ? fn : context[fn];

        if (typeof this.subscribers[type] === "undefined") {
            this.subscribers[type] = [];
        }

        this.subscribers[type].push({ fn: fn, context: context || this });
    },
    remove: function (type, fn, context) {
        this.visitSubscribers('unsubscribe', type, fn, context);
    },
    fire: function (type, publication) {
        this.visitSubscribers('publish', type, publication);
    },
    visitSubscriber: function (action, type, arg, context) {
        var pubtype = type || 'any',
        subscribers = this.subscribers[pubtype],
        i,
        max = subscribers ? subscribers.length : 0;

        for (i = 0; i < max; i += 1) {
            if (action === 'publish') {
                subscribers[i].fn.call(subscribers[i].context, arg);
            }
            else {
                if (subscribers[i].fn === arg && subscribers[i].context === context) {
                    subscribers.splice(i, 1);
                }
            }
        }
    }
};

/*
 O novo construtor Player() torna-se:
*/

function Player(name, key) {
    this.points = 0;
    this.name = name;
    this.key = key;
    this.fire("newplayer", this);
}

Player.prototype.play = function () {
    this.points += 1;
    this.fire('play', this);
}

/*
 A parte nova é que o construtor aceita key, a tecla que o jogador
 pressiona para marcar pontos. Além disso, toda vez que um novo objeto
 de jogador é criado, um evento 'newplayer' é disparado. De forma semelhante, toda
 vez que um jogador joga, o evento "play" é disparado.

 O objeto scoreboard permanece o mesmo; ele simplesmente atualiza o display com o placar 
 atual.
 O novo objeto game consegue ficar de olho em todos os jogadores, então ele pode
 produzir um placar e disparar um evento 'scorechange' ele também se inscreve
 em todos os eventos 'keypress' do navegador e saberá quais teclas correspondem
 a quais jogadores:
*/

var game = {
    keys: {},
    addPlay: function (player) {
        var key = player.key.ToString().charCodeAt(0);
        this.keys[key] = player;
    },
    handleKeyPress: function (e) {
        e = e || window.event; //IE
        if (game.keys[e.which]) {
            game.keys[e.which].play();
        }
    },
    handlePlay: function (player) {
        var i,
         players = this.keys,
         score = {};

         for (i in players) {
            if (players.hasOwnProperty(i)) {
                score[players[i].name] = players[i].points;
            }
         }
         this.fire('scorechange', score);
    }
};

/*
 A função makePublisher(), que transforma qualquer objeto em um publisher,
 permanece igual a do exemplo do Jornal
*/
makePublisher(Player.prototype)
makePublisher(game)
/*
 O objeto game se increve nos evento 'play' e 'newsplayer' enquanto
 scoreboard se inscrevem em 'scorechange'
*/

Player.prototype.on('newsplayer', "addPlayer" , game)
Player.prototype.on('play', "handlePlay" , game)
window.onkeypress = game.handleKeyPress