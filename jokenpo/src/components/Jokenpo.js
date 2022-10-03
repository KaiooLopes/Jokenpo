import './Jokenpo.css';
import React, {useRef, useState} from 'react';

const Jokenpo = () => {
    const element = useRef();
    const select = useRef();

    const [botPoint, setBotPoint] = useState(0);
    const [userPoint, setUserPoint] = useState(0);
     
    const handleStart = () => {
        if(!element.current.value){
            element.current.value = valorComputado();
            resultado(select.current.value);
        }
    }

    const handleReset = () => {
        setBotPoint(0)
        setUserPoint(0)
    }

    const valorComputado = () => {
        let randomNumber = parseInt((Math.random() * 3) + 1);
        switch(randomNumber){
            case 1: return "Tesoura";
            case 2: return "Papel";
            case 3: return "Pedra";
            default: return "";
        }
    }

    const resultado = (jogadaDoUsuario) => {
        switch(jogadaDoUsuario){
            case "Papel":
                papel(jogadaDoUsuario);
                break;
            case "Tesoura":
                tesoura(jogadaDoUsuario);
                break;
            case "Pedra":
                pedra(jogadaDoUsuario);
                break;
            default: 
                console.log("error")
        }
    }

    const papel = (jogadaDoUsuario) => {
        if(element.current.value === "Tesoura"){
            botGanhador();
        }
        if(element.current.value === "Papel"){
            empate();
        }
        if(element.current.value === "Pedra"){
            usuarioGanhador();
        }
    }

    const tesoura = (jogadaDoUsuario) => {
        if(element.current.value === "Tesoura"){
            empate();
        }
        if(element.current.value === "Papel"){
            usuarioGanhador();
        }
        if(element.current.value === "Pedra"){
            botGanhador();
        }
    }

    const pedra = (jogadaDoUsuario) => {
        if(element.current.value === "Tesoura"){
            usuarioGanhador();
        }
        if(element.current.value === "Papel"){
            botGanhador();
        }
        if(element.current.value === "Pedra"){
            empate();
        }
    }

    const botGanhador = () => {
        const color = setTimeout(() => {
            element.current.style = "background-color: green;"
            select.current.style = "background-color: red;"
            setBotPoint(botPoint + 1);
        },0)

        setTimeout(() => {
            element.current.style = "background-color: none;"
            select.current.style = "background-color: none;"
            element.current.value = ""
            clearTimeout(color)
        },1000)
    }

    const usuarioGanhador = () => {
        const color = setTimeout(() => {
            element.current.style = "background-color: red;"
            select.current.style = "background-color: green;"
            setUserPoint(userPoint + 1);
        },0)

        setTimeout(() => {
            element.current.style = "background-color: none;"
            select.current.style = "background-color: none;"
            element.current.value = ""
            clearTimeout(color)
        },1000) 
    }

    const empate = () => {
        const color = setTimeout(() => {
            element.current.style = "background-color: yellow;"
            select.current.style = "background-color: yellow;"
        },0)

        setTimeout(() => {
            element.current.style = "background-color: none;"
            select.current.style = "background-color: none;"
            element.current.value = ""
            clearTimeout(color)
        },1000) 
    }

  return (
    <div>
        <h1 className='title'>Jokenpo</h1>
        <div className='placar'>
            <span>{userPoint} : {botPoint}</span>
        </div>
        <div className='game'>
            <select className='input' ref={select}>
                <option className='tesoura'>Tesoura</option>
                <option className='pedra'>Pedra</option>
                <option className='papel'>Papel</option>
            </select>
            <span>X</span>
            <input type="text" ref={element} readOnly/>
        </div>
        <div className='play'>
            <button onClick={handleStart}>Jogar!</button>
            <button onClick={handleReset}>Resetar!</button>
        </div>
    </div>
  )
}

export default Jokenpo;