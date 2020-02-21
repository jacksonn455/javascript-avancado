class ProxyFactory{

    static create(objeto, props, acao){

        return new Proxy(new ListaNegociacoes(), {
            
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
            
                        return acao(target);
            
                        }
                 }
            
                 return Reflect.get(target, prop, receiver);
              }
            });

    }

}