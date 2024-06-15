

const UserEntity = require("../../application/entities/user");


module.exports = class UserController {

    dependencies;

    constructor(deps) {
        this.dependencies = deps;
    }


    async getUser(id) {
        try {

            const user = await this.dependencies.databasePrisma.user.findUnique({
                where: {
                    id:  Number(id)
                }
            })

            if (!user) {
                throw new this.dependencies.exceptionHandling.throwError("No user exist with the given id", 404);
            }
            return user;
        }
        catch (error) {
            console.log(error);
            if(error.statusCode){
                throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
            }else{
                throw this.dependencies.exceptionHandling.throwError("Internal Server Error", 500);
            }  }
    }

    async create(reqUser, data) {
        try {

            let validated = await this.dependencies.routingValidator.validateRecord("user", data);
            if (validated) {
    
                
                // const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
                // const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                // const numberChars = '0123456789';
                // const specialChars = '!@#$%^&*()-_=+[{]}|;:,<.>/?';
            
                // const allChars = lowercaseChars + uppercaseChars + numberChars + specialChars;
            
                let password = 'password';
                // password += lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length));
                // password += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
                // password += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
                // password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));

                // for (let i = 4; i < 12; i++) {
                //     password += allChars.charAt(Math.floor(Math.random() * allChars.length));
                // }
            

                // password = password.split('').sort(() => Math.random() - 0.5).join('');
                data.Password = await this.dependencies.encryption.hash(password);
                
                const userData = new UserEntity(data);
                
                let user = await this.dependencies.databasePrisma.user.create({
                    data: userData
                })
                
                user.Password = password;
                return user;
            }

        }
        catch (error) {
            console.log(error);

            if(error.statusCode){
                throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
            }else{
                throw this.dependencies.exceptionHandling.throwError("Internal Server Error", 500);
            }
        }
    }

    async update(reqUser, input) {

        try {

            console.log({reqUser});

            let validated = await this.dependencies.routingValidator.validatOnUpdateRecord("user", input);

            if (validated) {
                
                const foundUser = await this.dependencies.databasePrisma.user.findFirst({
                    where: {
                        id: input.id
                    }
                });

                if(foundUser){
                    if (reqUser.Roles.includes("admin") || foundUser.id == reqUser.id) {
                        if (input.password) {
                            
                            input.password = await this.dependencies.encryption.hash(input.password);
                        }

                        const userData = new UserEntity(input);
                       
                        return await this.dependencies.databasePrisma.user.update({
                            where: {
                                id: input.id
                            },
                            data: userData,
                        });
    
                    } else {
                        throw this.dependencies.exceptionHandling.throwError("Unauthorized access! Only the admin and the user owning the record can update it.", 401);
                    }
                }else{
                    throw this.dependencies.exceptionHandling.throwError("record not found.", 404);
                }

               
            }


        } catch (error) {
            console.log(error);
            if(error.statusCode){
                throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
            }else{
                throw this.dependencies.exceptionHandling.throwError("Internal Server Error", 500);
            } }
    }



    async changePassword(reqUser, id, oldPassword, newPassword) {
        try {
            
            let user = await this.getUser(id);
            if (!user) {
                throw this.dependencies.exceptionHandling.throwError("User Not Found", 404);
            }  
            if(reqUser.Roles.includes("admin") || user.id == reqUser.Id){
               
                if (!await this.dependencies.encryption.compare(oldPassword, user.Password)) {
                    throw this.dependencies.exceptionHandling.throwError("Incorrect old password", 401);    
                }else{

                    user.Password = await this.dependencies.encryption.hash(newPassword)
        
                    return await this.dependencies.databasePrisma.user.update({
                        where: {
                            id: id
                        },
                        data: {
                            Password: user.Password
                        },
                    });

                }
    

            }else{
                throw this.dependencies.exceptionHandling.throwError("Unauthorized Access! Only the admin and the user owning the record can change a password.", 401);    
            }

        }
        catch (error) {
            console.log(error);

            if(error.statusCode){
                throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
            }else{
                throw this.dependencies.exceptionHandling.throwError('Internal Server Error', 500);
            } }

    }
    

    async delete(id) {

        try {

            const userFound = await this.dependencies.databasePrisma.user.findFirst({
                where: { id: id }
            });
            if (!userFound) {
                throw this.dependencies.exceptionHandling.throwError("user with " + id + " id does not exist", 404);
            }
            const user = await this.dependencies.databasePrisma.user.delete({
                where: { id: id }
            });

            return user;
        }
        catch (error) {
            console.log(error);

            if(error.statusCode){
                throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
            }else{
                throw this.dependencies.exceptionHandling.throwError("Internal Server Error", 500);
            }  }

    }


}