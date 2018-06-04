Api Melhor Plano
Sistema voltado para retornar todos os planos de acordo com seu tipo ordenado por valor crescente

TESTES:
Os testes foram realizados com o Mocha e implementados na classe PackageServiceTest.js
https://mochajs.org/
npm test

ESTRUTURA DE DADOS
O sistema possui um banco mongdb com a seguinte estrutura:

[{
    "_id" : ObjectId(""),
    "name" : "String",
    "type" : "String",
    "value" : Number,
    "edges" : [
        {
            "_id" : ObjectId(""),
            "value" : Number
        },
        {
            "_id" : ObjectId(""),
            "value" : Number
        }
    ]
}]
A estrutura se basea na teoria de grafos da matematica onde possui vertices e edge,
os vertices sao os pacotes e cada pacote possui edges de acordo com a ligacao do modelo repassado.
Foi utilizado no service recursividade onde repasso o primeiro pacote e vai verificando cada edge e adicionando os planos.

Inicializar mongo db
C:\"Program Files"\MongoDB\Server\3.6\bin\mongod --dbpath D:\dev\projects\db
