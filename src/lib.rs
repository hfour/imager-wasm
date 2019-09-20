use image;
use wasm_bindgen::prelude::*;

#[wasm_bindgen(catch)]
pub fn thumbnail(bytes: &[u8], width: u32, height: u32) -> Result<Box<[u8]>, JsValue> {
    let img = image::load_from_memory(&bytes)
        .map_err(|err| JsValue::from(format!("{}", err)))?;

    let format = image::guess_format(&bytes)
        .map_err(|err| JsValue::from(format!("{}", err)))?;

    let mut buf: Vec<u8> = Vec::new();

    let thumbnail = img.thumbnail(width, height);
    thumbnail
        .write_to(&mut buf, format)
        .map_err(|err| JsValue::from(format!("{}", err)))?;

    Ok(buf.into_boxed_slice())
}
