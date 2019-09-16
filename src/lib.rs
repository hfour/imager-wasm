use wasm_bindgen::prelude::*;

#[wasm_bindgen(catch)]
pub fn normalize(bytes: &[u8]) -> Result<Box<[u8]>, JsValue> {
    Err(JsValue::from_str("simulated error"))
}
