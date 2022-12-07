$('.upload-form').hide();
$('.upload-pictures').hide();
$('.upload-final').hide();

const FirstCard = document.getElementById("upload-first");
const FirstModInput = document.getElementById("mod-upload");
const FirstStatusEl = document.getElementById("upload-status");
const FirstStatusPercentage = document.getElementById("upload-status-value");
const FirstStatusProgressContainer = document.getElementById("upload-status-progress-container");
const FirstStatusProgressBar = document.getElementById("upload-status-progress-bar");
const viewFileName = document.getElementById("upload-filename");

const formModTitle = document.getElementById("mod-title")
const formModDescription = document.getElementById("mod-description")
const formModCategory = document.getElementById("mod-category")
const formModRequired = document.getElementById("mod-reqresource")

const modTitle = $('#mod-title')
const modDescription = $('#mod-description')
const modCategory = $('#mod-category')
const modAuthors = $('#mod-authors')
const modTags = $('#mod-tags')
const modRequired = $('#mod-reqresource')

const viewModTitle = $('.upload-main-name')
const previewModTitle = $('.product-title')
const previewFileName = $('.upload-content-filename')
const previewFileSize = $('.upload-preview-filesize')
const previewPicture = $('.product-img img')

const nextButtonForm = $('#nextButton-form')
const nextButtonImages = $('#nextButton-images')
const backButtonImages = $('#backButton-images')
const backButtonFinal = $('#backButton-final')
const submitUploadBtn = $('#submit-upload')

const imgUpload = $('#upload-img-upload')
const imgUploadBtn = $('#upload-img-btn')

const checkboxFinal = $('#upload-agreement')

const id = randomChars(15);

function dragOverHandler(e) {
    e.preventDefault();
}

function progressError() {
    FirstStatusEl.classList.add("error");
}

function uploadFirstError(desc) {
    /*
    if (document.getElementsByClassName("alert-error")) {
        console.log("ja");
        FirstCard.innerHTML.closest("div.alert-error").remove();
    }
    */
    
    FirstCard.innerHTML = 
    `<div class="alert-error alert alert-width-100">
        <div class="alert-index">
            <svg class="alert-icon" viewBox="0 0 101 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M50.1802 100C77.7944 100 100.18 77.6142 100.18 50C100.18 22.3858 77.7944 0 50.1802 0C22.5659 0 0.180176 22.3858 0.180176 50C0.180176 77.6142 22.5659 100 50.1802 100ZM29.1299 61.4766C26.3963 64.2103 26.3963 68.6424 29.1299 71.3761C31.8636 74.1098 36.2957 74.1098 39.0294 71.3761L50.3431 60.0624L61.6568 71.3761C64.3905 74.1098 68.8226 74.1098 71.5563 71.3761C74.29 68.6424 74.29 64.2103 71.5563 61.4766L60.2426 50.1629L71.5563 38.8492C74.29 36.1155 74.29 31.6834 71.5563 28.9497C68.8227 26.216 64.3905 26.216 61.6568 28.9497L50.5797 40.5L39.0294 28.9497C36.2957 26.216 31.8636 26.216 29.1299 28.9497C26.3963 31.6834 26.3963 36.1155 29.1299 38.8492L40.5698 50.2891L29.1299 61.4766Z"/>
            </svg>
            <h4 class="alert-title">Could not upload mod</h4>
        </div>
        <p class="alert-desc">${desc}</p>
    </div>` + FirstCard.innerHTML;
}

function randomChars(length) {
    var result;
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function dropHandler(e) {
    var fileSizeFormatted;
    var fileSizeUnit;
    var fileName;
    var fileType;
    var files;
    
    const acceptedModFileTypes = ["zip", "7z", "rar", "tar", "tar.gz"];
    
    var err = false;

    if (e.type == "change") {
        files = e.target.files;
    }
    else if (e.type == "drop") {
        e.preventDefault();

        if (e.dataTransfer.items) {
            stop = false;
            files = e.dataTransfer.files;            
        } else {
            return;
        }
    }

    if (files.length > 1) {
        err = true;
        uploadFirstError("A mod can only be one single file. Put all your files into one single compressed file.");
        console.log("A mod can only be one single file");
        return;
    }

    fileType = files[0].type;
    fileName = files[0].name;

    if (files[0]['size'] >= 1000 && files[0]['size'] < 1000000) {
        fileSizeUnit = Math.ceil(files[0]['size'] / 100) / 10;
        fileSizeFormatted = fileSizeUnit + " KB";
    }
    else if (files[0]['size'] >= 1000000 && files[0]['size'] < 1000000000) {
        fileSizeUnit = Math.ceil(files[0]['size'] / 100000) / 10;
        fileSizeFormatted = fileSizeUnit + " MB";
    }
    else if (files[0]['size'] >= 1000000000 && files[0]['size'] < 1000000000000) {
        fileSizeUnit = Math.ceil(files[0]['size'] / 100000000) / 10;
        fileSizeFormatted = fileSizeUnit + " GB";
    }
    else if (files[0]['size'] >= 1000000000000) {
        fileSizeUnit = Math.ceil(files[0]['size'] / 100000000000) / 10;
        fileSizeFormatted = fileSizeUnit + " TB";
    }
    else { fileSizeFormatted = file['size'] + " B"; }

    previewFileSize.text(fileSizeFormatted)
    
    if(files[0]['size'] > 100000000) {
        err = true;

        progressError()
        FirstStatusEl.style.animation = "fadeIn 500ms ease-in-out both";
        previewFileName.text(fileName)
        $('#upload-status-filename').text(fileName)
        FirstStatusPercentage.innerText = 0 + "%";
        FirstStatusProgressBar.style.width = "0%";

        uploadFirstError("Your file is too powerful (100MB upload limit reached). If you have video tutorials in your mod upload them to another site, then link it in the mod description");
        console.log("Error: File is over 100MB");
        return;

    }

    const fileNameType = fileName.split(".").at(-1).toLowerCase();

    console.log(files);

    if (acceptedModFileTypes.indexOf(fileNameType) === -1) {
        err = true;

        progressError()
        FirstStatusEl.style.animation = "fadeIn 500ms ease-in-out both";
        previewFileName.text(fileName)
        $('#upload-status-filename').text(fileName)
        FirstStatusPercentage.innerText = 0 + "%";
        FirstStatusProgressBar.style.width = "0%";

        uploadFirstError("The filetype is not accepted. File format has to be one listed bellow.");
        console.log("Error: The filetype is not accepted");
        return;
    }



    console.log(`Name: ${fileName}\nSize: ${fileSizeFormatted}\nFile Type: ${fileType}\nFile Name Type: ${fileNameType}`);
    viewFileName.innerText = fileName;

    FirstStatusEl.style.animation = "fadeIn 500ms ease-in-out both";
    previewFileName.text(fileName)
    $('#upload-status-filename').text(fileName)
    FirstStatusPercentage.innerText = 50 + "%";
    FirstStatusProgressBar.style.width = "50%";


    const formData = new FormData();

    formData.append('files[]', files)
    formData.append('id', id)

    if(!err) {
        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(e) {
                    if(e.lengthComputable) {
                        var percentComplete = ((e.loaded / e.total) * 100) + "%";
                        FirstStatusProgressBar.style.width = percentComplete
                        FirstStatusPercentage.innerText = percentComplete
                    }
                }, false)
                return xhr;
            },
            type: 'POST',
            url: 'https://ext-cdn.fivemods.net/uploadACP.php',
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            error: function(e) {
                console.log(e);
            },
            success: function(res) {
                console.log("SUCCESS");
                console.log(res);
                setTimeout(() => {
                    $('.upload-first').hide("fast")
                    $('.upload-form').show("fast")
                }, 1000);
            }
        })
    }
}

nextButtonForm.on("click", function() {
    if (!formModTitle.classList.contains("error")) { // Add this for every input field
        $('.upload-form').hide("slow")
        $('.upload-pictures').show("slow")

    } else {
        alert("error");
    } 
});

nextButtonImages.on("click", function() {
    $('.upload-pictures').hide("slow")
    $('.upload-final').show("slow")
})

backButtonImages.on("click", function() {
    $('.upload-pictures').hide("slow")
    $('.upload-form').show("slow")
})


backButtonFinal.on("click", function() {
    $('.upload-final').hide("slow")
    $('.upload-pictures').show("slow")
})

imgUploadBtn.on("click", function(evt) {
    evt.preventDefault();
    imgUpload.trigger("click")
})

const imgPictures = [];

imgUpload.on("change", function() {
    const acceptedImgFileTypes = ["PNG", "JPG", "JFIF", "JPEG", "WEBP"];
    var error = false;
    var files = $(this).prop("files");

    if((imgPictures.length + files.length) > 10) {
        alert("You can't upload more than 10 pictures")
        error = true;
    }
    if(!error) {
        for (let i = 0; i < files.length; i++) {
            console.log(files[i].name)
            if(files[i].size > 100000000) {
                alert("File is too big (" + files[i].name + ")")
                error = true;
            } else if(acceptedImgFileTypes.indexOf(files[i].name.toUpperCase().split(".")[files[i].name.split(".").length - 1]) == -1) {
                alert("Wrong file extension (" + files[i].name + ")")
                error = true;
            }
            if(error) {
                break;
            } else {
                imgPictures.push(files[i]);
                var imgPreview = URL.createObjectURL(files[i]);
                $('.upload-img-container').append('<div class="upload-img-element"><img class="upload-img" src="' + imgPreview + '" alt="Mod Image"><button id="img-' + files[i].name + '" class="upload-img-close"><img src="https://v2-assets.fivemods.net/k9uLIoZgTrHxepUc.svg" alt="Remove image"></button></div>')
                
            }
            
        }
        if(!error) {
            if(imgPictures.length > 0) {
                var img = URL.createObjectURL(imgPictures[0])
                previewPicture.attr('src', img)
            } else {
                previewPicture.attr('src', "https://v2-assets.fivemods.net/9l5LB7pVomRDPrNc.svg")
            }
        }
    }

    console.log(imgPictures)
})
$('body').on('click', '.upload-img-close', function() {
    $(this).parent().hide("fast", function() {
        $(this).remove();
    })
    var name = $(this).attr("id").split("img-")[1]
    imgPictures.forEach(function(picture, index) {
        if(picture.name == name) {
            imgPictures.splice(index, 1);
        }
    })
    
    if(imgPictures.length > 0) {
        var img = URL.createObjectURL(imgPictures[0])
        previewPicture.attr('src', img)
    } else {
        previewPicture.attr('src', "https://v2-assets.fivemods.net/9l5LB7pVomRDPrNc.svg")
    }
    console.log(imgPictures)
})

checkboxFinal.on("change", function() {
    if(checkboxFinal.is(':checked')) {
        submitUploadBtn.prop('disabled', false)
    } else {
        submitUploadBtn.prop('disabled', true)
    }
})

$('form').on("submit", function(evt) {
    evt.preventDefault();
})

submitUploadBtn.on("click", function() {
    var error = false;

    if(imgPictures.length == 0) {
        alert("You have to upload pictures")
        error = true;
    }

    if(!error) {
        const formData = new FormData();
        formData.append("id", id)
        formData.append("imgs", imgPictures)
        formData.append("title", modTitle.val())
        formData.append("description", modDescription.val())
        formData.append("category", modCategory.val())
        formData.append("authors", modAuthors.val())
        formData.append("tags", modTags.val())

        if(modRequired.val() != null) {
            formData.append("required", modRequired)
        }
        
    }
})

document.addEventListener('keyup', e => {
    switch (e.target) {
        case formModTitle:
            var validationText = $('#upload-input-validation-msg-title');
            if (formModTitle.value == ""){
                viewModTitle.text("Upload a mod");
                previewModTitle.text("Mod title")
            } else {
                viewModTitle.text(formModTitle.value);
                previewModTitle.text(formModTitle.value)
            }

            if (formModTitle.classList.contains("error")) {
                if (formModTitle.value.length < 75 && formModTitle.value.length > 10) {
                    formModTitle.classList.remove("error");
                }
            } else {
                if (formModTitle.value.length > 75) {
                    formModTitle.classList.add("error");
                    validationText.text("Mod title has to be under 75 characters");
                } else if (formModTitle.value.length < 10) {
                    formModTitle.classList.add("error");
                    validationText.text("Mod title has to be over 10 characters");
                }
            }
            break;
        case formModDescription:
            var validationText = $('#upload-input-validation-msg-desc');

            if (formModDescription.classList.contains("error")) {
                if (formModDescription.value.length < 2000 && formModDescription.value.length > 150) {
                    formModDescription.classList.remove("error");
                }
            } else {
                if (formModDescription.value.length > 2000) {
                    formModDescription.classList.add("error");
                    validationText.text("Mod description has to be under 2000 characters");
                } else if (formModDescription.value.length < 150) {
                    formModDescription.classList.add("error");
                    validationText.text("Mod description has to be over 150 characters");
                }
            }

            break;

        case formModRequired:
            var validationText = $('#upload-input-validation-msg-required');
            var regex = /(^(?!\()|\s)(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s|\)|\<]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s|\)|\<]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s|\)|\<]{2,}|www\.[a-zA-Z0-9]+\.[^\s|\)|\<]{2,})/
            if (formModRequired.classList.contains("error")) {
                if (regex.test(formModRequired.value) || formModRequired.value == "") {
                    formModRequired.classList.remove("error");
                }
            } else if(!regex.test(formModRequired.value) && formModRequired.value != "") {
                formModRequired.classList.add("error")
                validationText.text("You have to insert a valid URL")
            }

            break;
        default:
            break;
    }
})

/*
        if (files.length > 0) {
            console.log(files.length);

            for (let i = 0; i < files.length; i++) {
                let file = files[i];

                if (file['size'] > 100000000) {
                    console.log("The file " + file['name'] + " is too big.")
                    stop = true;
                    break;
                }

                formData.append('files[]', file)
            }

            formData.append('secret', "KAZKH7pevGEG92zScpz3nh97T47CHZuhu9XkuPmnjryg9VSyq5cW6YsaL2uXYCCLZrpDv7pdGv8SVXg4QEN43w8zkVc38aZh7FwG");
            formData.append('hashSecret2', "$2y$10$hSNtYkJ.QuExnf7qAvz3RudkdqDLKnGK4Zcv9ThdJ1KGWeh4HI1.y");

            if (!stop) {
                $.ajax({

                    xhr: function () {
                        $('#uploadModal').show()
                        var xhr = new window.XMLHttpRequest();
                        xhr.upload.addeventListener("progress", function (e) {
                            if (e.lengthComputable) {
                                var percentComplete = ((e.loaded / e.total) * 100);
                                $(".pg-pics").width(Math.ceil(percentComplete) + '%');
                                $(".pg-pics").html(Math.ceil(percentComplete) + '%');
                            }
                        }, false)
                        return xhr;
                    },
                    type: 'POST',
                    url: 'https://ext-cdn.fivemods.net/uploadACP.php',
                    data: formData,
                    contentType: false,
                    cache: false,
                    processData: false,
                    beforeSend: function () {
                        $(".pg-pics").width('0%');
                        $('#uploadText').html(" ");
                    },
                    error: function () {
                        console.log("error");
                    },
                    success: function (res) {
                        if (res == "ERR_BIG") {
                            err = 1;
                            errtext = "Your files are too powerful (100MB upload limit reached)";
                        }
                        else if (res == "ERR_AUTH_FAILED") {
                            err = 1;
                            errtext = "Authentification failed. Please try again later";
                        }
                        else {
                            err = 0;
                        }
                        if (err == 1) {
                            console.log("Error");
                            $('#uploadText').html(errtext);
                        } else {
                            console.log("Success: " + res)
                            var text = "Your files got uploaded<hr>";
                            for (var i = 1; i < res.split(",").length; i++) {
                                var file = res.split(",")[i].split("|");
                                text += "<b>" + file[1] + ":</b> <a target=\"_blank\" href=\"https://ext-cdn.fivemods.net/img/" + file[0] + "\">https://ext-cdn.fivemods.net/img/" + file[0] + "</a><hr>";
                            }
                            $('#uploadText').html(text);
                        }

                    }
                });
            }
        }
        */