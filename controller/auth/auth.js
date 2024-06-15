



module.exports = class AuthController {

    dependencies;

    constructor(deps){
        this.dependencies = deps;
    }


    async login({ phone, password }) {
        try {
             
            let user = await this.dependencies.databasePrisma.user.findFirst({
                where: {
                    Phone: phone
                }
            })

            if (!user) {
                throw this.dependencies.exceptionHandling.throwError("User not found", 404);
            }
            
            const verifyPassword = await this.dependencies.encryption.compare(password, user.Password);

            if (!verifyPassword) {
                throw this.dependencies.exceptionHandling.throwError("Incorrect password", 401);
            } else {

                let role = [user.Role]
                const payload = { FullName: user.FullName, Email: user.Email, Id: user.id, Roles: role, Phone: user.Phone };

                if(user.Role == "company") {

                    let user_company = await this.dependencies.databasePrisma.company.findFirst({
                        where: {
                            user_id: user.id
                        }
                    });

                    if(!user_company) {
                        throw new Error("No Company associated with this account!");
                    }

                    payload.companyId = user_company.id;

                } else if(user.Role == "bank") {

                    let user_bank = await this.dependencies.databasePrisma.bank.findFirst({
                        where: {
                            user_id: user.id
                        }
                    });

                    if(!user_bank){
                        throw new Error("No bank associated with this account!");
                    }

                    payload.bankId = user_bank.id;

                }
    
                const token = this.dependencies.tokenGenerator.generate(payload, this.dependencies.appSecretKey);
                return {
                    Token: token,
                    ...payload
                }

            }

        }
        catch (error) {
            console.log(error);
            if(error.statusCode){
                throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
            }else{
                throw this.dependencies.exceptionHandling.throwError(error.message, 500);
            }  }

    }

    async logOut() {

    }
    
   
    async authenticate(req, res, next){
             try {

                const token = req.headers.authorization.split(" ")[1];
                const user = await getDep().tokenGenerator.verify(token, this.dependencies.appSecretKey);/* as JwtPayload*/;
                req.user = user;
            }
            catch (error) {  
                console.log(error);
                if(error.statusCode){
                    throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
                }else{
                    throw this.dependencies.exceptionHandling.throwError(error.message, 500);
                }   }
    
            next();
    }




}
