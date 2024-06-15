

module.exports = class CompanyEconomic {

    user_id;
    name;
    employee_count;
    company_age;
    current_loans;
    repaid_loans;
    idr;
    fccr;
    assets;
    score;

    constructor({
        user_id,
        name,
        employee_count,
        company_age,
        current_loans,
        repaid_loans,
        idr,
        fccr,
        assets,
        score
                }){  
            
        this.user_id = user_id;
        this.name = name;
        this.employee_count = employee_count;
        this.company_age = company_age;
        this.current_loans = current_loans;
        this.repaid_loans = repaid_loans;
        this.idr = idr;
        this.fccr = fccr;
        this.assets = assets;
        this.score = score;
    }

    


}