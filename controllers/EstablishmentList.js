module.exports = EstablishmentList = function() {
    /// Constructor...
};

EstablishmentList.prototype.loadTemplate = function() {
    this.sendOuterHtml();
};

EstablishmentList.prototype.loadNgTemplate = function(module, template) {
    this.viewsDir = 'static/src/' + module + '/views/';
    this.setAltTemplate(template);
    this.sendInnerHtml();
};