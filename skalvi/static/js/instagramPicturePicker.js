let images = [];

function imageClicked(image) {
    const index = images.indexOf(image);
    if (index > -1) {
        $(image).removeClass("instagram-image-selected");
        images.splice(index,1);
    }
    else {
        images.push(image);
        $(image).addClass("instagram-image-selected");
    }
    let imageText = images.map(function (image) {
        return image.src
    });
    $('#instagramImages').val(imageText);
}

function selectedImages(images) {
    let imageList = images.split(",").map(function (image) {
        image = "'" + image + "'";
        return $("img[src=" + image + "]");
    });
   for (i in imageList) {
       console.log(imageList[i])
       imageClicked(imageList[i]);
   }
}
