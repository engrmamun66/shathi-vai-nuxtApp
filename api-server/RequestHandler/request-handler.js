module.exports = function asd(app){
    app.post('/', (req, res) => {
        let {query, body, headers} = req
        // console.log([req.headers])
        res.send({query, body, headers});
    })
    app.get('/', (req, res) => {
        let {query} = req
        // console.log([req.headers])
        res.send({query});
    })
}