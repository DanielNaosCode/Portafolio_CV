/* ***************** ///Menu/// ******************* */
/* tecnica funciones anonimas auto ejecutables (se puede volver a usar en otro proyecto sin problemas)*/

/* el objeto document se pasa por la variable d */
((d) => {
    /* abrir y cerrar el menu */
    const $btnMenu =
        d.querySelector(
            ".menu-btn"
        ) /* se selecciona el boton menu mediante su clase */ ,
        $menu =
        d.querySelector(".menu"); /* se selecciona el menu mediante su clase */

    /* programacion al evento click */
    $btnMenu.addEventListener("click", (e) => {
        $btnMenu.firstElementChild.classList.toggle(
            "none"
        ); /* al primer elemento hijo le intercambie la clase none */
        $btnMenu.lastElementChild.classList.toggle(
            "none"
        ); /* al ultimo elemento hijo le intercambie la clase none */
        /* entonces cuando de click al btn-menu al primer hijo como no tiene clase none se la agrega y como el segundo hijo si tiene la clase none entonces se la quita, pricticamente se cambian de activo a incativo al momento de dar click al btn-menu
         */

        $menu.classList.toggle(
            "is-active"
        ); /* al menu tambien se le intercambia la clase is-active para que oculte o muestre la opacidad del menú */
    });

    /* tecnica de delegación de eventos */
    /* programacion al evento click */
    d.addEventListener("click", (e) => {
        if (!e.target.matches(".menu a"))
            return false; /* si el elemento que origino el clic no es un enlace que esta dentro del menu entonces retorna falso, pero si si lo es entonces... */
        $btnMenu.firstElementChild.classList.remove(
            "none"
        ); /* al primer elemento quitale la clase none */
        $btnMenu.lastElementChild.classList.add(
            "none"
        ); /* al ultimo elemento agregale la clase none */
        $menu.classList.remove(
            "is-active"
        ); /* y al menu remuevele la is-active entonces solo quedaria la clase .menu y se elimina la clase .is-active*/
    });
})(document);

/* ************* ContactForm   ****************** */
((d) => {
    const $form = d.querySelector(".contact-form"),
        $loader = d.querySelector(".contact-form-loader"),
        $response = d.querySelector(".contact-form-response");

    $form.addEventListener("submit", (e) => {
        e.preventDefault();
        $loader.classList.remove("none");
        fetch("https://formsubmit.co/ajax/dmartinez@grupoaltex.com", {
                method: "POST",
                body: new FormData(e.target),
            })
            .then((res) => (res.ok ? res.json() : Promise.reject(res)))
            .then((json) => {
                console.log(json);
                location.hash = "#gracias";
                $form.reset();
            })
            .catch((err) => {
                console.log(err);
                let message = err.statusText || "Ocurrio un error al enviar, intenta nuevamente";
                $response.querySelector("h3").innerHTML = 'Error ${err.status}: ${message}';
            })
            .finally(() => {
                $loader.classList.add("none");
                setTimeout(() => {
                    location.hash = "#close";
                }, 3000);
            });
    });
})(document);