import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  resultado: string = '0';
  checa_operador: boolean = false;
  comeca_segundo_elemento: boolean = false;
  primeiro_elemento: string = '';
  segundo_elemento: string = '';
  operador_selecionado: string = '';
  memoria: string = '-';
  reiniciar: boolean = false;
  ponto_colocado: boolean = false;

  constructor() { }

  digito(valor: string) {
    if (this.reiniciar) {
    this.redefinir();
    }
      //sistema para verificar se é permitido colocar . na conta
      if (valor != "." || (valor == "." && !this.ponto_colocado)) {

        //o próximo . colocado na conta será ignorado
        if (valor == ".") { this.ponto_colocado = true}

      if (this.comeca_segundo_elemento) {

        //comando para adicionar 0 na frente do . no começo
        if(valor == '.' && this.segundo_elemento == '') {
          this.segundo_elemento = 0 + '.';
          this.resultado = this.resultado + 0 + '.';
        } else {

          //escrevendo o segundo elemento
        this.segundo_elemento = this.segundo_elemento + valor;
        this.resultado = this.resultado + valor;
        }
      } else {
        if (this.resultado == "0") {

          //comando para adicionar 0 na frente do . (só que no primeiro resultado agora)
          if(valor == '.' && this.primeiro_elemento == '') {
            this.primeiro_elemento = 0 + '.';
            this.resultado = this.resultado +'.';
          }else {
          this.resultado = valor;
          }
        } else {

          //primeiro elemento
          this.resultado = this.resultado + valor;
        }
      }
   }
  }


  operador(valor: string) {
    //comando de operador padrão
    if (!this.checa_operador) {
      this.primeiro_elemento = this.resultado;
      this.resultado += valor;
      this.checa_operador = true;
      this.comeca_segundo_elemento = true;
      this.operador_selecionado = valor;
      this.ponto_colocado = false;
    } else if (this.primeiro_elemento == this.resultado) {

      //comando de operador caso seja pressionado após o = ou após a raiz
      this.resultado += valor;
      this.checa_operador = true;
      this.comeca_segundo_elemento = true;
      this.operador_selecionado = valor;
      this.reiniciar = false;
      this.ponto_colocado = false;
    }
  }

  raiz() {

    //comando de raiz padrão
    if (!this.checa_operador) {
      this.primeiro_elemento = this.resultado;
      this.checa_operador = true;
      this.operador_selecionado = '√';
      this.resultado = Math.sqrt((parseFloat(this.primeiro_elemento))).toString();
      this.memoria = this.operador_selecionado + this.primeiro_elemento +  " = " + this.resultado;
      this.primeiro_elemento = this.resultado;
      this.reiniciar = true;
      this.ponto_colocado = false;
    } else if (this.primeiro_elemento == this.resultado) {

      //comando de raiz caso seja pressionada após um = ou outra raiz
      this.checa_operador = true;
      this.operador_selecionado = '√';
      this.resultado = Math.sqrt((parseFloat(this.primeiro_elemento))).toString();
      this.memoria = this.operador_selecionado + this.primeiro_elemento +  " = " + this.resultado;
      this.primeiro_elemento = this.resultado;
      this.reiniciar = true;
      this.ponto_colocado = false;
    }
  }

  //zera tudo
  redefinir() {
    this.resultado = "0";
    this.checa_operador = false;
    this.primeiro_elemento = '';
    this.segundo_elemento = '';
    this.operador_selecionado = '';
    this.comeca_segundo_elemento = false;
    this.memoria = '-';
    this.reiniciar = false;
    this.ponto_colocado = false;
  }

  //se repete tanto no "calcular" que eu resolvi fazer isso
  setup() {
      this.primeiro_elemento = this.resultado;
      this.segundo_elemento = '';
      this.reiniciar = true;
      this.ponto_colocado = false;
  }

  calcular() {
    if (this.operador_selecionado == "+" && this.segundo_elemento != "") {
      this.resultado = (parseFloat(this.primeiro_elemento) + parseFloat(this.segundo_elemento)).toString();
      this.memoria = this.primeiro_elemento + this.operador_selecionado + this.segundo_elemento + " = " + this.resultado;
      this.setup();
    } else if (this.operador_selecionado == "-" && this.segundo_elemento != "") {
      this.resultado = (parseFloat(this.primeiro_elemento) - parseFloat(this.segundo_elemento)).toString();
      this.memoria = this.primeiro_elemento + this.operador_selecionado + this.segundo_elemento + " = " + this.resultado;
      this.setup();
    } else if (this.operador_selecionado == "*" && this.segundo_elemento != "") {
      this.resultado = (parseFloat(this.primeiro_elemento) * parseFloat(this.segundo_elemento)).toString();
      this.memoria = this.primeiro_elemento + this.operador_selecionado + this.segundo_elemento + " = " + this.resultado;
      this.setup();
    } else if (this.operador_selecionado == "/" && this.segundo_elemento != "") {
      this.resultado = (parseFloat(this.primeiro_elemento) / parseFloat(this.segundo_elemento)).toString();
      this.memoria = this.primeiro_elemento + this.operador_selecionado + this.segundo_elemento + " = " + this.resultado;
      this.setup();
    }else if (this.operador_selecionado == "%" && this.segundo_elemento != "") {
      this.resultado = ((parseFloat(this.segundo_elemento) / 100) * parseFloat(this.primeiro_elemento)).toString();
      this.memoria = this.primeiro_elemento + this.operador_selecionado + " de " + this.segundo_elemento + " = " + this.resultado;
      this.setup();
    }else if (this.operador_selecionado == "Xˣ" && this.segundo_elemento != "") {
      this.resultado = (parseFloat(this.primeiro_elemento) ** parseFloat(this.segundo_elemento)).toString();
      this.memoria = this.primeiro_elemento + " elevado a " + this.segundo_elemento + " = " + this.resultado;
      this.setup();
    }
  }
}