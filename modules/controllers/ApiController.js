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
        res.status(400).json({success: false, error: err.errmsg})
      this.model.Contestant.find({}, (error, contestants) => {
        if(error)
          res.status(400).json({success: false, error: error.errmsg})
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

    this.model.Contestant.findById(req.body.id, (err, contestant) => {
      if(err) throw err;
      if(!contestant)
        res.json({success: false, error: "user not found"})
      else
        if(contestant[req.body.type]) {
          contestant[req.body.type] = false
          contestant.save()
          res.json({success: true, contestant})
        } else
          res.json({success: false, error: "item not found"})
    })
  }
}
