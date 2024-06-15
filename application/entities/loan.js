

module.exports = class Loan {

    user_id;
    company_id;
    bank;
    loan_amount;
    loan_reason;
    repayment_period;
    collateral_type;
    job_status;
    status;
    business_plan_id;
    score;

    //  ADD BUSINESS PLAN ID
    //  TOTALSCORE OF EACH

    constructor({
        user_id,
        company_id,
        bank,
        loan_amount,
        loan_reason,
        repayment_period,
        collateral_type,
        job_status,
        business_plan_id,
        status,
        score,
    }) {

        this.user_id = user_id;
        this.company_id = company_id;
        this.bank = bank;
        this.loan_amount = loan_amount;
        this.loan_reason = loan_reason;
        this.repayment_period = repayment_period;
        this.collateral_type = collateral_type;
        this.job_status = job_status;
        this.business_plan_id = business_plan_id;
        this.status = status;
        this.score = score;
    }


}