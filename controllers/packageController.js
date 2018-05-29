const PackageRepository = require('../repositories/packageRepository');

exports.get = (req, res, next) => {
    res.status(201).send('Requisição recebida com sucesso!');
    // client.get('allVertices', function (err, reply) {
    //     if (reply) {
    //         res.send(reply)
    //     } else {
    //         console.log('db');
    //
    //         VerticeRepository.getAll()
    //             .then((vertice) => {
    //                 client.set('allVertices', JSON.stringify(vertice));
    //                 client.expire('allVertices', 20);
    //                 res.status(200).send(vertice);
    //             }).catch(err => res.status(500).send(err))
    //     }
    // });

};

exports.getById = (req, res, next) => {
    VerticeRepository.getById(req.params.id).then((vertice) => {
        res.status(200).send(vertice);
    }).catch(err => res.status(500).send(err))
};

exports.post = (req, res, next) => {
    const p = req.body;
    console.log(req.body)
    VerticeRepository.create(p).then((vertice) => {
        res.status(200).send(vertice);
    }).catch(err => res.status(500).send(err))
};

exports.put = (req, res, next) => {
    const PackageRepository = require('../repositories/packageRepository')();
    var package = {
        name: "teste",
        type: "teste",
        value: "22.25"
    }
    PackageRepository.create(package).then((package) => {
        res.status(201).send(package);
    }).catch(err => res.status(500).send(err));
};

exports.delete = (req, res, next) => {
    VerticeRepository.delete(req.params.id).then((plan) => {
        res.status(200).send('delete succeeded!');
    }).catch(err => console.error.bind(console, `Error ${err}`))
};