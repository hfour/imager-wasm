use image;
use wasm_bindgen::prelude::*;

#[wasm_bindgen(catch)]
pub fn normalize(bytes: &[u8]) -> Result<Box<[u8]>, JsValue> {
    let img = image::load_from_memory(&bytes)
        .map_err(|err| JsValue::from(format!("{}", err)))?;

    let mut buf: Vec<u8> = Vec::new();

    let format: image::ImageFormat = image::JPEG;
    let thumbnail = img.thumbnail(800, 800);
    thumbnail
        .write_to(&mut buf, format)
        .map_err(|err| JsValue::from(format!("{}", err)))?;

    Ok(buf.into_boxed_slice())
}
