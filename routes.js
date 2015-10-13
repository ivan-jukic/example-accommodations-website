module.exports = {
    home: {url: '/travel', ctl: 'EstablishmentList', method: 'loadTemplate', verb: 'get'},
    ngTemplates: {url: '/travel/ng-template/:module/:template', ctl: 'EstablishmentList', method: 'loadNgTemplate', verb: 'get'},
    establishmentGet: {url: '/travel/api/establishment', ctl: 'api/ApiEstablishment', method: 'getEstablishments', verb: 'get'}
};