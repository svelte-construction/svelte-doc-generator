import * as fs from 'fs-extra';
import * as path from 'path';
import colors from 'colors';
import resolveDocumentationComponentPath from '../helpers/resolveDocumentationComponentPath';
import resolveDocumentationDirectoryPath from '../helpers/resolveDocumentationDirectoryPath';
import resolveDocumentationDirectoryComponentPath from '../helpers/resolveDocumentationDirectoryComponentPath';
import Package from '../models/Package';
import Component from '../models/Component';
import Documentation from '../models/Documentation';
import Generator from '../models/Generator';
import Dictionary from '../models/Dictionary';
import resolveIndexFromGenerators from '../helpers/resolveMenuFromGenerators';
import { PATH_ROOT } from '../constants';
import { Command } from 'commander';
import displayCommandGreetings from '../helpers/displayCommandGreetings';
import requiredCommandOption from '../helpers/requiredCommandOption';
import displayCommandStep from '../helpers/displayCommandStep';
import displayCommandDone from '../helpers/displayCommandDone';
import createEmptyDirectory from '../helpers/createEmptyDirectory';

export default function generate(program: Command) {
  program
    .command('generate')
    .description('Generate documentation library from components')
    .option('--library <path>', 'Path to the source library (where you store your components)')
    .option('--target <path>', 'Path to the target library (where to store generated library documentations)')
    .action((cmd) => {
      displayCommandGreetings(cmd);
      requiredCommandOption(cmd, 'library');
      requiredCommandOption(cmd, 'target');

      const packagePath = path.resolve(PATH_ROOT, 'package.json');
      const libraryPath = path.resolve(cmd.library);
      const targetLibraryPath = path.resolve(cmd.target);


      displayCommandStep(cmd, colors.blue.bold('Generate documentation for whole library'));
      displayCommandStep(cmd, `${colors.bold('Path to the library')}: ${colors.italic(libraryPath)}`);
      displayCommandStep(cmd, `${colors.bold('Path to the target library documentation')}: ${colors.italic(targetLibraryPath)}`);


      // create package instance
      const that = new Package({ path: packagePath });

      // create empty directory for the library
      createEmptyDirectory(targetLibraryPath);

      // loop for the whole directory
      const directory = fs.readdirSync(libraryPath);
      const generated = [];
      for (const name of directory) {
        const componentPath = path.resolve(libraryPath, name, `${name}.svelte`);
        const documentationTargetPath = path.resolve(targetLibraryPath, name);
        displayCommandStep(cmd, colors.blue(` Generate documentation for ${colors.bold(name)}...`));

        // check if component exists
        if (!fs.existsSync(componentPath)) {
          displayCommandStep(cmd, colors.yellow(`  Unable to find component file: expected '${colors.italic(componentPath)}'; skipped`));
          continue;
        }

        // check if documentation component exists
        let documentationPath: string;
        const documentationComponentPath = resolveDocumentationComponentPath(componentPath);
        const documentationDirectoryPath = resolveDocumentationDirectoryPath(componentPath);
        const documentationDirectoryComponentPath = resolveDocumentationDirectoryComponentPath(componentPath);
        if (fs.existsSync(documentationComponentPath)) { // if documentation component exists
          createEmptyDirectory(documentationTargetPath);
          documentationPath = documentationComponentPath;
        } else if (fs.existsSync(documentationDirectoryPath)) { // if documentation directory exists
          if (fs.existsSync(documentationDirectoryComponentPath)) { // if documentation component exists inside directory
            createEmptyDirectory(documentationTargetPath);

            // copy all content from the documentation path to the target path
            fs.copySync(documentationDirectoryPath, documentationTargetPath, {
              overwrite: true,
              recursive: true,
              filter: (src: string, dest: string): boolean => src !== documentationDirectoryComponentPath
            });

            documentationPath = documentationDirectoryComponentPath;
          } else {
            displayCommandStep(cmd, colors.yellow(`  Unable to find component documentation file: expected ${colors.italic(documentationDirectoryComponentPath)}: skipped`));
            continue;
          }
        } else {
          displayCommandStep(cmd, colors.yellow(`  Unable to find component documentation file: expected ${colors.italic(documentationComponentPath)}: skipped`));
          continue;
        }

        // generate component documentation
        const component = new Component({ path: componentPath });
        const documentation = new Documentation({ path: documentationPath, package: that, component });
        const generator = new Generator({ name, directory: documentationTargetPath, package: that, documentation });
        generator.generate();
        generated.push(generator);

        displayCommandStep(cmd, colors.green('  Successfully generated'));
      }

      // generate library index
      const targetLibraryIndexPath = path.resolve(targetLibraryPath, 'index.js');
      displayCommandStep(cmd, `Generate index inside ${colors.italic(targetLibraryIndexPath)}...`);
      const items = resolveIndexFromGenerators(generated);
      const dictionary = new Dictionary({ path: targetLibraryIndexPath, items });
      dictionary.generate();

      displayCommandStep(cmd, colors.green(`Successfully generated for ${generated.length} components inside ${colors.italic(targetLibraryPath)}`));
      displayCommandDone(cmd);
    });
};
