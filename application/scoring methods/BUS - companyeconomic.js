

module.exports = (requestObject) => {
    
    let {employee_count, company_age, current_loans, repaid_loans, 	idr, fccr} = requestObject;
    let employee_count_score = 0;
    let company_age_score = 0;
    let current_loans_score = 0;
    let repaid_loans_score = 0;
    let idr_score = 0;
    let fccr_score = 0;


    if(employee_count){
        if(employee_count > 50){
            employee_count_score = 10;
        }
        if(employee_count > 15 && employee_count <= 50 ){
            employee_count_score = 8;
        }
        if(employee_count > 5 && employee_count <= 15 ){
            employee_count_score = 7;
        }
        if(employee_count > 0 && employee_count <= 5 ){
            employee_count_score = 4;
        }
     }

    if(company_age){
        if(company_age > 10){
            company_age_score = 10;
        }
        if(company_age > 2 && company_age <= 10){
            company_age_score = 7;
        }
        if(company_age >= 1 && company_age <= 2){
            company_age_score = 5;
        }
        if(company_age == 0){
            company_age_score = 3;
        }
    }

    if(	current_loans){
        if(current_loans >= 4){
            current_loans_score = 0;
        }
        if(current_loans == 3){
            current_loans_score = 5;
        }
        if(current_loans = 2){
            current_loans_score = 10;
        }
        if(current_loans = 1){
            current_loans_score = 15;
        }
        if(current_loans == 0){
           current_loans_score = 20;
        }
    }

    if(repaid_loans){
        if(repaid_loans > 5 ){
            repaid_loans_score = 40;
        }
        if(repaid_loans > 3 && repaid_loans <= 5){
            repaid_loans_score = 35;
        }
        if(repaid_loans >= 1 && repaid_loans <= 3){
            repaid_loans_score = 30;
        }
        if(repaid_loans == 0 ){
            repaid_loans_score = 20;
        }
}

    if(idr){
        if(idr > 0.9){
            idr_score = 0;
        }
        if(idr > 0.8 && idr <= 0.9){
            idr_score = 5;
        }
        if(idr > 0.7 && idr <= 0.8){
            idr_score = 10;
        }
        if(idr > 0.43 && idr <= 0.7){
            idr_score = 15;
        }
        if(idr > 0.40 && idr <= 0.43){
            idr_score = 20;
        }
        if(idr > 0.30 && idr <= 0.40){
            idr_score = 25;
        }
        if(idr > 0.25 && idr <= 0.30){
            idr_score = 30;
        }
        if(idr > 0.1 && idr <= 0.25){
            idr_score = 35;
        }
        if(idr >= 0 && idr <= 0.1){
            idr_score = 40;
        }
    }
    if(fccr){
        if(fccr > 2){
            fccr_score = 0;
        }
        if(fccr > 1.5 && fccr <= 2){
            fccr_score = 75;
        }
        if(fccr > 1.2 && fccr <= 1.5){
            fccr_score = 70;
        }
        if(fccr > 1.1 && fccr <= 1.2){
            fccr_score = 60;
        }
        if(fccr > 1 && fccr <= 1.1){
            fccr_score = 50;
        }
        if(fccr > 0.9 && fccr <= 1){
            fccr_score = 40;
        }
        if(fccr > 0.8 && fccr <= 0.9){
            fccr_score = 20;
        }
        if(fccr > 0.6 && fccr <= 0.8){
            fccr_score = 15;
        }
        if(fccr > 0.5 && fccr <= 0.6){
            fccr_score = 7.5;
        }
        if(fccr > 0.2 && fccr <= 0.5){
            fccr_score = 5;
        }
        if(fccr >= 0 && fccr <= 0.2){
            fccr_score = 0;
        }
    }

    return employee_count_score + company_age_score + current_loans_score + repaid_loans_score + idr_score + fccr_score;

}