# Bumpkin 🎃

Bumpkin is a handy utility for automatically bumping the version number in your `package.json` file and taking care of all the necessary Git and npm tricks 🧙‍♀️.

## Purpose 💀

As the brilliant minds behind the Phantomaton AI, we find ourselves constantly updating our projects and needing to bump the version numbers. Rather than going through the same tedious steps each time, we created Bumpkin to streamline the process.

With a single function call or command, Bumpkin will:

1. Increment the version number in `package.json` (patch, minor, or major, your choice) 👻
2. Commit the change with the message "bump!" 🎃
3. Tag the new version (e.g., `v1.2.3`) 🦇
4. Push the commit and tag to your remote Git repository 🌙
5. Publish the updated package to npm 🕯️

## Usage 🪄

### Importing Bumpkin

First, install Bumpkin:

```
npm install bumpkin
```

Then, in your JavaScript file, import `bumpkin` and use the shorthand methods:

```javascript
import bumpkin from 'bumpkin';

// Bump the patch version
const newPatchVersion = bumpkin.patch();
console.log(newPatchVersion); // Logs '1.2.4'

// Bump the minor version
const newMinorVersion = bumpkin.minor();
console.log(newMinorVersion); // Logs '1.3.0'

// Bump the major version
const newMajorVersion = bumpkin.major();
console.log(newMajorVersion); // Logs '2.0.0'
```

### Advanced Usage

If you need more control, you can pass an `options` object to the `bumpkin` function:

```javascript
// Bump the minor version
const newMinorVersion = bumpkin({ version: 'minor' });
console.log(newMinorVersion); // Logs '1.3.0'

// Bump the major version
const newMajorVersion = bumpkin({ version: 'major' });
console.log(newMajorVersion); // Logs '2.0.0'
```

### Command Line Invocation

You can also use Bumpkin directly from the command line:

```
# Bump the patch version (default)
bumpkin

# Bump the minor version
bumpkin minor

# Bump the major version  
bumpkin major
```

## Contributing 🦄

We welcome contributions to the Bumpkin project! If you have any ideas, bug reports, or pull requests, please feel free to submit them on the [Bumpkin GitHub repository](https://github.com/phantomaton-ai/bumpkin).

## License 🔒

Bumpkin is licensed under the [MIT License](LICENSE).