class MLModel {

}

class DecisionTreeModel extends MLModel {

}

class MLAlgorithm {
    constructor(public name: string, public type: string, public model: MLModel) {
        this.name = name;
        this.type = type;
        this.model = model;
    }
}

class MachineLearningEnginePrototype {

    private readonly algorithmName: string;
    private readonly algorithmType: string;
    private readonly algorithmModel: MLModel;

    constructor(prototype: MLAlgorithm) {
        this.algorithmName = prototype.name;
        this.algorithmType = prototype.type;
        this.algorithmModel = prototype.model || this.generateMLModel();
    }

    clone() {
        // NOTE: if any of these properties are not a primitive type you need to create a shallow or deep copy.
        // For example if `this.brains` would be an object all AI objects that are generated
        // from this `clone` function would use brain.
        // Though that may be good as they would think as one.
        return new MLAlgorithm(this.algorithmName, this.algorithmType, this.algorithmModel);
    }

    generateMLModel(): MLModel {
        // super expensive operation
        return new MLModel();
    }
}

// How to use?
export class PrototypeTest {
    static test() {
        const algorithm: MLAlgorithm = new MLAlgorithm('Decision tree', 'Decision_Tree', new DecisionTreeModel());
        const rampantAIPrototype: MachineLearningEnginePrototype = new MachineLearningEnginePrototype(algorithm);

        const algorithm2 = rampantAIPrototype.clone();
    }
}
