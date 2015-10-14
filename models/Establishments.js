module.exports = Establishments = function(Jet) {
    var q = require('q');
    var sortMap = {
        stars: 'Stars',
        distance: 'Distance',
        cost: 'minCost',
        rating: 'UserRating'
    };

    /*
    Filter: Name Stars TrpRating(??) UserRating MinCost
    Sort: Distance Stars MinCost TrpRating(??) UserRating
    */

    var EstablishmentsSchema = Jet.mongoose.Schema({
        Distance: {
            type: Number,
            index: true
        },
        EstablishmentId: Number,
        EstablishmentType: String,
        Location: String,
        MinCost: {
            type: Number,
            index: true
        },
        Name: String,
        textSearch: {
            type: String,
            index: 'text'
        },
        Stars: {
            type: Number,
            index: true
        },
        UserRating: {
            type: Number,
            index: true
        },
        UserRatingTitle: String,
        UserRatingCount: Number,
        ImageUrl: String,
        ThumbnailUrl: String
    }, {collection: 'Establishments'});


    /**
     * Load data from the Establishments collection, and filter it.
     * @param filters
     */
    EstablishmentsSchema.statics.loadData = function(filters) {
        filters = filters || {};
        var deferred = q.defer();
        var limit = parseInt(filters.limit) ? parseInt(filters.limit) : 10;
        var skip = parseInt(filters.page) ? (parseInt(filters.page) - 1) * limit : 0;
        var query = this.find();

        query.limit(limit);
        query.skip(skip);

        if (filters.sortBy) {
            var sortObj = {};
            sortObj[sortMap[filters.sortBy.toLowerCase()]] = 'asc' === filters.sortDirection.toLowerCase() ? 1 : -1;
            query.sort(sortObj);
        }

        query.exec(function(err, data) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(data);
            }
        });

        return deferred.promise;
    };


    /**
     * Count the total number of entries.
     * @param filters
     * @returns {*}
     */
    EstablishmentsSchema.statics.countData = function(filters) {
        filters = filters || {};
        var deferred = q.defer();
        var where = {};

        this.count(where, function(err, count) {
            err ? deferred.reject(err) : deferred.resolve(count);
        });
        return deferred.promise;
    };


    /// Register model
    Jet.mongoose.model('Establishment', EstablishmentsSchema);
};