interface ISocialMediaStrategy {
    connectTo(friendName: string);
}

class SocialMediaContext {
    smStrategy: ISocialMediaStrategy;

    setSocialMediaStrategy(smStrategy: ISocialMediaStrategy) {
        this.smStrategy = smStrategy;
    }

    connect(name: string) {
        this.smStrategy.connectTo(name);
    }
}

class FacebookStrategy implements ISocialMediaStrategy {

    connectTo(friendName: string) {
        console.log('Connecting with ' + friendName + ' through Facebook');
    }
}

class GooglePlusStrategy implements ISocialMediaStrategy {

    connectTo(friendName: string) {
        console.log('Connecting with ' + friendName + ' through GooglePlus');
    }
}

class TwitterStrategy implements ISocialMediaStrategy {

    connectTo(friendName: string) {
        console.log('Connecting with ' + friendName + ' through Twitter');
    }
}

class LinkedinStrategy implements ISocialMediaStrategy {

    connectTo(friendName: string) {
        console.log('Connecting with ' + friendName + ' through Linkedin');
    }
}

// How to use?
export class StrategyTest {
    static test() {
        const context: SocialMediaContext = new SocialMediaContext();

        // Setting Facebook strategy.
        context.setSocialMediaStrategy(new FacebookStrategy());
        context.connect('Sergi');

        // Setting Twitter strategy.
        context.setSocialMediaStrategy(new TwitterStrategy());
        context.connect('Sergi');

        // Setting GooglePlus strategy.
        context.setSocialMediaStrategy(new GooglePlusStrategy());
        context.connect('Sergi');

        // Setting Linkedin strategy.
        context.setSocialMediaStrategy(new LinkedinStrategy());
        context.connect('Sergi');
    }
}
