const d = document,
  $buscar = d.getElementById("buscador-sec"),
  $template = d.getElementById("buscar-template").content,
  $fragment = d.createDocumentFragment();
d.activeElement.addEventListener("keypress", async (e) => {
  if (e.target.matches("#search")) {
    if (e.key === "Enter") {
      try {
        $buscar.innerHTML = "<p>Cargando...</p>";
        let query = e.target.value.toLowerCase(),
          api = `url=${query}`,
          res = await fetch(api),
          json = await res.json();

        if (!res.ok) {
          throw { status: res.status, statusText: res.statusText };
        }

        if (json.length === 0) {
          $buscar.innerHTML = `<p>No se encontraron resultados para ${query}</p>`;
        } else {
          json.forEach((el) => {
            $template.querySelector("h3").textContent = el.title;
            $template.querySelector("div").textContent = el.descripcion;
            $template.querySelector("img").setAttribute("src", el.imagen);
            $template.querySelector("img").alt = el.nombredeimagen;
            $template.querySelector("img").style.maxWidth = "100%";
            let $clonetemplate = d.importNode($template, true);
            $fragment.appendChild($clonetemplate);
          });
          $buscar.innerHTML = "";
          $buscar.appendChild($fragment);
        }
      } catch (err) {
        console.log(err);
        let message = err.statusText || "Ocurrio un error";
        $buscar.innerHTML = `<p>Error ${err.status} : ${message} </p>`;
      }
    }
  }
});
