import "purecss/build/grids-min.css";
import "purecss/build/grids-responsive-min.css";
import JustValidate from 'just-validate';


import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "/src/css/style.css";


const burger = document.querySelector(".burger"),
    close = document.querySelector(".header__menu-close"),
    menu = document.querySelector(".header__menu");

burger.addEventListener("click", () => {
    menu.classList.add("header__menu_active");
    document.body.style.overflow = "hidden";
});

close.addEventListener("click", () => {
    menu.classList.remove("header__menu_active");
    document.body.style.overflow = "";
});

try {
    // init Swiper:
    const swiper = new Swiper('.works__slider', {
        // configure Swiper to use modules
        slidesPerView: 1,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".icon-right-open",
            prevEl: ".icon-left-open",
        },
        breakpoints: {
            1200: {
                slidesPerView: 3,
                spaceBetween: 5,
            },
            1920: {
                spaceBetween: 35,
            }
        },
        modules: [Navigation, Pagination],
    });
} catch (e) { }

try {
    const tabs = document.querySelectorAll(".catalog__tab");
    const contents = document.querySelectorAll(".catalog__content-item");

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            // Удаляем активный класс у всех табов и контента
            tabs.forEach((t) => t.classList.remove("catalog__tab_active"));
            contents.forEach((c) => (c.style.display = "none"));

            // Добавляем активный класс к нажатому табу и показываем соответствующий контент
            tab.classList.add("catalog__tab_active");
            contents[index].style.display = "flex";
        });
    });

    // Показываем первый контент при загрузке
    contents.forEach((c, i) => (c.style.display = i === 0 ? "flex" : "none"));
} catch (e) { }

// Обратите внимание, что значение block (в двух местах) можно спокойно поменять на flex, если вам это необходимо

try {
    const validatorA = new JustValidate('.req-form');
    validatorA
        .addField('#name', [
            {
                rule: 'required',
                errorMessage: 'Please fill the name'
            },
            {
                rule: 'minLength',
                value: 2,
            },
        ])
        .addField('#email', [
            {
                rule: 'required',
                errorMessage: 'Please fill the email'
            },
            {
                rule: 'email',
            },
        ])
        .addField('#question', [
            {
                rule: 'required',
                errorMessage: 'Please fill the question'
            },
            {
                rule: 'minLength',
                value: 5,
            },
        ])
        .addField('#agree', [
            {
                rule: 'required',
            },
        ],
            {
                errorsContainer: document.querySelector('#agree').parentElement.parentElement.querySelector('.checkbox-error-message'),
            }
        )
        .onSuccess((event) => {
            const form = event.currentTarget;
            const formData = new FormData(form);

            fetch("https://httpbin.org/post", {
                method: "POST",
                body: formData,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("Success", data);
                    form.reset();
                });
        });
    //Отправка формы тестовое

} catch (e) { }

try {
    const validatorFooter = new JustValidate('.footer__form');
    validatorFooter
        .addField('#footer__email', [
            {
                rule: 'required',
                errorMessage: 'Please fill the email'
            },
            {
                rule: 'email',
            },
        ],
            {
                errorsContainer: document.querySelector('#footer__email').parentElement.querySelector('.footer__email-error-message'),
            }
        )
        .addField('#footer__agree', [
            {
                rule: 'required',
            },
        ],
            {
                errorsContainer: document.querySelector('#footer__agree').parentElement.parentElement.querySelector('.footer__checkbox-error-message'),
            }

        )
        .onSuccess((event) => {
            const form = event.currentTarget;
            const formData = new FormData(form);

            fetch("https://httpbin.org/post", {
                method: "POST",
                body: formData,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("Success", data);
                    form.reset();
                });
        });
    //Отправка формы тестовое
} catch (e) { }




