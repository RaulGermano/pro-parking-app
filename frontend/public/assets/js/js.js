$(document).ready(function() {
	$('.example-popover').popover({
		container: 'body'
	});

	$('.popover-dismiss').popover({
		trigger: 'focus'
	});

	$('[data-toggle="tooltip"]').tooltip();

	scrollToTop();
});

function filtroItem(selecao, quant, pesquisa) {
	if ($(selecao).filter().prevObject.length > quant) {
		$(pesquisa).removeClass('d-none');
	}

	$(pesquisa).on('keyup.fcPesquisas input.fcPesquisas', function() {
		var value = $(this)
			.val()
			.stringSemAcentos();

		$(selecao).filter(function() {
			$(this).toggle(
				$(this)
					.text()
					.toLowerCase()
					.indexOf(value) > -1
			);
		});
	});
}

String.prototype.stringSemAcentos = function() {
	var string = this.replace(/^\s+|\s+$/g, '');
	var mapaAcentosHex = {
		a: /[\xE0-\xE6]/g,
		A: /[\xC0-\xC6]/g,
		e: /[\xE8-\xEB]/g,
		E: /[\xC8-\xCB]/g,
		i: /[\xEC-\xEF]/g,
		I: /[\xCC-\xCF]/g,
		o: /[\xF2-\xF6]/g,
		O: /[\xD2-\xD6]/g,
		u: /[\xF9-\xFC]/g,
		U: /[\xD9-\xDC]/g,
		c: /\xE7/g,
		C: /\xC7/g,
		n: /\xF1/g,
		N: /\xD1/g
	};

	for (var letra in mapaAcentosHex) {
		var expressaoRegular = mapaAcentosHex[letra];
		string = string.replace(expressaoRegular, letra);
	}

	string = string
		.split(' ')
		.join('-')
		.toLowerCase();

	return string;
};

function botaoSubirTela(botao) {
	$(document).on('scroll', function() {
		if ($(window).scrollTop() > 100) {
			$(botao).addClass('show');
		} else {
			$(botao).removeClass('show');
		}
	});

	$(botao).on('click', scrollToTop);
}

function scrollToTop() {
	verticalOffset =
		typeof verticalOffset != 'undefined' ? verticalOffset : -50;

	element = $('body');

	offset = element.offset();

	offsetTop = offset.top - 50;

	$('html, body').animate(
		{
			scrollTop: offsetTop
		},
		350,
		'linear'
	);
}

function organizarBlocos(bloco) {
	let titulo = $(bloco).find('.titulo'),
		teste = $('<span>', {
			name: 'teste'
		}),
		botao = $(bloco).children('.box-part');

	$(botao).each(function() {
		$(this).css({
			cursor: 'pointer'
		});

		$(this).on('click', function() {
			var link = $(this)
				.children('a')
				.attr('href');
			window.location.href = link;
		});
	});

	$(bloco).each(function() {
		if ($(this).attr('stts') == 0) {
			let status = $(this).find('i');

			status.removeClass('text-flash');
			status.addClass('text-grey');
			status.parent().attr({
				'data-toggle': 'modal',
				'data-target': '.modulo-desenvolvimento',
				href: '#'
			});
		}
	});

	$(titulo).each(function(index) {
		valor = $(this)
			.text()
			.trim()
			.split(' ');

		if (valor.length == 1) {
			$(this).html(`<span class='opacity fw-700'>${valor}</span>`);
		} else if (valor.length == 2) {
			$(this).html(
				`<span class='opacity-6 fw-100 mr-5px'>${
					valor[0]
				}</span><span class='opacity fw-700'>${valor[1]}</span>`
			);
		} else if (valor.length > 2) {
			let texto = '';

			valor.forEach(item => {
				texto += `<span class='opacity fw-700 mr-5px'>${item}</span>`;
			});

			$(this).html(texto);
		}
	});
}

function ordenarBloco(ordenar) {
	(listado = $(ordenar)),
		(elementos = listado),
		listado.removeClass('d-none');

	elementos.sort(function(a, b) {
		let A = $(a)
				.text()
				.toUpperCase(),
			B = $(b)
				.text()
				.toUpperCase();

		return A < B ? -1 : A > B ? 1 : 0;
	});

	$(elementos).each(function(id, elemento) {
		listado.parent().append($(elemento));
	});
}

function animatesItens(item) {
	item.hide();

	(function animatenext(elem) {
		elem.eq(0).fadeIn(150, function() {
			(elem = elem.slice(1)).length && animatenext(elem);
		});
	})(item);
}

$('.ico').on('input', function() {
	var item = $('.btn-ico i'),
		valor = $(this)
			.val()
			.toLowerCase();

	valor = valor.replace('<i class="', '');
	valor = valor.replace('"></i>', '');
	valor = valor.replace(/[^a-zA-Z. -]/g, '');

	$(this).val(valor);

	$(item).removeClass();

	$('.btn-ico i').addClass(valor, 300);
});

function datatable(tabela, quantidade = 10) {
	$(tabela).DataTable({
		iDisplayLength: quantidade
	});
}

function validBtnSalvarEditBloco(campos, btn) {
	$(campos).on('change, input', function() {
		$(btn).removeAttr('disabled');
	});
}

function maisInformacoes(condicional, elemento) {
	let itens = elemento.children('div').children('div');

	condicional.on('click', function() {
		if ($(this).prop('checked')) {
			elemento.slideToggle(250);

			itens.each(function() {
				$(this)
					.children('input')
					.prop('required', true);
			});
		} else {
			elemento.slideToggle(250);

			itens.each(function() {
				$(this)
					.children('input')
					.val('')
					.prop('required', false);
			});
		}
	});
}

function listaContatos(itens) {
	let mostrarMais = '.mais-lista-contatos';

	$(mostrarMais).addClass('display-none');

	$(itens).each(function() {
		$(this).on('click', function() {
			let item = $(this).attr('item'),
				mais = $('.mais-lista-contatos[id=' + item + ']');

			if ($(mais).hasClass('display-none')) {
				$(mais).removeClass('display-none');
				$(this)
					.children()
					.children()
					.addClass('fa-rotate-180');
			} else {
				$(mais).addClass('display-none');
				$(this)
					.children()
					.children()
					.removeClass('fa-rotate-180');
			}
		});
	});
}

function configurarModalConfirmacao(
	lista,
	icone,
	titulo,
	texto,
	modal,
	pagina,
	nome,
	tipoModal
) {
	// tipoModal = 0: Modal de confirmação simples, sem envio de requisição;
	// tipoModal = 1: Modal de confirmação composta, com envio de requisição.

	$(lista).each(function() {
		$(this).on('click', function() {
			console.log($(this));

			let valor = $(this).attr('stts-valor');

			console.log(valor);

			$(modal).modal({
				show: true
			});

			$(modal)
				.find('.modal-header i')
				.addClass(icone);
			$(modal)
				.find('.modal-title')
				.text(titulo);
			$(modal)
				.find('.modal-body p')
				.text(texto);
			$(modal)
				.find('.modal-footer form')
				.attr('action', pagina);
			if (tipoModal === 0) {
				$(modal)
					.find('button[type="submit"]')
					.remove();
			} else if (tipoModal === 1) {
				$(modal)
					.find('button[type="submit"]')
					.attr({
						value: valor,
						name: nome
					});
			}
		});
	});
}

function configurarModalAvisoGenerico(status, modal, titulo, texto) {
	// tipoModal = 0: Aviso de sucesso;
	// tipoModal = 1: Aviso de atenção.
	// tipoModal = 2: Aviso de erro.

	if (status === 0) {
		$(modal)
			.find('.modal-header i')
			.addClass('fas fa-check-circle text-success');
	} else if (status === 1) {
		$(modal)
			.find('.modal-header i')
			.addClass('fas fa-exclamation-circle text-warning');
	} else if (status === 2) {
		$(modal)
			.find('.modal-header i')
			.addClass('fas fa-exclamation-circle text-danger');
	}
	$(modal)
		.find('.modal-title')
		.text(titulo);

	$(modal)
		.find('.modal-body p')
		.text(texto);

	$(modal).modal({
		show: true
	});
}

function focarCampo(filtro) {
	$(filtro).focus();
}

function focarAgendaTelefonica(lista) {
	$(lista).on('shown.bs.modal', function() {
		focarCampo('#input-filtro-contatos');
	});
}

function focarCampoModal(modal, campo) {
	$(modal).on('shown.bs.modal', function() {
		focarCampo(campo);
	});
}

function liberarBotaoSeNaoVazioSimples(condicional, atualizar) {
	$(atualizar).prop('disabled', true);

	$(condicional).on('input change', function() {
		if ($(this).val().length > 0) {
			$(atualizar).prop('disabled', false);
		} else {
			$(atualizar).prop('disabled', true);
		}
	});
}

function coresStatus(array, local, remover) {
	remover.forEach(classe => {
		$(local).each(function() {
			$(this).removeClass(classe);
		});
	});

	$(local).each(function() {
		for (const key in array) {
			obj = array[key];

			if ($(this).text() == obj.importancia.toUpperCase()) {
				$(this).addClass(obj.classe);
			}
		}
	});
}

function exibirNomeArquivosQuantidade() {
	$('input[type="file"].custom-file-input').each(function() {
		$(this).change(function(e) {
			let text = '',
				fileName = e.target.files,
				quant = fileName.length;

			if (quant > 1) {
				for (const key in fileName) {
					text += fileName[key].name;
				}

				text = `Selecionados: ${quant}.`;
			} else {
				text = fileName[0].name;
			}

			$(this)
				.parent()
				.find('label')
				.text(text);
		});
	});
}

function liberarBotaoFiltro(input, list, button) {
	$(input).on('input.liberarBotaoFiltro', function() {
		if (!$(list).get(0)) {
			$(button).prop('disabled', false);
		} else {
			$(list).each(function() {
				if ($(this).is(':visible')) {
					$(button).prop('disabled', true);
				} else {
					$(button).prop('disabled', false);
				}
			});
		}
	});
}

function limparCamposModalFechada(modal, campos) {
	$(modal).on('hidden.bs.modal', function() {
		for (const key in campos) {
			$(campos[key]).val('');
		}
	});
}

function apagarTextoInput(itens) {
	$(itens).each(function() {
		for (const key in itens) {
			obj = itens[key];

			$(`#${obj}`).val('');
		}
	});
}

function requisicaoAssincrona(url, formato, data) {
	const requis = $.ajax({
		url: url,
		type: 'POST',
		cache: false,
		dataType: formato,
		data: data,

		beforeSend: () => {
			$('#loading-pagina').show();
			$('body').addClass('modal-open');
		},

		complete: () => {
			$('#loading-pagina').hide();
			$('body').removeClass('modal-open');
		},

		error: error => {
			configurarModalAvisoGenerico(
				2,
				'#modal-aviso-generico',
				'Informativo',
				`Ocorreu um erro. Entre em contato com algum desenvolvedor do TI, fazendo um favor.`
			);
		}
	});

	return requis;
}

function completaString(quantidade, numero, valor) {
	const valorAntigo = $(valor).val();
	novoValor = valorAntigo.padStart(quantidade, numero);

	$(valor).val(novoValor);
}

function formatarDataInputDate(data) {
	const dataAntiga = data.replace('-', '/');

	return dataAntiga;
}
