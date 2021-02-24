enum Role {
    Admin,
    Patient,
    Doctor
}

interface User {
    name: string;
    email: string;
    role: Role;
}

class Admin implements User {
    public name: string;
    public email: string;
    public role: Role = Role.Admin;
}

class Patient implements User {
    public name: string;
    public email: string;
    public role: Role = Role.Patient;

}

class Doctor implements User {
    public name: string;
    public email: string;
    public role: Role = Role.Doctor;
}

class UserFactory {
    static createUser(role: Role): User {
        switch (role) {
            case Role.Admin:
                return new Admin();
            case Role.Doctor:
                return new Doctor();
            case Role.Patient:
                return new Patient();
        }
    }
}

// How to use?
export class FactoryMethodTest {
    static test() {
        const patient: Patient = UserFactory.createUser(Role.Patient);
    }
}
