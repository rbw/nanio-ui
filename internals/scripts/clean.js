const shell = require('shelljs');
const addCheckMark = require('./helpers/checkmark.js');

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

if (!shell.test('-e', 'internals/templates')) {
  shell.echo('The example is deleted already.');
  shell.exit(1);
}

process.stdout.write('Cleanup started...');

// Cleanup components/
shell.rm('-rf', 'app/components/*');

// Handle containers/
shell.rm('-rf', 'app/containers');

// Handle utils/
shell.rm('-rf', 'app/utils');

addCheckMark();

// Commit the changes
if (
  shell.exec('git add . --all && git commit -qm "Remove default example"')
    .code !== 0
) {
  shell.echo('\nError: Git commit failed');
  shell.exit(1);
}

shell.echo('\nCleanup done. Happy Coding!!!');
