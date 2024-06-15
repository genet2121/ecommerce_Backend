


module.exports = class Economic {

    user_id;
    field_of_employment;
    experience;
    source_of_income;
    current_loans;
    repaid_loans;
    dti;
    assets;
    score;

    constructor({
        user_id,
        field_of_employment,
        experience,
        source_of_income,
        current_loans,
        repaid_loans,
        dti,
        assets,
        score,
    }) {

        this.user_id = user_id,
        this.field_of_employment = field_of_employment,
        this.experience = experience,
        this.source_of_income = source_of_income,
        this.current_loans = current_loans,
        this.repaid_loans = repaid_loans,
        this.dti = dti,
        this.assets = assets
        this.score = score
    }


}