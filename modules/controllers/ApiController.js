const Controller = require('./Controller')

module.exports = new class ApiController extends Controller{

  add(req, res) {
    req.checkBody('name' , 'Name is empty.').notEmpty()
    req.checkBody('university' , 'University in empty.').notEmpty()
    req.checkBody('phone' , 'Phone is empty').notEmpty()

    this.escapeAndTrim(req , 'name university phone')

    if(this.showValidationErrors(req, res)) 
        return;

    this.model.Contestant({
      name: req.body.name,
      university: req.body.university,
      phone: req.body.phone
    }).save((err) => {
      if(err)
        res.json({success: false, error: err.errmsg})
      this.model.Contestant.find({}, (error, contestants) => {
        if(error)
          res.json({success: false, error: error.errmsg})
        res.json({success: true, contestants})
      })
    })
  }

  set(req, res) {
    req.checkBody('id' , 'ID is empty.').notEmpty()
    req.checkBody('type' , 'Type in empty.').notEmpty()
    req.checkBody('type' , 'Type is not valid.').isIn(['package', 'first_day_launch', 'second_day_launch'])

    this.escapeAndTrim(req , 'id type')

    if(this.showValidationErrors(req, res)) 
        return;
    let obj = {}
    obj[req.body.type]=false
    this.model.Contestant.findByIdAndUpdate(req.body.id, obj, (err) => {
      if(err)
        res.json({success: false, error: err.errmsg})
      this.model.Contestant.find({}, (error, contestants) => {
        if(error)
          res.json({success: false, error: error.errmsg})
        res.json({success: true, contestants})
      })
    })
  }
}
