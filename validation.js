



// Validate Registrstion
const validateRegistration = async(req, res, next)=>{
    const { firstName, lastName, email, password } = req.body
    
    const errors = []

    if(!email){
        errors.push("Please add email")
    }

    if(password.length < 8){
        errors.push("Minimum of eight characters required for password.")
    }

    if(errors.length > 0){
        return res.status(400).json({message: errors})
    }


    next()
}

// Validate Login
const validateLogin = async(req, res, next)=>{

    const { email, password } = req.body

    const errors = []

    if(!email){
        errors.push("Please add your email")
    } else if(!validEmail(email)){
        errors.push("Email format is incorrect")
    }

    if(!password){
        errors.push("Please add your password")
    }

    if(errors.length > 0){
        return res.status(400).json({message: errors})
    }

    next()

}

// Validate Email With Regex
const validEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const quizValidation = async(req, res, next)=>{
    const { category, userId, quizId, quizAns} =req.body
    const wans ="Incorrect!"
    const rAns = "Correct!"
    let totalcorrect = 0

   
    if(quizAns[0].ans =="A"){
       quizAns[0].ans= rAns
    }else{
        quizAns[0].ans=wans
    }   
    
    if(quizAns[1].ans =="D"){
        quizAns[1].ans= rAns
     }else{
         quizAns[1].ans=wans
     } 

     if(quizAns[2].ans =="C"){
        quizAns[2].ans= rAns
     }else{
         quizAns[2].ans=wans
     } 

     if(quizAns[3].ans =="A"){
        quizAns[3].ans= rAns
     }else{
         quizAns[3].ans=wans
     } 

     if(quizAns[4].ans =="B"){
        quizAns[4].ans= rAns
     }else{
         quizAns[4].ans=wans
     } 

     if(quizAns[5].ans =="C"){
        quizAns[5].ans= rAns
     }else{
         quizAns[5].ans=wans
     }  

     if(quizAns[6].ans =="D"){
        quizAns[6].ans= rAns
     }else{
         quizAns[6].ans=wans
     } 
    
     if(quizAns[7].ans =="C"){
        quizAns[7].ans= rAns
     }else{
         quizAns[7].ans=wans
     } 

     if(quizAns[8].ans =="C"){
        quizAns[8].ans= rAns
     }else{
         quizAns[8].ans=wans
     } 
     if(quizAns[9].ans =="A"){
        quizAns[9].ans= rAns
     }else{
         quizAns[9].ans=wans
     } 
     
    next()
}

module.exports = {
    validateRegistration,
    validateLogin,
    validEmail,
    quizValidation
    
}