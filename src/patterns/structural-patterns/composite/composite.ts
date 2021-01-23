export interface Instruction {
    name: string;

    execute(): boolean;
}

export abstract class SingleInstruction implements Instruction {
    name: string;

    protected constructor(name: string) {
        this.name = name;
    }

    abstract execute(): boolean;
}

export class CompositeInstructionSet implements Instruction {
    // Our composite instruction should have children
    // that can be any implementation of Instruction
    private children: Instruction[] = [];

    name: string;

    constructor(name: string) {
        this.name = name;
    }

    execute() {
        let successful = false;

        // We'll iterate through our children calling their execute method
        // We don't need to know if our child is a Composite Instruction Set
        // or just a SingleInstruction
        for (const child of this.children) {
            successful = child.execute();

            // If any of the child tasks fail, lets fail this one
            if (!successful) {
                return false;
            }
        }
    }

    // Our CompositeInstructionSet needs a public API to manage it's children
    addChild(child: Instruction) {
        this.children.push(child);
    }

    removeChild(child: Instruction) {
        this.children = this.children.filter(c => c.name !== child.name);
    }
}

export class LogInstructon extends SingleInstruction {
    log: string;

    constructor(name: string, log: string) {
        super(name);

        this.log = log;
    }

    execute() {
        console.log(`${ this.name }: ${ this.log }`);
        return true;
    }
}

export class TaskRunner {
    tasks: Instruction[];

    constructor(tasks: Instruction[]) {
        this.tasks = tasks;
    }

    runTasks() {
        for (const task of this.tasks) {
            task.execute();
        }
    }
}

// How to use?
export class CompositeTest {
    static test() {
        const startUpLogInstruction = new LogInstructon('Starting', 'Task runner booting up...');
        const compositeInstruction = new CompositeInstructionSet('Composite');

        // Now let's define some sub tasks for the CompositeInstructionSet
        const firstSubTask = new LogInstructon('Composite 1', 'The first sub task');
        const secondSubTask = new LogInstructon('Composite 2', 'The second sub task');

        // Let's add these sub tasks as children to the CompositeInstructionSet we created earlier
        compositeInstruction.addChild(firstSubTask);
        compositeInstruction.addChild(secondSubTask);

        // Now let's create our TaskRunner with our Tasks
        const taskRunner = new TaskRunner([startUpLogInstruction, compositeInstruction]);

        // Finally, we'll ask the TaskRunner to run the tasks
        taskRunner.runTasks();
    }
}
