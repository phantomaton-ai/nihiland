const all = ['-a', '--all'];
const flags = {
  test: ['-t', '--test', ...all],
  lint: ['-l', '--lint', ...all],
  coverage: ['-c', '--coverage', ...all],
  publish: ['-p', '--publish'],
};

const value = (flag, next) =>
  (!next || next.startsWith('-')) ? true : next;
const pair = (flag, args, arg) =>
  arg ? { [flag]: value(flag, args[args.indexOf(arg) + 1]) } : {};
const option = (flag, args) =>
  pair(flag, args, flags[flag].find(arg => args.includes(arg)));

export default (args = []) =>
  args.length === 0 ? { test: true } : Object.keys(flags).reduce(
    (options, flag) => ({
      ...options,
      ...option(flag, args)
    }),
    {}
  );

