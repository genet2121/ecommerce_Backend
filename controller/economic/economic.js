
module.exports = class EconomicController {

    dependencies;

    constructor(deps){
        this.dependencies = deps;
    }


    async getEconomic(id) {
        try {
            const economic = await this.dependencies.databasePrisma.economic.findMany({
                where: {
                    id: Number(id)
                }
            })

            if(!economic.length){
                throw new this.dependencies.exceptionHandling("user0001");
            }  
             return economic;
        }
        catch (err) {
            if (err instanceof this.dependencies.exceptionHandling) {
                throw err;
            } else {
                throw new this.dependencies.exceptionHandling("db0001");
            }
      }
    }

    async getEconomics() {
        try {
            return await this.dependencies.database.economic.findMany();
        }
        catch (err) {
            throw new this.dependencies.exception("db0001");
        }
    }

    async create(data) {
        try {

            const economic = await this.dependencies.databasePrisma.economic.create({
                data: data
            })
            return economic;
        }
        catch (err) {
            console.log(err);
            if (err instanceof this.dependencies.exception) {
                throw err;
            } else {
                throw new this.dependencies.exception("db0001");
            }
        }

    }

    async update(id, input) {
        try {

            return await this.dependencies.databasePrisma.economic.update({
                where: {
                    id
                },
                data: input,
            });

        } catch (err) {
            throw this.dependencies.exception("db0001");
        }
    }

    
    async delete(id) {

        try {

        await this.dependencies.databasePrisma.economic.delete({
            where: { id: id }
        });

        }
        catch (err) {
                throw err
        }

    }


}