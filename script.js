
// =====================================================
// SISTEMA DE CONSENTIMENTO LGPD
// =====================================================


// 1. Verificar consentimento ao carregar a página

window.addEventListener("load", function () {

    var consentimento = getCookie("consentimento_lgpd");

    if (consentimento) {

        document.getElementById("banner").classList.add("oculto");

        // Recuperar escolhas anteriores
        document.getElementById("chk-analise").checked =
            getCookie("cat_analise") === "sim";

        document.getElementById("chk-marketing").checked =
            getCookie("cat_marketing") === "sim";

        atualizarPainel();

    } else {

        document.getElementById("banner").classList.remove("oculto");

        atualizarPainel();
    }

});


// 2. Aceitar todos os cookies

function aceitarTodos() {

    document.cookie = "consentimento_lgpd=todos; max-age=31536000; path=/; SameSite=Lax";

    document.cookie = "cat_analise=sim; max-age=31536000; path=/; SameSite=Lax";

    document.cookie = "cat_marketing=sim; max-age=31536000; path=/; SameSite=Lax";

    document.getElementById("chk-analise").checked = true;

    document.getElementById("chk-marketing").checked = true;

    fecharBanner();

}


// 3. Aceitar apenas cookies essenciais

function aceitarApenasEssenciais() {

    document.cookie = "consentimento_lgpd=essenciais; max-age=31536000; path=/; SameSite=Lax";

    document.cookie = "cat_analise=nao; max-age=31536000; path=/; SameSite=Lax";

    document.cookie = "cat_marketing=nao; max-age=31536000; path=/; SameSite=Lax";

    document.getElementById("chk-analise").checked = false;

    document.getElementById("chk-marketing").checked = false;

    fecharBanner();

}


// 4. Salvar seleção personalizada

function salvarSelecao() {

    var analise = document.getElementById("chk-analise").checked ? "sim" : "nao";

    var marketing = document.getElementById("chk-marketing").checked ? "sim" : "nao";

    document.cookie = "consentimento_lgpd=custom; max-age=31536000; path=/; SameSite=Lax";

    document.cookie = "cat_analise=" + analise + "; max-age=31536000; path=/; SameSite=Lax";

    document.cookie = "cat_marketing=" + marketing + "; max-age=31536000; path=/; SameSite=Lax";

    fecharBanner();

}


// 5. Fechar banner e atualizar painel

function fecharBanner() {

    document.getElementById("banner").classList.add("oculto");

    atualizarPainel();

}


// 6. Reabrir preferências

function reabrirPreferencias() {

    // Recuperar as escolhas salvas nos cookies
    document.getElementById("chk-analise").checked =
        getCookie("cat_analise") === "sim";

    document.getElementById("chk-marketing").checked =
        getCookie("cat_marketing") === "sim";

    document.getElementById("banner").classList.remove("oculto");

}


// 7. Atualizar painel de status

function atualizarPainel() {

    var analise = getCookie("cat_analise");

    var marketing = getCookie("cat_marketing");

    var statusAnalise = analise === "sim" ? "Ativo" :
        analise === "nao" ? "Bloqueado" : "Não definido";

    var statusMarketing = marketing === "sim" ? "Ativo" :
        marketing === "nao" ? "Bloqueado" : "Não definido";

    document.getElementById("painel-status").innerHTML =

        "<p><strong>Essenciais:</strong> Sempre ativos</p>" +

        "<p><strong>Análise:</strong> " + statusAnalise + "</p>" +

        "<p><strong>Marketing:</strong> " + statusMarketing + "</p>";

}


// 8. Função auxiliar para ler cookies

function getCookie(nome) {

    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {

        var cookie = cookies[i].trim();

        if (cookie.indexOf(nome + "=") === 0) {

            return decodeURIComponent(
                cookie.substring(nome.length + 1)
            );

        }

    }

    return null;

}
