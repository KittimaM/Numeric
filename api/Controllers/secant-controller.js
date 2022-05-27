const rq_controller = require('../Models/secant-model')

const rq_post = async (req,res,next) =>{
    const {pb,x0,x1} = req.body

    const create = new rq_controller ({
        pb ,
        x0,
        x1
    })

    try {
        await create.save()
    }catch(e){
        console.log(e);
    }

    res.status(201).json({rq_controller: create})
}

const rq_get = async (req,res,next) =>{
    let rq
    try{
        rq = await rq_controller.find()
    }catch(e){
        console.log(e);
    }

    res.status(200).json(rq)
}

exports.rq_post = rq_post
exports.rq_get = rq_get