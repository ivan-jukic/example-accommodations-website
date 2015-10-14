var Jet;
module.exports = ApiEstablishment = function(JetRef) {
    this.defaultFilters = {
        limit: 5,
        page: 0
    };
};

ApiEstablishment.prototype._construct = function(next) {
    Jet = this.Jet;
    next();
};

ApiEstablishment.prototype.getEstablishments = function() {
    var self = this;
    var Establishment = Jet.mongoose.models.Establishment;
    var count = null;
    var items = null;
    var query = this.req.query;
    var extend = require('util')._extend;
    var filters = extend(this.defaultFilters, query);

    if (filters.priceRange) {
        filters.priceRange = filters.priceRange.split(',');
        filters.priceRange.forEach(function(val, index, arr) {
            arr[index] = parseInt(val);
        });
    }

    if (filters.ratingRange) {
        filters.ratingRange = filters.ratingRange.split(',');
        filters.ratingRange.forEach(function(val, index, arr) {
            arr[index] = parseInt(val);
        });
    }

    if (filters.stars) {
        filters.stars = parseInt(filters.stars);
    }

    Establishment.loadData(filters).then(
        function(data) {
            items = [];
            for(var i in data) {
                items.push(data[i]._doc);
            }
            sendResponse();
        },
        function(err) {
            self.handleError(err);
        });

    Establishment.countData(filters).then(
        function(countResult) {
            count = countResult;
            sendResponse();
        },
        function(err) {
            self.handleError(err);
        });

    function sendResponse() {
        if (null == count || null == items) {
            return false;
        }

        var res = {
            items: items,
            total: count,
            limit: self.defaultFilters.limit,
            page: self.defaultFilters.page,
            totalPages: Math.ceil(count / self.defaultFilters.limit)
        };

        self.json(res);
    }
};

ApiEstablishment.prototype.handleError = function(err) {
    try {
        this.setStatusCode(400);
        this.json(err);
    } catch(e) {
        console.log(e);
        this.finish();
    }
};