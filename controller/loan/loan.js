

const LoanEntity = require("../../application/entities/loan");
const calculatorLoan = require("../../application/scoring methods/loan");
const calculatorCompanyEconomic = require("../../application/scoring methods/BUS - companyeconomic");
const calculatorEconomic = require("../../application/scoring methods/IND - economic");



module.exports = class loanController {

    dependencies;

    constructor(deps){
        this.dependencies = deps;
    }


    async getloan(requestUser, id) {
        try {
            const loan = await this.dependencies.databasePrisma.loan.findMany({
                where: {
                    id: Number(id)
                }
            })

            if(!loan.length){
                throw this.dependencies.exceptionHandling.throwErrorr("no loan available with the id " + id, 404);
            }
            
            if(requestUser.role == "admin" || requestUser.id == loan.userId){
                return loan;
            }else{
                throw this.dependencies.exceptionHandling.throwError("unAuthorized access", 401)
            }
            
        }
        catch (error) {
            console.log(error);
            if(error.statusCode){
                throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
            }else{
                throw this.dependencies.exceptionHandling.throwError("Internal Server Error", 500);
            }  }
    }

    async getloans(requestUser) {
        try {
            const loans = await this.dependencies.database.loan.findMany();
           
            if(requestUser.role == "admin"){
                return loans;
            }else{
                throw this.dependencies.exceptionHandling.throwError("unAuthorized access", 401)
            }

        }
        catch (error) {
            console.log(error);
            if(error.statusCode){
                throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
            }else{
                throw this.dependencies.exceptionHandling.throwError("Internal Server Error", 500);
            }  }
    }

    async create(requestUser, data) {
        try {
            
            console.log({requestUser});
            
            if(requestUser){
                let validated = await this.dependencies.routingValidator.validateRecord("loan", data);
                if(validated){


                    const loanData = new LoanEntity(data);

                    const loan = await this.dependencies.databasePrisma.loan.create({
                        data: loanData
                    })
                    return loan;
                }
            }else{
                throw this.dependencies.exceptionHandling.throwError("unAuthorized User! only an admin and a user who loan it are allowed", 401)
            }
        }
        catch (error) {
            console.log(error);
            if(error.statusCode){
                throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
            }else{
                throw this.dependencies.exceptionHandling.throwError("Internal Server Error", 500);
            }  }

    }

    async update(requestUser, new_loan) {

        try {

            // if (requestUser) {
            //     console.log({ requestUser });
            // }

            let validated = await this.dependencies.routingValidator.validatOnUpdateRecord("loan", new_loan);
            
            if (validated) {
                
                
                let input = await calculatorLoan(new_loan);
                
                console.log("calc input ", input);

                const foundloan = await this.dependencies.databasePrisma.loan.findFirst({
                    where: {
                        id: input.id
                    }
                });

                if(!foundloan){
                    throw this.dependencies.exceptionHandling.throwError("loan with the Id "+ input.id + " not found", 404) ;
                }

                let foundBank = null;

                if(requestUser.Roles.includes("bank")) {
                    foundBank = await this.dependencies.databasePrisma.bank.findFirst({
                        where: {
                            user_id: requestUser.Id
                        }
                    });

                    if(!foundBank){
                        throw new Error("bank associated with this account not found");
                    }
                }


                // if ((requestUser.Role.includes("personal") || requestUser.Role.includes("company")) && foundloan.user_id != requestUser.Id) {
                //     throw this.dependencies.exceptionHandling.throwError("unAuthorized User! only an admin and a user who loan it are allowed", 401);
                // }

                if(foundloan.status != input.status) {

                    console.log("status changed");

                    if(input.status == "approved" || input.status == "rejected" || input.status == "repaid") {
                        if((!requestUser.Roles.includes("bank") && !requestUser.Roles.includes("admin")) || (requestUser.Roles.includes("bank") && foundloan.bank != foundBank.id)) {
                            throw new Error("Unauthorized access!");
                        }
                    } else if(input.status == "received") {
                        if(!requestUser.Roles.includes("personal") && !requestUser.Roles.includes("company")) {
                            throw new Error("Unauthorized access!");
                        }
                    }

                }

                let cleanData = new LoanEntity(input)

                let loan_result = await this.dependencies.databasePrisma.loan.update({
                    where: {
                        id: input.id
                    },
                    data: cleanData,
                });

                if(foundloan.status != input.status) {

                    let foundUser = await this.dependencies.databasePrisma.user.findFirst({
                        where: {
                            id: input.user_id
                        }
                    });

                    if(foundUser.Role == "personal") {
                        
                        let economic_data = await this.dependencies.databasePrisma.economic.findFirst({
                            where: {
                                user_id: input.user_id
                            }
                        });

                        if(input.status == "received"){
                            economic_data.current_loans += 1;
                        } else if(input.status == "repaid"){
                            if(economic_data.current_loans > 0){
                                economic_data.current_loans -= 1;
                            }
                            economic_data.repaid_loans += 1;
                        }

                        economic_data.score = calculatorEconomic(economic_data);

                        await this.dependencies.databasePrisma.economic.update({
                            where: {
                                id: input.id
                            },
                            data: economic_data,
                        });

                    } else if(foundUser.Role == "company") {

                        let economic_data = await this.dependencies.databasePrisma.companyeconomic.findFirst({
                            where: {
                                user_id: input.company_id
                            }
                        });

                        if(input.status == "received"){
                            economic_data.current_loans += 1;
                        } else if(input.status == "repaid"){
                            if(economic_data.current_loans > 0){
                                economic_data.current_loans -= 1;
                            }
                            economic_data.repaid_loans += 1;
                        }

                        economic_data.score = calculatorCompanyEconomic(economic_data);
                        await this.dependencies.databasePrisma.companyeconomic.update({
                            where: {
                                user_id: input.company_id
                            },
                            data: economic_data,
                        });

                    }
                }

                return loan_result;
            }


        } catch (error) {
            console.log(error);
            if(error.statusCode){
                throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
            }else{
                throw this.dependencies.exceptionHandling.throwError("Internal Server Error", 500);
            } }
    }


    

    async delete(id) {

        try {

            const loanFound = await this.dependencies.databasePrisma.loan.findFirst({
                where: { id: id }
            });
            if (!loanFound) {
                throw this.dependencies.exceptionHandling.throwError("loan with " + id + " id does not exist", 404);
            }
            const loan = await this.dependencies.databasePrisma.loan.delete({
                where: { id: id }
            });

            return loan;
        }
        catch (error) {
            console.log(error);

            if(error.statusCode){
                throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
            }else{
                throw this.dependencies.exceptionHandling.throwError("Internal Server Error", 500);
            }    }


    }



}