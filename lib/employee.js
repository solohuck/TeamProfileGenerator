
class employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.title = "employee";
    }

    getName() {
        return this.name;
    }

    getid() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return this.title;
    }
}

module.exports = employee; 