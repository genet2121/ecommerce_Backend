

module.exports = class User {

    FullName;
    Username;
    Phone;
    Email;
    Role;
    Status;
    Password;

    constructor({
        FullName,
        Username,
        Phone,
        Email,
        Role,
        Status,
        Password
    }) {

        this.FullName = FullName;
        this.Username = Username;
        this.Phone = Phone;
        this.Email = Email;
        this.Role = Role;
        this.Status = Status;
        this.Password = Password;
    }


}