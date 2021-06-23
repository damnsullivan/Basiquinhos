var onICHostReady = function(version) {};


jQuery(document).ready(function() {
    jQuery("._salvar_notas").click(function() {
        var dado = {
            "nota1": jQuery("#_md_nota1").val(),
            "nota2": jQuery("#_md_nota2").val(),
            "nota3": jQuery("#_md_nota3").val(),
            "media": jQuery("#_md_media").val(),
            "codigo": jQuery("#_codigo").val(),
        }
        debugger
        gICAPI.SetData(dado);
        gICAPI.Action("_salvar_notas");
    });

    jQuery("#_gerar_media").click(function() {

        var dados = {
            "nome_aluno": jQuery("#_nome_aluno").val(),
            "nota1": jQuery("#_nota1").val(),
            "nota2": jQuery("#_nota2").val(),
            "nota3": jQuery("#_nota3").val(),

        }

        console.log(dados);
        console.log(JSON.stringify(dados));

        gICAPI.SetData(dados);
        gICAPI.Action("gerar_media");

    });

    jQuery("#_cadastrar_nota").click(function() {

        var dados = {
            "nome_aluno": jQuery("#_nome_aluno").val(),
            "nota1": jQuery("#_nota1").val(),
            "nota2": jQuery("#_nota2").val(),
            "nota3": jQuery("#_nota3").val(),

        }

        console.log(dados);
        console.log(JSON.stringify(dados));

        gICAPI.SetData(dados);
        gICAPI.Action("cadastrar_nota");

    });

    jQuery("#_pesquisar").click(function() {

        gICAPI.SetData("dados");
        gICAPI.Action("pesquisar");
    });


});

function setMedia(media = 0) {
    jQuery("#_media").val(media);
}

function consultaNota(dados) {
    console.log(dados);

    console.log(dados[0].codigo);

    var lista = '<table class="table">' +
        '    <thead>' +
        '        <tr>' +
        '            <th scope="col">Código</th>' +
        '            <th scope="col">Nome</th>' +
        '            <th scope="col">Nota 1</th>' +
        '            <th scope="col">Nota 2</th>' +
        '            <th scope="col">Nota 3</th>' +
        '            <th scope="col">Média</th>' +
        '            <th scope="col">Modificar notas</th>' +
        '            <th scope="col">Excluir</th>' +
        '        </tr>' +
        '    </thead>' +
        '    <tbody>';

    for (let i = 0; i < dados.length; i++) {

        dados[i].nome_aluno ? undefined : dados[i].nome_aluno = "Nome indefinido"
        dados[i].nome_aluno ? null : dados[i].nome_aluno = "Nome nulo"

        dados[i].media ? undefined : dados[i].media = "Média indefinida"
        dados[i].media ? null : dados[i].media = "média nula"

        lista += '<tr>' +
            '   <td> ' + dados[i].codigo + ' </td>' +
            '   <td> ' + dados[i].nome_aluno + ' </td>' +
            '   <td> ' + dados[i].nota1 + ' </td>' +
            '   <td> ' + dados[i].nota2 + ' </td>' +
            '   <td> ' + dados[i].nota3 + ' </td>' +
            '   <td> ' + dados[i].media + ' </td>' +
            '   <td> <button class="btn btn-success btn-sm _get_notas" " data_value="' + dados[i].codigo + '" data-toggle="modal" data-target="#modificar_notas" > <i class="fa fa-pencil-square-o" aria-hidden="true"></i> </button> </td>' +
            '   <td> <button class="btn btn-danger btn-sm _excluir_notas" " data_value="' + dados[i].codigo + '"> <i class="fa fa-times-circle" aria-hidden="true"></i> </button> </td>' +
            '</tr>';
    }

    lista += '    </tbody>' +
        '</table>';

    jQuery("#divConsultaNota").html(lista);

    jQuery("._excluir_notas").click(function() {
        debugger
        var dado = jQuery(this).attr('data_value');
        gICAPI.SetData(dado);
        gICAPI.Action("excluir_notas");
    });

    jQuery("._get_notas").click(function() {
        debugger
        var dado = jQuery(this).attr('data_value');
        gICAPI.SetData(dado);
        gICAPI.Action("get_dados_aluno");
    });

}

function setDadosAluno(dados) {
    jQuery("#_md_nota1").val(dados.nota1);
    jQuery("#_md_nota2").val(dados.nota2);
    jQuery("#_md_nota3").val(dados.nota3);
    jQuery("#_md_media").val(dados.media);
    jQuery("#_codigo").val(dados.codigo);

    jQuery(".calculaMedia").keyup(function() {

        var nota1 = (jQuery('#_md_nota1').val().length == 0 || jQuery('#_md_nota1').val() == undefined) ? 0 : jQuery('#_md_nota1').val();
        var nota2 = (jQuery('#_md_nota2').val().length == 0 || jQuery('#_md_nota2').val() == undefined) ? 0 : jQuery('#_md_nota2').val();
        var nota3 = (jQuery('#_md_nota3').val().length == 0 || jQuery('#_md_nota3').val() == undefined) ? 0 : jQuery('#_md_nota3').val();

        var media = (parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3)) / 3;
        jQuery("#_md_media").val(media.toFixed(2));
    });

}
