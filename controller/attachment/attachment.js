



module.exports = class attachmentController {

    dependencies;

    constructor(deps) {
        this.dependencies = deps;
    }


    async get(id) {

        //id 
        //stream of the attachment
        try {
            const attachment = await this.dependencies.databasePrisma.attachment.findFirst({
                where: {
                    id: Number(id)
                }
            })

            if (!attachment) {
                throw new this.dependencies.exceptionHandling.throwError("No attachment exist with the given id", 404);
            }
            return attachment;
        }
        catch (error) {
            throw new this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
        }
    }


    async create(reqUser, data) {
        try {

            let validated = await this.dependencies.routingValidator.validateRecord("attachment", data);
            if (validated) {
            
                const attachment = await this.dependencies.databasePrisma.attachment.create({
                    data: data
                })
          
                return attachment;
            }

        }
        catch (error) {
           throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
        }
    }

    async update(reqUser, input) {

        try {

            let validated = await this.dependencies.routingValidator.validatOnUpdateRecord("attachment", attachment);

            if (validated) {
                
                const foundAttachment = await this.dependencies.databasePrisma.attachment.findFirst({
                    where: {
                        id: input.id
                    }
                });

                if(!input.id){
                    throw this.dependencies.exceptionHandling.throwError("request body must atleast have an Id", 400);
                }
                if(foundAttachment){
                    if (reqUser.Roles.includes("admin") || foundAttachment.id == reqUser.id) {
         
                        return await this.dependencies.databasePrisma.foundAttachment.update({
                            where: {
                                id: input.id
                            },
                            data: input,
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
            throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
        }
    }
    

    async delete(id) {

        try {

            const userAttachment = await this.dependencies.databasePrisma.attachment.findFirst({
                where: { id: id }
            });
            if (!userAttachment) {
                throw this.dependencies.exceptionHandling.throwError("attachment with " + id + " id does not exist", 404);
            }
            const attachment = await this.dependencies.databasePrisma.attachment.delete({
                where: { id: id }
            });

            return attachment;
        }
        catch (error) {
            throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
        }

    }


}