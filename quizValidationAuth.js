const quizValidation = async(req, res, next)=>{
    const {Category,quiz_ID,user_ID,quiz_and_answers} =req.body

    const errors = []


    if(!quiz_and_answers[0].ans=="A"){
        errors.push("Incorrect")
    // }
    // if(!quiz_and_answers[1].ans=="A"){
    //     errors.push("Incorrect")
    // }
    // if(!quiz_and_answers[2].ans=="D"){
    //     errors.push("Incorrect")
    // }
    // if(!quiz_and_answers[3].ans=="A"){
    //     errors.push("Incorrect")
    // }
    // if(!quiz_and_answers[4].ans=="B"){
    //     errors.push("Incorrect")
    // }
    // if(!quiz_and_answers[5].ans=="D"){
    //     errors.push("Incorrect")
    // }
    // if(!quiz_and_answers[6].ans=="A"){
    //     errors.push("Incorrect")
    // }
    // if(!quiz_and_answers[7].ans=="C"){
    //     errors.push("Incorrect")
    // }
    // if(!quiz_and_answers[8].ans=="C"){
    //     errors.push("Incorrect")
    // }
    // if(!quiz_and_answers[9].ans=="D"){
    //     errors.push("Incorrect")
    }

    if(errors.length > 0){
        return res.status(400).json({message: errors})
    }

    next()
}

module.exports = quizValidation