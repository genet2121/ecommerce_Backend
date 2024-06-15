

module.exports = class BusinessPlan {

    sector;
    sub_sector;
    description;
    opportunity_created;
    total_income;
    current_stage;
    stimated_cost;
    business_groups;
    monthly_revenue;
    user_id;
    company_id;
    score;

    constructor({
        sector,
        sub_sector,
        description,
        loan_return_date,
        opportunity_created,
        total_income,
        current_stage,
        stimated_cost,
        business_groups,
        monthly_revenue,
        user_id,
        company_id,
        score
    }) {

        this.sector = sector,
        this.sub_sector = sub_sector,
        this.description = description,
        this.loan_return_date = loan_return_date,
        this.opportunity_created = opportunity_created,
        this.total_income = total_income,
        this.current_stage = current_stage,
        this.stimated_cost = stimated_cost,
        this.business_groups = business_groups,
        this.monthly_revenue = monthly_revenue,
        this.user_id = user_id,
        this.company_id = company_id,
        this.score = score
    }


}
