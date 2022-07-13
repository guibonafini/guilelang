# Guile Esoteric Language

## Instalação

É possível instalar o cliente atráves do comando:

```
npm install -g https://github.com/guibonafini/guilelang.git
```

## Uso

A utilização é feita através da execução de um arquivo script através do seguinte comando:

```
guilelang run ./caminho-do-arquivo.guile
```

Ex.:
```sh
~: guilelang run ./sum-number.guile
~: A soma é igual a 18
```

## Especificações da linguagem

Abaixo estão descritas algumas especificações do uso da linguagem:

### Operadores Aritméticos

| Operador          | Descrição        |
| ----------------- | ---------------- |
| `+`, `plus`       | soma             |
| `-`, `minus`      | subtração        |
| `*`, `times`      | multiplicação    |
| `/`, `divided by` | divisão          |
| `^`, `power`      | potência         |
| `%`               | resto da divisão |

<br/>

### Operadores Lógicos

Os operadores lógicos seguem a mesmo padrão das portas lógicas em eletrônica digital:

- `and`
- `or` 
- `xor`
- `nand`
- `nor` 
- `xnor`


<br/>

### Operadores de comparação

| Operador                                                  | Descrição              |
| --------------------------------------------------------- | ---------------------- |
| `=`, `is`                                                 | A é igual a B          |
| `!=`, `is not`                                            | A é diferente de B     |
| `<`, `is less than`                                       | A é menor que B        |
| `>`, `is greater than`, `is more than`                    | A é maior que B        |
| `<=`, `is less or equal than`                             | A é menor ou igual a B |
| `>=`, `is greater or equal than`, `is more or equal than` | A é maior ou igual a B |


### Declaração de variáveis

A declaração de variáveis se dá através do operador `<--`. 

Se a variável já existir, o seu valor será atualizado. Todo nome de variável deve começar com caracteres alfabéticos (com ou sem captalização) ou então `_`. 

Todas as váriaveis estão presentes somente nos escopos em que foram definidas ou então nos escopos logo abaixo.

Ex.:
```
a <-- 2 + 1;
```

### Blocos de instruções

É possível enclausurar blocos de instruções dentro de parenteses (ex. `(a + b) * c`). A exceção fica aos comandos `if`, `while` e `fn`. Esses blocos devem sempre terminar com o comando `:endif`, `:endwhile` e `:endfn` respectivamente.


```

//Exemplo

fn showTheEnd: 
    print: "Finalizou!";
:endfn

fn _AplusB [a b]:
    sum = a + b;
    print: "A soma total de A e B é:" + sum;
:endfn

a <-- 0;
step <-- 1;
c <-- 0;

while c is less than 10:
    c <-- (_AplusB: a step);

    if c is more than 10:
        print: c + "is more than 3";
        break;
    :endif
:endwhile

showTheEnd;
```
<br/>
<br/>

---

## Exemplo

```
// Verifica se a é maior que b senão incrementa a até ser
fn aGreatThanBOrPrintC (a b step):
    if a is more than b and b is more than 0:
        print: a + " é maior que " + b;
    :endif

    if step:
        while a is less or equal than 200:
            print: "Incrementando a: " + a + " + " + step + " = " + (a + step);
            a <-- a + step;
            
            if a is more than b or a is b:
                print: "agora a é maior ou igual a b: " + a + " >= " + b;
                return: a - step;
            :endif
        :endwhile
        print: "Finalizando a execução";
    :endif
:endfn

aGreatThanBOrPrintC: 6 5;
aGreatThanBOrPrintC: 1 10 1;
```