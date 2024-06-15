const prisma = require("@prisma/client");
const prismaDB = new prisma.PrismaClient();

module.exports = async (requestObject, loggedInUser) => {

    let { current_stage, loan_return_date, opportunity_created, monthly_revenue, stimated_cost, business_groups, user_id } = requestObject;
    let current_stage_score = 0;
    let loan_return_date_score = 0;
    let opportunity_created_score = 0;
    let monthly_revenue_score = 0;
    let stimated_cost_score = 0;
    let business_groups_score = 0;



    if (current_stage) {
        if (current_stage == "ideation") {
            current_stage_score = 15;
        }
        if (current_stage == "revenue") {
            current_stage_score = 20;
        }
        if (current_stage == "post_revenue") {
            current_stage_score = 25;
        }
    }

    if (loan_return_date) {
        if (loan_return_date == 3) {
            loan_return_date_score = -50 / 50;
        }
        if (loan_return_date >= 6 && loan_return_date <= 12) {
            loan_return_date_score = 40 / 50;
        }
        if (loan_return_date > 12 && loan_return_date <= 24) {
            loan_return_date_score = 30 / 50;
        }
        if (loan_return_date > 24 && loan_return_date <= 36) {
            loan_return_date_score = 20 / 50;
        }
    }

    if (opportunity_created) {
        if (opportunity_created > 100) {
            opportunity_created_score = 75;
        }
        if (opportunity_created > 50 && opportunity_created <= 100) {
            opportunity_created_score = 60;
        }
        if (opportunity_created > 20 && opportunity_created <= 50) {
            opportunity_created_score = 50;
        }
        if (opportunity_created > 10 && opportunity_created <= 20) {
            opportunity_created_score = 40;
        }
        if (opportunity_created >= 0 && opportunity_created <= 10) {
            opportunity_created_score = 20;
        }
    }


    if (monthly_revenue) {
        if (monthly_revenue > 1000000) {
            monthly_revenue_score = 75;
        }
        if (monthly_revenue > 500000 && monthly_revenue <= 1000000) {
            monthly_revenue_score = 70;
        }
        if (monthly_revenue > 100000 && monthly_revenue <= 500000) {
            monthly_revenue_score = 65;
        }
        if (monthly_revenue > 50000 && monthly_revenue <= 100000) {
            monthly_revenue_score = 55;
        }
        if (monthly_revenue > 30000 && monthly_revenue <= 50000) {
            monthly_revenue_score = 45;
        }
        if (monthly_revenue > 10000 && monthly_revenue <= 30000) {
            monthly_revenue_score = 20;
        }
    }

    if (stimated_cost) {
        if (stimated_cost > 1000000) {
            stimated_cost_score = 10 / 25;
        }
        if (stimated_cost > 200000 && stimated_cost <= 1000000) {
            stimated_cost_score = 20 / 25;
        }
        if (stimated_cost >= 100000 && stimated_cost <= 200000) {
            stimated_cost_score = 25 / 25;
        }
    }

    if (business_groups) {
        if (business_groups > 100) {
            business_groups_score = 60;
        }
        if (business_groups > 20 && business_groups <= 100) {
            business_groups_score = 50;
        }

        if (business_groups > 20 && business_groups <= 100) {
            business_groups_score = 50;
        }
        if (business_groups > 10 && business_groups <= 20) {
            business_groups_score = 40;
        }
        if (business_groups > 5 && business_groups <= 10) {
            business_groups_score = 25;
        }
        if (business_groups >= 1 && business_groups <= 5) {
            business_groups_score = 15;
        }
    }
    
 

    let total_score = current_stage_score + loan_return_date_score + opportunity_created_score + monthly_revenue_score + stimated_cost_score + business_groups_score;

    if(loggedInUser.Roles.includes("admin") && loggedInUser.Id == user_id) {
        throw new Error("Admins Cannot create plans for them self");
    }

    if(loggedInUser.Roles.includes("bank")) {
        throw new Error("Banks Cannot create business plans");
    }

    if(loggedInUser.Roles.includes("company") && loggedInUser.Id != user_id) {
        throw new Error("Companies Cannot create business plans other than for them self");
    }

    if(loggedInUser.Roles.includes("personal")) {
        requestObject.user_id = loggedInUser.Id;
    } else if(loggedInUser.Roles.includes("company") || loggedInUser.Roles.includes("admin")) {

        let user = null;

        if(loggedInUser.Roles.includes("admin")) {

            user = await prismaDB.user.findUnique({
                where:{
                    id: user_id
                } 
            });
        
            if(!user){
                throw deps.exceptionHandling.throwError("user not found", 404);
            }

        }

        const found_company = await prismaDB.company.findFirst({
            where:{
                user_id: loggedInUser.Roles.includes("admin") ? user.id : loggedInUser.Id
            }
        });
        
        if(found_company) {
            requestObject.company_id = found_company.id;
        }

    }

     requestObject.score = total_score;

     return requestObject;

}