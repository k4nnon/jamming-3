function countCharDesp(val) {
    var len = val.value.length;
    $('#charNum').text("Descripción (" + len + ")");
    if (len < 10) {

        $('#mensageDescrip').removeAttr('hidden');
        $('#encabezadoDescripcion').removeClass('form-group');
        $('#encabezadoDescripcion').addClass('form-group has-error');
    }
    else {
        $('#mensageDescrip').attr('hidden', true);
        $('#encabezadoDescripcion').removeClass('form-group has-error');
        $('#encabezadoDescripcion').addClass('form-group');
    }
};

function countCharTitulo(val) {
    var len = val.value.length;

    if (len < 5) {
        $('#mensageTitulo').removeAttr('hidden');
        $('#encabezadoTitulo').removeClass('form-group');
        $('#encabezadoTitulo').addClass('form-group has-error');

    }
    else {
        $('#mensageTitulo').attr('hidden', true);
        $('#encabezadoTitulo').removeClass('form-group has-error');
        $('#encabezadoTitulo').addClass('form-group');

    }

};

function countDescModi(val) {
    var len = val.value.length;
    $('#descMOD').text("Descripción (" + len + ")");
    if (len < 10) {

        $('#alerDescMod').removeAttr('hidden');
        $('#encabezadoDescMod').removeClass('form-group');
        $('#encabezadoDescMod').addClass('form-group has-error');
    }
    else {
        $('#alerDescMod').attr('hidden', true);
        $('#encabezadoDescMod').removeClass('form-group has-error');
        $('#encabezadoDescMod').addClass('form-group');
    }
};

function countTituloMod(val) {
    var len = val.value.length;

    if (len < 5) {
        $('#alertTituloMod').removeAttr('hidden');
        $('#encabezadoTituloMod').removeClass('form-group');
        $('#encabezadoTituloMod').addClass('form-group has-error');

    }
    else {
        $('#alertTituloMod').attr('hidden', true);
        $('#encabezadoTituloMod').removeClass('form-group has-error');
        $('#encabezadoTituloMod').addClass('form-group');

    }

};

window.onload = carga();


function carga() {

    $.ajax({
        type: "GET",
        url: "http://localhost:8000/routertareas/",
        dataType: "json",

        success: function (data) {

            var js = data
            var tabla;
            var j = 1
            tabla = '<thead><tr><th scope="col">#</th><th scope="col">Titulo</th><th scope="col">Estado</th><th scope="col">Opciones</th></tr></thead>'
            for (var i = 0; i < data.length; i++) {

                tabla += '<tr><td>' + j + '</td><td><a href = "#" id=\"' + js[i].id + '\" onClick = \"obtener(this)\">' + js[i].titulo + '</a></td><td>' + js[i].nombre_estado + '</td>'
                    + '<td><button type = \"button\" class = \"btn btn-primary\" onClick=\"modificar(' + js[i].id + ')\">Modificar</button></td></tr>';
                j++;
            }
            $('#tbody').html(tabla);
        },
        error: function (err) {
        }
    })
}

function modificar(refe) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8000/routertareas/",
        dataType: "json",

        success: function (data) {
            var js = data;

            var indice = refe - 1
            var forma = '<h1>Modificando tarea ' + refe + '</h1>' +
                '<div class="form-group\" id=\"encabezadoTituloMod\">' +
                '<label>Titulo : </label>' +
                '<input type=\"text\" placeholder=\"' + js[indice].titulo + '\" class=\"form-control\" id=\"tituloCambio\" onkeyup=\"countTituloMod(this)\">' +
                '<div class=\"alert alert-danger fade in\" hidden id=\"alertTituloMod\">El titulo debe tener un largo mayor a 5 caracteres</div>'+
                '</div>' +
                '<div class="form-group" id=\"encabezadoDescMod\">' +
                '<label id=\"descMOD\" for="\desp\">Descripción (0)</label>' +
                '<textarea type=\"text\" placeholder=\"' + js[indice].descripcion + '\" class=\"form-control\"  id=\"descCambio\" onkeyup=\"countDescModi(this)\"></textarea>' +
                '<div class="alert alert-danger fade in" hidden id="alerDescMod">La descripción debe tener largo mayor a 10 caracteres</div>'+
                '</div>' +
                '<button type = \"button\" class = \"btn btn-primary\" onClick=\"modificarGuardar(this,' + refe + ',' + js[indice].estado + ')\">Modificar</button>';
            $('#abody').html(forma);

        },
        error: function (err) {
        }
    })
}

function modificarGuardar(refe, id, estado) {
    var titulo = $('#tituloCambio').val();
    var desc = $('#descCambio').val();
    if (titulo.length >= 5 && desc.length >= 10) {
        cambioEstado(refe, id, titulo, desc, estado, 1);
    }
    else {
        if (titulo.length < 5) {
            $('#alertTituloMod').removeAttr('hidden');
            $('#encabezadoTitulo').removeClass('form-group');
            $('#encabezadoTitulo').addClass('form-group has-error');
        }
        if (desc.length < 10) {
            $('#alerDescMod').removeAttr('hidden');
            $('#encabezadoDescMod').removeClass('form-group');
            $('#encabezadoDescMod').addClass('form-group has-error');
        }
    }
}

function obtener(refe) {

    $.ajax({
        type: "GET",
        url: "http://localhost:8000/routertareas/",
        dataType: "json",

        success: function (data) {
            var js = data;
            var indice = refe.id - 1
            var forma = '<h1>' + refe.id + ' ' + js[indice].titulo + '</h1>' + '<p>' + js[indice].descripcion + '</p>';
            if (js[indice].estado != 2) {
                if (js[indice].estado == 0) {
                    forma += '<div id=\"boton-paso\">'
                    forma += '<button type=\"button\" class=\"btn btn-primary\" id=\"botonCambio' + refe.id + '\" onClick=\"cambioEstado(this,' + refe.id + ',\'' + js[indice].titulo + '\',\'' + js[indice].descripcion + '\',' + 1 + ',0)\">Pasar estado En Proceso</button>';
                    forma += '</div>'
                }
                if (js[indice].estado == 1) {

                    forma += '<div id=\"boton-paso\">'
                    forma += '<button type=\"button\" class=\"btn btn-primary\" id=\"botonCambio' + refe.id + '\" onClick=\"cambioEstado(this,' + refe.id + ',\'' + js[indice].titulo + '\',\'' + js[indice].descripcion + '\',' + 2 + ',0)\">Pasar estado Terminada</button>';
                    forma += '</div>'
                }
            }

            $('#abody').html(forma);
        },
        error: function (err) {

        }
    })

}

function cambioEstado(refe, id, titulo, desc, estado, modi) {
    var url = "http://localhost:8000/routertareas/" + id + "/";
    console.log(titulo);
    console.log(desc);
    console.log(estado);


    lista = {
        "titulo": titulo,
        "descripcion": desc,
        "estado": estado
    }

    $.ajax({
        url: url,
        type: "PUT",
        contentType: 'application/json',
        data: JSON.stringify(lista),
        success: function (data) {
            if (modi == 0) {
                var boton = "botonCambio" + id;
                if (estado == 1) {
                    $('#boton-paso').html('<button type=\"button\" class=\"btn btn-primary\" id=\"botonCambio' + id
                        + '\" onClick=\"cambioEstado(this,' + id + ',\'' + titulo + '\',\'' + desc + '\',' + 2 + ')\">Pasar estado Terminada</button>')
                }
                if (estado == 2) {
                    $('#' + boton).remove();
                }
            }
            else {
                var reset = '<div id="abody"></div>'
                $('#abody').html(reset);
            }
            carga();
        },
        error: function (err) {
            console.log("error al put");
        }
    })
}


function filtrar() {
    var busqueda;
    var filtro;
    var tabla;
    var fila;
    var columna;
    busqueda = $('#busqueda');
    filtro = busqueda.val().toUpperCase();
    tabla = $('#tbody');
    fila = tabla.find("tr");
    for (i = 0; i < fila.length; i++) {
        columna = fila[i].getElementsByTagName("td")[1];
        if (columna) {
            if (columna.textContent.toUpperCase().indexOf(filtro) > -1) {
                fila[i].style.display = "";

            } else {
                fila[i].style.display = "none";
            }
        }
    }
}


function formulario() {
    titulo = $('#titulo').val();
    desc = $('#desp').val();
    if (titulo.length >= 5 && desc.length >= 10) {
        lista = {
            "titulo": titulo,
            "descripcion": desc,
            "estado": 0
        }
        $.ajax({

            url: "http://localhost:8000/routertareas/",
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify(lista),
            success: function (data) {
                $('#mensageSuccess').removeAttr('hidden');
                carga();

            },
            error: function (err) {
            }
        })
    }
    else {
        if (titulo.length < 5) {
            $('#mensageTitulo').removeAttr('hidden');
            $('#encabezadoTitulo').removeClass('form-group');
            $('#encabezadoTitulo').addClass('form-group has-error');
        }
        if (desc.length < 10) {
            $('#mensageDescrip').removeAttr('hidden');
            $('#encabezadoDescripcion').removeClass('form-group');
            $('#encabezadoDescripcion').addClass('form-group has-error');
        }
    }
}

function cerrar() {
    console.log("entre");
    $('#mensageSuccess').attr('hidden', true);
}