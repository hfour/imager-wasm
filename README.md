# Normalize Images

This simple module does only one thing. Given an image buffer containing
a GIF, PNG or JPEG, resize it to the given size. Use the [image-rs](https://github.com/image-rs/image)
library, and compile to wasm for nodejs usage.

# Setup

```
rustup target add wasm32-unknown-unknown
cargo install wasm-pack
~/.cargo/bin/wasm-pack build --release -t nodejs
```

# Example usage from node:

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
