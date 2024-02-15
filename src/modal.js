import React from "react";
import './modal.css';

const BACKGROUND_STYLE = {
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    backgroundColor: 'rgb(0, 0, 0, 0.7)',
    zIndex: '1000'
};

const MODAL_STYLE = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    padding: '0px 20px 50px 20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '20px',
    textAlign: 'center',
    width: '350px'
};

const MODAL_STYLE_MOBILE = {
    ...MODAL_STYLE,
    width: '90%'
};

export default function Modal({ isOpen, setOpenModal, addGameToList }) {

    const saveGameOnLocalStorage = () => {
        const title = document.getElementById('title').value;
        const summary = document.getElementById('summary').value;

        const storedGames = JSON.parse(localStorage.getItem('games')) || [];

        storedGames.push({ title, summary });

        localStorage.setItem('games', JSON.stringify(storedGames));

        setOpenModal(false);

        addGameToList();
    };

    if (isOpen) {
        return (
            <div style={BACKGROUND_STYLE}>
                <div style={window.innerWidth <= 600 ? MODAL_STYLE_MOBILE : MODAL_STYLE}>
                    <h1>Adicionar novo jogo</h1>
                    <p>Nome do jogo</p>
                    <input id='title' required />
                    <p>Breve resumo</p>
                    <textarea id='summary' required /><br />
                    <button className='btn-cancel' onClick={() => setOpenModal(false)}>Cancelar</button>
                    <button className='btn-add_game' onClick={saveGameOnLocalStorage}>Adicionar Jogo</button>
                </div>
            </div>
        );
    }

    return null;
}
