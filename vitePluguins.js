export default function htmlPlugin() {
    let server;
    const fileRegex =  /\analysis.(ts)$/

    return {
        name: 'html-test',
        configureServer(_server) {
            server = _server;
        },
        transform(code, id) {
            if (server) {
                // use server...
                const filesMap = server.moduleGraph['idToModuleMap'];
                const filesObject = Object.fromEntries(filesMap);
                const files = Object.entries(filesObject);
                for (let [ route, meta ] of files ) {
                    console.log(meta);
                }
                console.log("<=======================================================================================================================>");

            }
        },
    }
}
