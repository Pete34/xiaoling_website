const nav = document.querySelector('.navbar')
const navLinks = nav.querySelectorAll<HTMLAnchorElement>('a.nav-link')

console.log("currentPage.ts running");

export function Tester() {
    console.log('Tester running');
}

// Function to show current page
function ShowCurrentPage() {
    console.log('ShowCurrentPage running')

    const currentURL = window.location.href

    navLinks.forEach((link) => {

        console.log(`link.href: ${link.href} currentURL: ${currentURL}`);
        if (link.href === currentURL) {
            //adding class
            link.classList.add('is-active')
        }
        if (link.href !== currentURL) {
            //removing class
            link.classList.remove('is-active')
        }
    })
}

ShowCurrentPage();

document.addEventListener(
    'astro:page-load',
    () => {

        // console.log('after-swap event fired')
        ShowCurrentPage();

    },
    { once: false }
)
