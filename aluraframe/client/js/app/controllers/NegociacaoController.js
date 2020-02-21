class NegociacaoController {
    
    constructor() {
        
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        let self = this;

        this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
            
        /*
        O target é o objeto real que é encapsulado pela proxy. É este objeto que não queremos "sujar" com armadilhas ou qualquer código que não diga respeito ao modelo.

        O prop é a propriedade em si, que está sendo lida naquele momento.

        O receiver é a referência ao próprio proxy. É na configuração do handler do Proxy que colocamos armadilhas.
        
        */
            get(target, prop, receiver) {
        
                if(['adiciona', 'esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)) {
        
                    return function(){
        
                      console.log(`método '${prop}' interceptado`);
        
                     Reflect.apply(target[prop], target, arguments);
        
                      self._negociacoesView.update(target);
        
                    }
             }
        
             return Reflect.get(target, prop, receiver);
          }
        });
      
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._negociacoesView.update(this._listaNegociacoes);
        
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);
        
    }
    
    adiciona(event) {

        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        this._mensagemView.update(this._mensagem);
    
        this._limpaFormulario()  
    }

    apaga() {

        this._listaNegociacoes.esvazia();
        // Linha abaixo comentada, não precisamos mais dela
        // this._negociacoesView.update(this._listaNegociacoes);
    
        this._mensagem.texto = "Negociações removidas com sucesso";
        this._mensagemView.update(this._mensagem);
    }
    
    _criaNegociacao() {
        
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);    
    }
    
    _limpaFormulario() {
     
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();   
    }
}