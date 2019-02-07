const path = require('path');

module.exports = {
    port : process.env.PORT || 6679,
    path : {
        controller : path.resolve('./modules/controllers'),
        model : path.resolve('./modules/models')
    }
}
