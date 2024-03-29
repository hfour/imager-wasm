# imager-wasm

[![Build Status](https://travis-ci.org/hfour/imager-wasm.svg?branch=master)](https://travis-ci.org/hfour/imager-wasm)

This a simple package to compile selected functions from the [image-rs](https://github.com/image-rs/image)
rust package to wasm, and make them available to nodejs. It's configured to support at least GIF, PNG and JPEG (but this
may vary depending on our needs).

We don't wrap the whole of `image-rs` because the `.wasm` file will be too big, and then there's no nodejs
build system that could only take parts of that .wasm file. The rust linker though will only include the used
functions in the `.wasm` file.


# Setup

```
rustup target add wasm32-unknown-unknown
cargo install wasm-pack
~/.cargo/bin/wasm-pack build --release -t nodejs
```

# Example usage from node (sync code):

```
fs = require('fs');
img1 = fs.readFileSync('problem.jpg');

m = require('./pkg/imager_wasm');
img2 = m.thumbnail(img1, 800, 800);

fs.writeFileSync('solution.jpg', img2);
```

# References

* https://rustwasm.github.io/docs/wasm-pack/
* https://rustwasm.github.io/docs/wasm-bindgen/
* https://www.joyent.com/blog/improved-wasm-support-coming-to-node
* https://dev.to/dandyvica/wasm-in-rust-without-nodejs-2e0c

# Making a release on npmjs

This repo has travis configured to publish the build node package on npmjs. When a commit on the master branch is
tagged, travis will try to push the package to npmjs. The version of the node package is copied from `Cargo.toml`, so
it's up to you make sure the version is updated accordingly. The tag name is not used, but should follow the version in
`Cargo.toml` (and so the node package version). For example, the 0.1.0 version should be tagged as `v0.1.0`.
