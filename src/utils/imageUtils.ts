/**
 * createImageFormData accepts a local image URI and returns a FormData instance
 * with the proper file information (name and MIME type) for uploading.
 *
 * @param localImageUri - The local URI of the image.
 * @returns FormData with the file appended.
 */
export const createImageFormData = (localImageUri: string): FormData => {
    // Split the URI to extract the file extension.
    const uriParts = localImageUri.split('.');
    const fileExt = uriParts[uriParts.length - 1].toLowerCase();

    // Determine the MIME type based on the file extension.
    let mimeType = 'image/jpeg';
    if (fileExt === 'png') {
        mimeType = 'image/png';
    } else if (fileExt === 'jpg' || fileExt === 'jpeg') {
        mimeType = 'image/jpeg';
    } else {
        mimeType = `image/${fileExt}`;
    }

    // Create a new FormData instance and append the file.
    const formData = new FormData();
    formData.append('file', {
        uri: localImageUri,
        name: `upload.${fileExt}`,
        type: mimeType,
    } as any);

    return formData;
};
