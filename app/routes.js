module.exports = function (app) {

    app.get('/api/todos', function (req, res) {
        res.json({ success: true });
    });

    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });
};
