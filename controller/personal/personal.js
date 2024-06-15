

const PersonalEntity = require("../../application/entities/personal");


module.exports = class PersonalController {

    dependencies;

    constructor(deps) {
        this.dependencies = deps;
    }


    async getPersonal(id) {
        try {

            const personal = await this.dependencies.databasePrisma.personal.findFirst({
                where: {
                    id: Number(id)
                }
            })

            if (!personal) {
                throw new this.dependencies.exceptionHandling.throwError("No personal exist with the given id", 404);
            }
            return personal;
        }
        catch (error) {
            console.log(error);
            if(error.statusCode){
                throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
            }else{
                throw this.dependencies.exceptionHandling.throwError("Internal Server Error", 500);
            }  }
    }

    

    async create(req, data) {
        try {

            let validated = await this.dependencies.routingValidator.validateRecord("personal", data);
            if (validated) {
    
                
               const personalData = new PersonalEntity(data);
                
                let personal = await this.dependencies.databasePrisma.personal.create({
                    data: personalData
                })
                
                return personal;
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

    async update(req, input) {

        try {

            let validated = await this.dependencies.routingValidator.validatOnUpdateRecord("personal", input);

            if (validated) {
                
                const found = await this.dependencies.databasePrisma.personal.findFirst({
                    where: {
                        id: input.id
                    }
                });

                if(found){
                    if (req.Roles.includes("admin") || found.id == req.id) {
                      

                        const Data = new PersonalEntity(input);
                       
                        return await this.dependencies.databasePrisma.personal.update({
                            where: {
                                id: input.id
                            },
                            data: Data,
                        });
    
                    } else {
                        throw this.dependencies.exceptionHandling.throwError("Unauthorized access! Only the admin and the personal owning the record can update it.", 401);
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


    async delete(id) {

        try {

            const Found = await this.dependencies.databasePrisma.personal.findFirst({
                where: { id: id }
            });
            if (!Found) {
                throw this.dependencies.exceptionHandling.throwError("personal with " + id + " id does not exist", 404);
            }
            const personal= await this.dependencies.databasePrisma.personal.delete({
                where: { id: id }
            });

            return personal;
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