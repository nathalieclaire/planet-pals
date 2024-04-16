/** Shorthand function to create a content type mapping with the "Content-Type" entry.
 * @param {string} content_type_value The value for "Content-Type" in the mapping. */
function createContentType(content_type_value) {
    return {
        "Content-Type": content_type_value
    }
}
// export content type mapping object
module.exports = {
    html: createContentType("text/html"),
    text: createContentType("text/plain"),
    js: createContentType("text/js"),
    jpg: createContentType("image/jpg"),
    png: createContentType("image/png"),
    css: createContentType("text/css"),
}
