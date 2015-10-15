module.exports = {
    home: {url: '/', ctl: 'EstablishmentList', method: 'loadTemplate', verb: 'get'},
    ngTemplates: {url: '/ng-template/:module/:template', ctl: 'EstablishmentList', method: 'loadNgTemplate', verb: 'get'},
    establishmentGet: {url: '/api/establishment', ctl: 'api/ApiEstablishment', method: 'getEstablishments', verb: 'get'}
};