import React from "react";
import './inicio.css';

export default function Inicio(){

    return(
        <div className="inicio-container">
            <h1>LetsPlay!</h1>

            <p className='inicio'>
                Seja bem-vindo a plataforma LetsPlay! Essa plataforma tem como objetivo ajudar os jogadores dos mais diversos jogos 
                a encontrarem pessoas para jogarem juntos! Explore as abas de Jogos, para encontrar os jogos cadastrados no site ou
                cadastrar algum jogo novo, e a aba de salas, para encontrar todas as salas disponíveis ou criar uma nova sala para jogar com as pessoas!
            </p>

            <br/>

            <p className='inicio'>
                Trabalho desenvolvido para disciplina Desenvolvimento de Software para WEB 2
            </p>
        </div>
    );
}
