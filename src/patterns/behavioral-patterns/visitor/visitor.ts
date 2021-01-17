export interface Router // Visitable
{
    sendData(data: string);

    acceptData(data: string);

    accept(v: RouterVisitor);
}

export class DLinkRouter implements Router {

    sendData(data: string) {
        console.log(`DLinkRouter: sendData ${ data }`);
    }

    acceptData(data: string) {
        console.log(`DLinkRouter: acceptData ${ data }`);
    }

    accept(v: RouterVisitor) {
        v.visit(this);
    }
}

export class LinkSysRouter implements Router {

    sendData(data: string) {
        console.log(`LinkSysRouter: sendData ${ data }`);
    }

    acceptData(data: string) {
        console.log(`LinkSysRouter: acceptData ${ data }`);
    }

    accept(v: RouterVisitor) {
        v.visit(this);
    }
}

export class TPLinkRouter implements Router {
    sendData(data: string) {
        console.log(`TPLinkRouter: sendData ${ data }`);
    }

    acceptData(data: string) {
        console.log(`TPLinkRouter: acceptData ${ data }`);
    }

    accept(v: RouterVisitor) {
        v.visit(this);
    }
}

export interface RouterVisitor {
    visit(router: Router);
}

export class LinuxConfigurator implements RouterVisitor {

    visit(router: Router) {
        if (router instanceof TPLinkRouter) {
            this.visitTPLinkRouter(router);
        } else if (router instanceof DLinkRouter) {
            this.visitDLinkRouter(router);
        } else if (router instanceof LinkSysRouter) {
            this.visitLinkSysRouter(router);
        }
    }

    private visitDLinkRouter(router: DLinkRouter) {
        console.log('DLinkRouter Configuration for Linux complete !!');
    }

    private visitTPLinkRouter(router: TPLinkRouter) {
        console.log('TPLinkRouter Configuration for Linux complete !!');
    }

    private visitLinkSysRouter(router: LinkSysRouter) {
        console.log('LinkSysRouter Configuration for Linux complete !!');
    }
}

export class WindowsConfigurator implements RouterVisitor {
    visit(router: Router) {
        if (router instanceof TPLinkRouter) {
            this.visitTPLinkRouter(router);
        } else if (router instanceof DLinkRouter) {
            this.visitDLinkRouter(router);
        } else if (router instanceof LinkSysRouter) {
            this.visitLinkSysRouter(router);
        }
    }

    private visitDLinkRouter(router: DLinkRouter) {
        console.log('DLinkRouter Configuration for Windows complete !!');
    }

    private visitTPLinkRouter(router: TPLinkRouter) {
        console.log('TPLinkRouter Configuration for Windows complete !!');
    }

    private visitLinkSysRouter(router: LinkSysRouter) {
        console.log('LinkSysRouter Configuration for Windows complete !!');
    }
}

// How to use?
export class VisitorTest {
    static test() {
        let windowsConfigurator: WindowsConfigurator;
        let linuxConfigurator: LinuxConfigurator;
        let dlink: DLinkRouter;
        let tplink: TPLinkRouter;
        let linksys: LinkSysRouter;

        function setUp() {
            windowsConfigurator = new WindowsConfigurator();
            linuxConfigurator = new LinuxConfigurator();

            dlink = new DLinkRouter();
            tplink = new TPLinkRouter();
            linksys = new LinkSysRouter();
        }

        function testDlink() {
            dlink.accept(windowsConfigurator);
            dlink.accept(linuxConfigurator);
        }

        function testTPLink() {
            tplink.accept(windowsConfigurator);
            tplink.accept(linuxConfigurator);
        }

        function testLinkSys() {
            linksys.accept(windowsConfigurator);
            linksys.accept(linuxConfigurator);
        }

        setUp();

        testDlink();

        testLinkSys();

        testTPLink();
    }
}
