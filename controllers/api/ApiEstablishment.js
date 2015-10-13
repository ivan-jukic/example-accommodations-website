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

    console.log(query);
    console.log(filters);

    Establishment.loadData(this.defaultFilters).then(
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

    Establishment.countData().then(
        function(countResult) {
            count = countResult;
            sendResponse();
        },
        function(err) {
            self.handleError(err);
        });

    function sendResponse() {
        if (!count || !items) {
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
    this.setStatusCode(400);
    this.json(err);
};