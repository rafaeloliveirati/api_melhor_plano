<h1>Api Melhor Plano</h1>
Sistema voltado para retornar todos os planos de acordo com seu tipo ordenado por valor crescente

## Tecnologias
* [Meteor](https://reactjs.org)
* [NodeJs](https://nodejs.org)
* [Mongodb](https://www.mongodb.com)
* [ExpressJS](http://expressjs.com)

## Getting Started

Clone the repository:
```sh
git clone git@github.com:rafaeloliveirati/api_melhor_plano.git
```

Install npm packages:
```sh
npm install
```


## Running

```sh
npm start
```

## Tests
Os testes foram realizados com o Mocha e implementados na classe PackageServiceTest.js
```sh
npm test
```

## Api exposta:
```
/list-all-broadband
Lista todas as combinacoes de planos partindo dos pacotes com tipo igual banda larga

```
## FRONT END:
Acesso ao github feito em react js para montar o front
```
* [app_melhor_plano](https://github.com/rafaeloliveirati/app_melhor_plano)

```
## ESTRUTURA DE DADOS
A estrutura se baseada na teoria de grafos da matemática onde possui vértices e edge, os vértices
são os pacotes e cada pacote possui edges de acordo com a ligação do modelo repassado. Foi utilizado
no service recursividade onde repasso o primeiro pacote e vai verificando cada edge e adicionando os planos.

O sistema possui um banco mongo db com a seguinte estrutura:
```

    {"_id" : ObjectId(""),
	```
    "name" : "String",
	```
    "type" : "String",
	```
    "value" : Number,
	```
    "edges" : [
	```
        {
		```
            "_id" : ObjectId(""),
			```
            "value" : Number
			```
        },
		```
        {```
            "_id" : ObjectId(""),
			```
            "value" : Number
			```
        }
		```
    ]}
	```


* Iniciar o mongo local
```
C:\"Program Files"\MongoDB\Server\3.6\bin\mongod --dbpath D:\dev\projects\db