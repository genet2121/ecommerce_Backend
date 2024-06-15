

module.exports = (requestObject) => {
    
    let {age, education, marital_status, dependants, criminal} = requestObject;
    let ageScore = 0;
    let educationScore = 0;
    let marital_statusScore = 0;
    let dependantsScore = 0;
    let criminalScore = 0;

    if(age){
        if(age >= 18 && age <= 24 ){
            ageScore = 6;
        }
        if(age >= 25 && age <= 35 ){
            ageScore = 8;
        }
        if(age > 35){
            ageScore = 10;
        }
    }

    if(education){
        if(education == "highSchool"){
            educationScore = 5;
        }
        if(education == "diploma"){
            educationScore = 7;
        }
        if(education == "bachelor"){
            ageScore = 8;
        }

        if(education == "masters"){
            educationScore = 9;
        }
        if(education == "phd+"){
            educationScore = 10;
        }
    }

    if(marital_status){
        if(marital_status == "married"){
            marital_statusScore = 25;
        }
        if(marital_status == "unmarried"){
            marital_statusScore = 20;
        }
     }

     if(dependants){
        if(dependants > 10){
            dependantsScore = 10
        }
        if(dependants >= 5 && dependants <= 10 ){
            dependantsScore = 15;
        }
        if(dependants >= 3 && dependants <= 5 ){
            dependantsScore = 20;
        }
        if(dependants >= 1 && dependants <= 3 ){
            dependantsScore = 23;
        }
        if(dependants == 0 ){
            dependantsScore = 25;
        }
     }

     if(criminal){
        if(criminal == "no"){
            criminalScore = 30;
        }
        if(criminal == "yes/past five years" ){
            criminalScore = 10;
        }
        if(criminal == "yes/more than five years"){
            criminalScore = 15;
        }
    }

    return ageScore + educationScore + marital_statusScore + dependantsScore + criminalScore;
}