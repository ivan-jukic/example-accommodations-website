var Jet = require('jet-framework')();

/**
 * When server is started, initialize models, and populate database.
 */
Jet.addEventListener('onServerStart', function() {
    Jet.mongoose = require('mongoose');
    var mongoDb = Jet.app.get('mongoDbName');
    var mongoHost = Jet.app.get('mongoDbSettings').host;
    var mongoPort = Jet.app.get('mongoDbSettings').port;

    /// Here we can add many other models that we might have.
    var mongoModels = [
        '/models/Establishments'
    ];

    /// Initialize models!
    for (var i in mongoModels) {
        require(process.cwd() + mongoModels[i])(Jet);
    }

    /// Connect to the MongoDB instance.
    Jet.mongoose.connect('mongodb://' + mongoHost + (mongoPort ? ':' + mongoPort : '') + '/' + mongoDb);
    Jet.mongoose.connection.on('error', function(err) {
        console.log(err, '\nThe app could not connect to the MongoDB instance.' +
                            'Check your configuration settings, and make sure that the MongoDB instance is running.');
        process.exit(-1);
    });

    Jet.mongoose.connection.once('open', function() {
        console.log('MongoDB connected! Initialize data...');

        /**
         * Once we are connected to the MongoDB, we can insert our test data.
         *
         */
        var i, data = require(process.cwd() + '/fixtures/hotels.json');
        for (i = 0; i < data.Establishments.length; i++) {
            /// We are creating single full text search field which we will use for filtering by text, search.
            /// Other fields can be concatenated and the resulting string can be filtered from unnecessary
            /// characters or short words.
            data.Establishments[i].textSearch = data.Establishments[i].Name.toLowerCase();
        }

        /// Drop the old collection!
        Jet.mongoose.connection.db.dropCollection('Establishments', function(err, result) {
            /// Insert new collection
            Jet.mongoose.models.Establishment.collection.insert(data.Establishments, function(err, result) {
                if (err) {
                    console.log(err, '\nError occurred while inserting new Establishment collection.');
                } else {
                    console.log('Created new Establishment collection.');
                }
            });
        });
    });
});