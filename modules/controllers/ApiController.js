const Controller = require('./Controller')

module.exports = new class ApiController extends Controller{

  async bulkAdd(req, res) {
    let contestants = []

    list = JSON.parse(req.body.data)

    for(let ctn of list) {
      contestants.push({name: ctn.name + " " + ctn.fname, university: ctn.uni, phone: ctn.phonenumber})
    }

    try{
      this.model.Contestant.insertMany(contestants)
        .then((l) => {
          res.json({done: contestants.length+" contestants added"})
        })
        .catch((err) => {
          if(err){
            res.json({success : err, data: contestants})
            throw err
          }
        });
    } catch (e) {
      console.log(e)
      res.json({success : false, error: e})
    }
  }

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
      if(err) {
        res.status(400).json({success: false, error: err.errmsg})
        process.exit(1);
      }
      this.model.Contestant.find({}, (error, contestants) => {
        if(error) {
          res.status(400).json({success: false, error: err.errmsg})
          process.exit(1);
        }
        res.json({success: true, contestants})
      })
    })
  }

  set(req, res) {
    req.checkBody('id' , 'ID is empty.').notEmpty()
    req.checkBody('type' , 'Type in empty.').notEmpty()
    req.checkBody('type' , 'Type is not valid.').isIn(["package", "sabatalk", "first_day_launch", "second_day", "second_day_launch", "fatabad_login", "fatabad_logout"])

    this.escapeAndTrim(req , 'id type')

    if(this.showValidationErrors(req, res)) 
        return;

    this.model.Contestant.findById(req.body.id, (err, contestant) => {
      if(err) {
        res.status(400).json({success: false, error: err.errmsg})
        process.exit(1);
      }
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
