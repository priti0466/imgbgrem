// Define constants and elements
const imageInput = document.getElementById('imageInput');
const outputImage = document.getElementById('outputImage');
const removeBackgroundButton = document.getElementById('removeBackground');
const downloadButton = document.getElementById('downloadImage');
const apiKey = 'VeusCihByApWXaLPeGr2tVt2'; 

// Event listener for file input
imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        // Display the selected image
        const imageURL = URL.createObjectURL(file);
        outputImage.src = imageURL;
    }
});

// Event listener for background removal
removeBackgroundButton.addEventListener('click', () => {
    const file = imageInput.files[0];
    if (file) {
        // Use the remove.bg API to remove the background
        removeBackground(file);
    }
});

// Event listener for download button
downloadButton.addEventListener('click', () => {
    // Trigger the download
    const image = outputImage.src;
    const a = document.createElement('a');
    a.href = image;
    a.download = 'removed_background_image.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

// Function to remove the background using remove.bg API
function removeBackground(file) {
    const formData = new FormData();
    formData.append('image_file', file);

    fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
            'X-Api-Key': apiKey,
        },
        body: formData,
    })
    .then((response) => response.blob())
    .then((result) => {
        // Display the processed image
        const imageURL = URL.createObjectURL(result);
        outputImage.src = imageURL;

        // Enable the download button
        downloadButton.removeAttribute('disabled');
    })
    .catch((error) => console.error(error));
}
