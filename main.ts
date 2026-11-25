#!/usr/bin/env node
// Shipping — prints this entry's roast line, optionally shouted.

const LINE = 'My agent spent forty minutes explaining why my code was wrong, then shipped the same bug with better variable names.';

const FLAGS = ['--shout', '--help'] as const;

function renderLine(shout: boolean): string {
  return shout ? LINE.toUpperCase() : LINE;
}

function hasFlag(flag: string): boolean {
  return process.argv.includes(flag);
}

function main(): void {
  if (hasFlag('--help')) {
    process.stderr.write('Usage: node main.ts [--shout] [--help]\n');
    process.exit(0);
  }

  const unknown = process.argv.slice(2).filter((arg) => !FLAGS.includes(arg as (typeof FLAGS)[number]));
  if (unknown.length > 0) {
    process.stderr.write(`Unknown argument: ${unknown[0]}\n`);
    process.exit(1);
  }

  console.log(renderLine(hasFlag('--shout')));
}

main();
