"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const colors_1 = __importDefault(require("colors"));
const resolveDocumentationComponentPath_1 = __importDefault(require("../helpers/resolveDocumentationComponentPath"));
const resolveDocumentationDirectoryPath_1 = __importDefault(require("../helpers/resolveDocumentationDirectoryPath"));
const resolveDocumentationDirectoryComponentPath_1 = __importDefault(require("../helpers/resolveDocumentationDirectoryComponentPath"));
const Package_1 = __importDefault(require("../models/Package"));
const Component_1 = __importDefault(require("../models/Component"));
const Documentation_1 = __importDefault(require("../models/Documentation"));
const Generator_1 = __importDefault(require("../models/Generator"));
const Dictionary_1 = __importDefault(require("../models/Dictionary"));
const resolveMenuFromGenerators_1 = __importDefault(require("../helpers/resolveMenuFromGenerators"));
const constants_1 = require("../constants");
const displayCommandGreetings_1 = __importDefault(require("../helpers/displayCommandGreetings"));
const requiredCommandOption_1 = __importDefault(require("../helpers/requiredCommandOption"));
const displayCommandStep_1 = __importDefault(require("../helpers/displayCommandStep"));
const displayCommandDone_1 = __importDefault(require("../helpers/displayCommandDone"));
const createEmptyDirectory_1 = __importDefault(require("../helpers/createEmptyDirectory"));
function generate(program) {
    program
        .command('generate')
        .description('Generate documentation library from components')
        .option('--library <path>', 'Path to the source library (where you store your components)')
        .option('--target <path>', 'Path to the target library (where to store generated library documentations)')
        .action((cmd) => {
        displayCommandGreetings_1.default(cmd);
        requiredCommandOption_1.default(cmd, 'library');
        requiredCommandOption_1.default(cmd, 'target');
        const packagePath = path.resolve(constants_1.PATH_ROOT, 'package.json');
        const libraryPath = path.resolve(cmd.library);
        const targetLibraryPath = path.resolve(cmd.target);
        displayCommandStep_1.default(cmd, colors_1.default.blue.bold('Generate documentation for whole library'));
        displayCommandStep_1.default(cmd, `${colors_1.default.bold('Path to the library')}: ${colors_1.default.italic(libraryPath)}`);
        displayCommandStep_1.default(cmd, `${colors_1.default.bold('Path to the target library documentation')}: ${colors_1.default.italic(targetLibraryPath)}`);
        // create package instance
        const that = new Package_1.default({ path: packagePath });
        // create empty directory for the library
        createEmptyDirectory_1.default(targetLibraryPath);
        // loop for the whole directory
        const directory = fs.readdirSync(libraryPath);
        const generated = [];
        for (const name of directory) {
            const componentPath = path.resolve(libraryPath, name, `${name}.svelte`);
            const documentationTargetPath = path.resolve(targetLibraryPath, name);
            displayCommandStep_1.default(cmd, colors_1.default.blue(` Generate documentation for ${colors_1.default.bold(name)}...`));
            // check if component exists
            if (!fs.existsSync(componentPath)) {
                displayCommandStep_1.default(cmd, colors_1.default.yellow(`  Unable to find component file: expected '${colors_1.default.italic(componentPath)}'; skipped`));
                continue;
            }
            // check if documentation component exists
            let documentationPath;
            const documentationComponentPath = resolveDocumentationComponentPath_1.default(componentPath);
            const documentationDirectoryPath = resolveDocumentationDirectoryPath_1.default(componentPath);
            const documentationDirectoryComponentPath = resolveDocumentationDirectoryComponentPath_1.default(componentPath);
            if (fs.existsSync(documentationComponentPath)) { // if documentation component exists
                createEmptyDirectory_1.default(documentationTargetPath);
                documentationPath = documentationComponentPath;
            }
            else if (fs.existsSync(documentationDirectoryPath)) { // if documentation directory exists
                if (fs.existsSync(documentationDirectoryComponentPath)) { // if documentation component exists inside directory
                    createEmptyDirectory_1.default(documentationTargetPath);
                    // copy all content from the documentation path to the target path
                    fs.copySync(documentationDirectoryPath, documentationTargetPath, {
                        overwrite: true,
                        recursive: true,
                        filter: (src, dest) => src !== documentationDirectoryComponentPath
                    });
                    documentationPath = documentationDirectoryComponentPath;
                }
                else {
                    displayCommandStep_1.default(cmd, colors_1.default.yellow(`  Unable to find component documentation file: expected ${colors_1.default.italic(documentationDirectoryComponentPath)}: skipped`));
                    continue;
                }
            }
            else {
                displayCommandStep_1.default(cmd, colors_1.default.yellow(`  Unable to find component documentation file: expected ${colors_1.default.italic(documentationComponentPath)}: skipped`));
                continue;
            }
            // generate component documentation
            const component = new Component_1.default({ path: componentPath });
            const documentation = new Documentation_1.default({ path: documentationPath, package: that, component });
            const generator = new Generator_1.default({ name, directory: documentationTargetPath, package: that, documentation });
            generator.generate();
            generated.push(generator);
            displayCommandStep_1.default(cmd, colors_1.default.green('  Successfully generated'));
        }
        // generate library index
        const targetLibraryIndexPath = path.resolve(targetLibraryPath, 'index.js');
        displayCommandStep_1.default(cmd, `Generate index inside ${colors_1.default.italic(targetLibraryIndexPath)}...`);
        const items = resolveMenuFromGenerators_1.default(generated);
        const dictionary = new Dictionary_1.default({ path: targetLibraryIndexPath, items });
        dictionary.generate();
        displayCommandStep_1.default(cmd, colors_1.default.green(`Successfully generated for ${generated.length} components inside ${colors_1.default.italic(targetLibraryPath)}`));
        displayCommandDone_1.default(cmd);
    });
}
exports.default = generate;
;
