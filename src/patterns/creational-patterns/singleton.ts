class DatabaseAccessSingleton {
    private static instance: DatabaseAccessSingleton;

    /**
     * The Singleton's constructor should always be private to prevent direct
     */
    private constructor() {
    }

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): DatabaseAccessSingleton {
        if (!DatabaseAccessSingleton.instance) {
            DatabaseAccessSingleton.instance = new DatabaseAccessSingleton();
        }

        return DatabaseAccessSingleton.instance;
    }

    /**
     * Finally, any singleton should define some business logic, which can be
     * executed on its instance.
     */
    public databaseConnection(connectionString: string) {
        // ...
    }

    public loadInMemory() {
        // ...
    }
}

// How to use?
export class SingletonTest {
    static test() {
        const singleton: DatabaseAccessSingleton = DatabaseAccessSingleton.getInstance();

        singleton.databaseConnection('mongodb://.....');
        singleton.loadInMemory();

        const singleton2: DatabaseAccessSingleton = DatabaseAccessSingleton.getInstance();

        console.log('same instance: ', singleton === singleton2);
    }
}
