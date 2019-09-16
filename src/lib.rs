use wasm_bindgen::prelude::*;

#[wasm_bindgen(catch)]
pub fn normalize(bytes: &[u8]) -> Result<Box<[u8]>, JsValue> {
    Ok((0..42).collect::<Vec<u8>>().into_boxed_slice())
}
