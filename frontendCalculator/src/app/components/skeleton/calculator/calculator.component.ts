import {Component, ElementRef, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

    public displayText: string = '';
    public hasResult: boolean = false;
    public simbolExpecial: string = '';
    public addNumber1: number = 0;
    public addNumber2: number = 0;

    constructor() {}

    ngOnInit(): void {
    }

    @HostListener('document:keypress', ['$event'])
        handleKeyboardEvent(event: KeyboardEvent): void {

        event.preventDefault(); // Tira o foco do botão clicado


        let keyboardValue: string = event.key; // Definindo uma variavel chamada keyboardValue e setando o valor para ela
        // console.log(keyboardValue);

        let arrayOperation: string[] = ['-','+','/','*']; // Criando um Array chamado arrayOperation e setando valores de simbologia a ele
        let arrayNumber: string[] = ['1','2','3','4','5','6','7','8','9','0']; // Criando um Array cahamdo arrayNumber setando valores numeráis

        if (keyboardValue == 'Enter'){ // Vai efetuar o essa função o Enter seja pressionado
            this.calc(); // Chama a função Calc
            return; //sai aqui
        }
        if (arrayOperation.indexOf(keyboardValue) >= 0) { // Vai efetuar o essa função caso algum simbolo do arrayOperation seja pressionado.
            //O Index vai buscar a posição do simbolo pressionado verificando se é maior ou igual a 0
            this.expecialsimbol(keyboardValue);// vai retornar o expecialsimbol com o valor pressionado (keyboardValue)
            return; //sai aqui
        }
        if (arrayNumber.indexOf(keyboardValue) >= 0) {// Vai efetuar o essa função caso algum simbolo do arrayOperation seja pressionado.
            //O Index vai buscar a posição do simbolo pressionado verificando se é maior ou igual a 0
            this.setDisplayTextValue(keyboardValue);// vai retornar o expecialsimbol com o valor pressionado (keyboardValue)
            return; //sai aqui
        }
    }
    setDisplayTextValue(value: string): void { //printar na tela
        // console.log('setDisplayTextValue')
        // console.log('this.contResult ' +this.hasResult)
        if (this.hasResult) {
            // console.log('reset 49')
            // console.log('hasResult ' + this.hasResult)
            this.reset();
        }
        // this.displayText = '';
        // console.log('n1 ' + this.addNumber1)
        this.displayText = this.concatDisplayText(value); //Retornando o valor concatenado
            // console.log(value)
            // console.log('aki')
        if (this.simbolExpecial != ''){ //Caso tenha sido pressionado um simbolo matemático, addNumber2 começa a receber o texto digitado deixando salvo a primeira parte no addNumbe1
            this.addNumber2 = parseFloat(this.displayText)

        }
        //this.calc();
    }

    reset(): void{ // Resetando todas as operações, voltando a estaca 0
        console.log('reset ')
        this.displayReset();
        this.hasResult = false;
        this.simbolExpecial = '';
        this.addNumber1 = 0;
        this.addNumber2 = 0;

    }

    concatDisplayText(text: string): string { //concatenar

        return this.displayText + text; // está retornando e somando as string digitadas

    }

    expecialsimbol(operator: string){
        this.simbolExpecial = operator // Está passando a informação do operador para dentro do simbolExpecial
        this.addNumber1 = this.displayText != '' ? parseFloat(this.displayText) : this.addNumber1; //Está salvando o valor na tela dentro do "addNumber1"
        this.hasResult = false;
        this.displayReset(); // chamando o reset do display
       // this.displayText = ((this.addNumber1).toString() + this.simbolExpecial);
    }

    displayReset(): void {
        this.displayText = ''; // vai restar o display deixando sem informação na tela
    }

    calc(): void {

         // console.log(this.simbolExpecial)
         // console.log(this.addNumber1)
         // console.log(this.addNumber2)

        let result: number = 0; // Criando o variavel resultado e setando ela em 0

        switch (this.simbolExpecial){ //Vai verificar o sinal e fazer o calculo
            case '+':
                result = this.addNumber1 + this.addNumber2;
                break;
            case '-':
                result = this.addNumber1 - this.addNumber2;
                break;
            case '/':
                result = this.addNumber1 / this.addNumber2;
                break;
            case '*':
                result = this.addNumber1 * this.addNumber2;
                break;
            case '%':
                result = (this.addNumber1 + this.addNumber2) / 100;
                break;
            case '√':
                result = Math.sqrt(this.addNumber1);
                break;
            default:
                break;
        }

        this.displayReset();
        this.simbolExpecial =''; // Zerando o simbolo que foi colocado
        this.setDisplayTextValue(this.simbolExpecial == '√' ? result.toFixed(4) :  result.toString()); // Se for raiz vai tirar 4 casas
        this.addNumber1 = result; // addNumber1 recebendo o valor do resultado para caso queira continuar calculando com o resultado
        this.hasResult = true; // Resetando toda a operação
    }
}