

module.exports = (requestObject) => {
    
    let {experience, source_of_income, current_loans, repaid_loans, dti} = requestObject;
    let experienceScore = 0;
    let source_of_incomeScore = 0;
    let current_loansScore = 0;
    let repaid_loansScore = 0;
    let dtiScore = 0;

    if(experience){
        if(experience > 10){
            experienceScore = 7.5;
        }
        if(experience > 2 && experience <= 10 ){
            experienceScore = 5;
        }
        if(experience >= 1 && experience <= 2 ){
            experienceScore = 3;
        }
        if(experience == 0){
            experienceScore = 3;
        }
    }

    if(source_of_income){
        if(source_of_income > 5){
            source_of_incomeScore = 7.5;
        }
        if(source_of_income == 5){
            source_of_incomeScore = 6;
        }
        if(source_of_income == 4){
            source_of_incomeScore = 5;
        }
        if(source_of_income == 3){
            source_of_incomeScore = 4;
        }        
        if(source_of_income == 2){
            source_of_incomeScore = 3;
        }
        if(source_of_income == 1){
            source_of_incomeScore = 2;
        }
        if(source_of_income == 0){
            source_of_incomeScore = 0;
        }
    }

    if(	current_loans){
        if(	current_loans > 3){
            current_loansScore = 3;
        }
        if(	current_loans == 2){
            current_loansScore = 5;
        }
        if(	current_loans == 1){
            current_loansScore = 10;
        }
        if(	current_loans == 0){
            current_loansScore = 15;
        }
}

     if(repaid_loans){
        if(repaid_loans > 10){
            repaid_loansScore = 30;
        }
        if(repaid_loans > 5 && repaid_loans <= 10 ){
            repaid_loansScore = 27;
        }
        if(repaid_loans >= 1 && repaid_loans <= 5 ){
            repaid_loansScore = 25;
        }
        if(repaid_loans == 0){
            repaid_loansScore = 15;
        }
     }

     if(dti){
        if(dti > 0.9){
            dtiScore = 25;
        }
        if(dti > 0.8 && dti <= 0.9){
            dtiScore = 30;
        }
        if(dti > 0.75 && dti <= 0.8){
            dtiScore = 35;
        }
        if(dti > 0.7 && dti <= 0.75){
            dtiScore = 40;
        }
        if(dti > 0.65 && dti <= 0.7){
            dtiScore = 35;
        }
        if(dti > 0.6 && dti <= 0.65){
            dtiScore = 50;
        }
        if(dti >= 0.55 && dti <= 0.6){
            dtiScore = 55;
        }
        if(dti > 0.5 && dti <= 0.55){
            dtiScore = 60;
        }
        if(dti > 0.43 && dti <= 0.5){
            dtiScore = 65;
        }
        if(dti > 0.40 && dti <= 0.43){
            dtiScore = 70;
        }
        if(dti > 0.30 && dti <= 0.40){
            dtiScore = 75;
        }    
        if(dti > 0.25 && dti <= 0.30){
            dtiScore = 80;
        }
        if(dti > 0.1 && dti <= 0.25){
            dtiScore = 85;
        }
        if(dti >= 0 && dti <= 0.1){
            dtiScore = 90;
        }
     }

    return experienceScore + source_of_incomeScore + current_loansScore + repaid_loansScore + dtiScore;
}