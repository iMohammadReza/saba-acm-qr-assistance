const Contestant = require('../models/contestant')

module.exports = class Controller {
    constructor() {
        this.model = { Contestant }
    }

    showValidationErrors(req, res) {
        let errors = req.validationErrors();

        if(errors) {
            res.status(422).json({
                error : errors.map(error => {
                    return {
                        'field' : error.param,
                        'message' : error.msg
                    }
                }),
                success : false
            });
            return true
        }
        return false
    }


    escapeAndTrim(req, items) {
        items.split(' ').forEach(item => {
            req.sanitize(item).escape()
            req.sanitize(item).trim()         
        })
    }
}