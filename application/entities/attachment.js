

module.exports = class Attachment {

    name;
    table;
    record;
    extension;

    constructor({ name,
        table,
        record,
        extension
    }) {

        this.name = name;
        this.table = table;
        this.record = record;
        this.extension = extension;
    }


}