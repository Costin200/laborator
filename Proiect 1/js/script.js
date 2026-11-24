// ================================================
// 1. MENIUL PE TELEFON (butonul ☰)
// ================================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function () {
    navMenu.classList.toggle('active'); // pune / scoate clasa "active"
});


// ================================================
// 2. FILTRAREA PROIECTELOR (doar pe projects.html)
// ================================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        const filter = btn.getAttribute('data-filter'); // "all", "web" sau "joc"

        // butonul apăsat devine albastru
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        // arătăm doar cardurile potrivite
        projectCards.forEach(function (card) {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});


// ================================================
// 3. ANIMAȚIE LA SCROLL (elementele apar treptat)
// ================================================
const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {               // a intrat pe ecran?
            entry.target.classList.add('visible'); // atunci îl arătăm
        }
    });
});

document.querySelectorAll('.fade-in').forEach(function (el) {
    observer.observe(el);
});


// ================================================
// 4. VALIDAREA FORMULARULUI (doar pe contact.html)
// ================================================
const form = document.getElementById('contact-form');

if (form) { // rulăm doar dacă formularul există pe pagină
    const message = document.getElementById('message');
    const counter = document.getElementById('counter');

    // contor de caractere care se actualizează când scrii
    message.addEventListener('input', function () {
        counter.textContent = message.value.length + ' / 1000';
    });

    // verifică UN câmp și afișează eroarea lui
    function validateField(id) {
        const field = document.getElementById(id);
        const errorElement = document.getElementById(id + '-error');
        const value = field.value.trim(); // scoatem spațiile de la capete
        let error = '';

        if (id === 'name') {
            if (value.length < 2) error = 'Numele trebuie să aibă minim 2 caractere.';
            else if (!/^[a-zA-ZăâîșțĂÂÎȘȚ\s]+$/.test(value)) error = 'Numele poate avea doar litere și spații.';
        }

        if (id === 'email') {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Email invalid.';
        }

        if (id === 'phone') {
            if (value !== '' && !/^[0-9\s\-()]+$/.test(value)) error = 'Telefonul poate avea doar cifre, spații, - și ().';
        }

        if (id === 'message') {
            if (value.length < 10) error = 'Mesajul trebuie să aibă minim 10 caractere.';
            else if (value.length > 1000) error = 'Mesajul poate avea maxim 1000 de caractere.';
        }

        errorElement.textContent = error;
        field.classList.toggle('invalid', error !== ''); // chenar roșu dacă e greșit
        return error === ''; // true = câmp corect
    }

    const fields = ['name', 'email', 'phone', 'message'];

    // validare în timp real: când ieși dintr-un câmp
    fields.forEach(function (id) {
        document.getElementById(id).addEventListener('blur', function () {
            validateField(id);
        });
    });

    // când apeși "Trimite"
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // oprim reîncărcarea paginii

        let allValid = true;
        fields.forEach(function (id) {
            if (!validateField(id)) allValid = false;
        });

        const success = document.getElementById('success');
        if (allValid) {
            success.textContent = 'Mesaj trimis cu succes! ✅';
            form.reset();
            counter.textContent = '0 / 1000';
        } else {
            success.textContent = '';
        }
    });
}
