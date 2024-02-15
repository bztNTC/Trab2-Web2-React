import React, { useState, useEffect } from "react";
import Modal from './modal';
import './App.css';

export default function Jogos() {
    const [openModal, setOpenModal] = useState(false);
    const [games, setGames] = useState([]);

    useEffect(() => {
        const storedGames = JSON.parse(localStorage.getItem('games')) || [];
        setGames(storedGames);
    }, []);

    const addGameToList = () => {
        const storedGames = JSON.parse(localStorage.getItem('games')) || [];
        setGames(storedGames);
    };

    const deleteGame = (index) => {
        const updatedGames = games.filter((_, i) => i !== index);
        setGames(updatedGames);
        localStorage.setItem('games', JSON.stringify(updatedGames));
    };

    return (
        <div className="jogos-container">
            <section className="registered-games">
                <h3>Jogos Registrados</h3>
                <div className="games-list-container">
                    <button id="add-game-button" onClick={() => setOpenModal(!openModal)}>Adicionar Jogo</button>
                    <ul id="registered-games-list">
                        {games.map((game, index) => (
                            <li key={index} style={{ color: 'black' }}>
                                <h1 style={{ padding: '0', margin: '0' }}>{game.title}</h1>
                                <p>{game.summary}</p>
                                <button class='btn_dell' onClick={() => deleteGame(index)}>Deletar</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            <Modal isOpen={openModal} setOpenModal={() => setOpenModal(!openModal)} addGameToList={addGameToList} />
        </div>
    );
}
