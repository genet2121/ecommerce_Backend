
const prisma = require("@prisma/client");
const prismaDB = new prisma.PrismaClient();


const ProjectDependencies = require("../../configuration/dependencies");
const dependencies = new ProjectDependencies();

const deps = dependencies.getDependencies();

module.exports = async (requestObject) => {
    try{
        let { 
            user_id, 
            bank, age, loan_amount, loan_reason,
            repayment_period, collateral_type,
            job_status, business_plan_id, score
        } = requestObject;
        
        
        if(user_id){
            const user = await prismaDB.user.findUnique({
                where:{
                    id: user_id
                } 
             });
    
             if(!user){
                throw deps.exceptionHandling.throwError("user not found", 404);
             }
    
             if(user.Role == "personal"){
    
                let personalScore = 0;
                let economicScore = 0;
                let businessplanScore = 0;
    
                const userPersonal = await prismaDB.personal.findFirst({
                    where:{
                        id: user_id
                    } 
                 });
                 if(userPersonal){
                   personalScore = userPersonal.score;
                 }
    
                 const userEconomic = await prismaDB.economic.findFirst({
                    where:{
                        user_id: user_id
                    } 
                 });
                 if(userEconomic){
                   economicScore = userEconomic.score;
                 }
                 
                 const userBusinessplan = await prismaDB.businessplan.findFirst({
                    where:{
                        id: business_plan_id
                    } 
                 });
                 if(userBusinessplan){
                    businessplanScore = userBusinessplan.score;
                 }

                 requestObject.score = personalScore + economicScore + businessplanScore; 
                 return requestObject;
             }
             
             if(user.Role == "company"){
                
                let companyEconomicScore = 0;
                let companyBusinessplanScore = 0;
    
                const company_detail = await prismaDB.company.findFirst({
                    where:{
                        user_id: user_id
                    } 
                 });
                 if(!company_detail){
                    throw new Error("no company registered for this account!")
                 }
                
                 const companyEconomic = await prismaDB.companyeconomic.findFirst({
                    where:{
                        user_id: company_detail.id
                    }
                 });

                 if(companyEconomic) {
                    companyEconomicScore = companyEconomic.score;
                 }
    
                 const companyBusinessplan = await prismaDB.businessplan.findFirst({
                    where:{
                        company_id: company_detail.id
                    }
                 });
    
                 if(companyBusinessplan){
                    companyBusinessplanScore = companyBusinessplan.score;
                 }
                 
                 requestObject.score = companyEconomicScore + companyBusinessplanScore;
                 requestObject.company_id = company_detail.id;
                 return requestObject;

             }
    
        }else{
            throw deps.exceptionHandling.throwError("User not found", 404);
        }
    
    
    }catch(error){
        console.log(error);
        if(error.statusCode){
            throw deps.exceptionHandling.throwError(error.message, error.statusCode);
        }else{
            throw deps.exceptionHandling.throwError("Internal Server Error", 500);
        }
    }
 }
