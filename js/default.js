// Header change
const headerTransparent = document.getElementById("header-change");
const html = document.querySelector("html");

if (headerTransparent) {
    window.onload = (event) => {
        if (html.scrollTop > 50) {
            if (headerTransparent.classList.contains('header-transparent')) {
                headerTransparent.classList.remove('header-transparent');
                headerTransparent.classList.add('header-dark');
            }
        } else {
            headerTransparent.classList.remove('header-dark');
            headerTransparent.classList.add('header-transparent');
        }
    };
}

if (headerTransparent) {
    document.addEventListener('scroll', e => {
        if (html.scrollTop > 50) {
            if (headerTransparent.classList.contains('header-transparent')) {
                headerTransparent.classList.remove('header-transparent');
                headerTransparent.classList.add('header-dark');
            }
        } else {
            headerTransparent.classList.remove('header-dark');
            headerTransparent.classList.add('header-transparent');
        }
    });
}

// Page dropdowns/dropups
document.addEventListener('click', e => {
    if (e.target.matches('[data-dropdown-bg]')) {
        document.querySelectorAll('[data-dropdown].active').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }

    const isDropdownButton = e.target.closest('[data-dropdown-button]');
    if (!isDropdownButton && e.target.closest('[data-dropdown]') != null) return;

    let currentDropdown;
    if (isDropdownButton) {
        currentDropdown = e.target.closest('[data-dropdown]');
        currentDropdown.classList.toggle('active');
    }

    document.querySelectorAll('[data-dropdown].active').forEach(dropdown => {
        if (dropdown === currentDropdown) return;
        dropdown.classList.remove('active');
    });
});

function closeDropdown() {
    document.querySelectorAll('[data-dropdown].active').forEach(dropdown => {
        dropdown.classList.remove('active');
    });
}

function swapCookiesPage(page) {
    var cookiesMain = document.getElementById("cookieConsent");
    var cookiesCustomize = document.getElementById("cookieConsentCustomize");

    switch (page) {
        case 0:
            cookiesMain.style.display = 'block';
            cookiesCustomize.style.display = 'none';
            break;
    
        case 1:
            cookiesMain.style.display = 'none';
            cookiesCustomize.style.display = 'block';
            break;
        default:
            break;
    }
}

function inputJump(field, jumpId) {
    if (field.value.length >= field.maxLength) {
        document.getElementById(jumpId).focus();
    }
}

$(".input-2fa").keypress(e => {
    // Only allow numbers in 2FA input
    var a = [];
    var k = e.which;

    for (i = 46; i < 58; i++)
        if (i !== 47) { 
            a.push(i);
        }

    if (!(a.indexOf(k)>=0)) {
        e.preventDefault();
    }
})

$(".input-2fa").keyup(function () {
    // Auto focus to next input field
    if (this.value.length == this.maxLength) {
        if($(this).next('.input-2fa') && !$(this).is(":last-child")) {
            $(this).next('.input-2fa').focus();
            console.log("inside");
        }
        /*
        else if ($(this).parent().next().children().first('.input-2fa')) {
            console.log($(this).parent().next().children().first('.input-2fa'));
            console.log("outside");
            $(this).parent().next().children().first('.input-2fa').focus();
        };
        */
    };
});