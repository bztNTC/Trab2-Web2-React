import React, { useState, useEffect } from "react";
import './Salas.css'; 

export default function Salas(){

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nomeSala, setNomeSala] = useState('');
    const [jogoSelecionado, setJogoSelecionado] = useState('');
    const [salas, setSalas] = useState([]);
    const [games, setGames] = useState([]);
    const [cidade, setCidade] = useState('');
    const [usarLocalizacao, setUsarLocalizacao] = useState(false);

    useEffect(() => {
        const storedSalas = JSON.parse(localStorage.getItem('salas')) || [];
        setSalas(storedSalas);
        
        const storedGames = JSON.parse(localStorage.getItem('games')) || [];
        setGames(storedGames);

        if (usarLocalizacao) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                    .then(response => response.json())
                    .then(data => setCidade(data.address.city))
                    .catch(error => console.error('Erro ao obter a cidade:', error));
            });
        }
    }, [usarLocalizacao]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleNomeSalaChange = (event) => {
        setNomeSala(event.target.value);
    };

    const handleJogoChange = (event) => {
        setJogoSelecionado(event.target.value);
    };

    const handleSalvarSala = () => {
        const novaSala = { nome: nomeSala, jogo: jogoSelecionado, cidade: cidade };
        const updatedSalas = [...salas, novaSala];
        setSalas(updatedSalas);
        localStorage.setItem('salas', JSON.stringify(updatedSalas));
        setNomeSala('');
        setJogoSelecionado('');
        setCidade('');
        closeModal();
    };

    const handleDeletarSala = (index) => {
        const updatedSalas = salas.filter((_, i) => i !== index);
        setSalas(updatedSalas);
        localStorage.setItem('salas', JSON.stringify(updatedSalas));
    };
    
    return(
        <div className="container">

            <h1>Salas</h1>

            <div className='btn_newRoom'>
            <button onClick={openModal}>Criar Nova Sala</button>
            </div>
            
            {isModalOpen && (
                <div className='bg_modal'>
                    <div className="modal">
                        <h2>Criar Nova Sala</h2>
                        <label>Nome da Sala:</label>
                        <input type="text" value={nomeSala} onChange={handleNomeSalaChange} />
                        <br/>
                        <label>Jogo:</label>
                        <br/>
                        <select value={jogoSelecionado} onChange={handleJogoChange}>
                            <option value="">Selecione um jogo</option>
                            {games.map((game, index) => (
                                <option key={index} value={index}>{game.title}</option>
                                ))}
                        </select>
                        <br/>
                        <label>Cidade:</label>
                        <br/>
                        {usarLocalizacao ? (
                            <input type="text" value={cidade} disabled />
                            ) : (
                                <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                                )}
                        <div className='ckbx-container'>
                            <input className='ckbx' type="checkbox" checked={usarLocalizacao} onChange={() => setUsarLocalizacao(!usarLocalizacao)} />
                            <label className='ckbx_lbl'>Usar Localização Automática</label>
                        </div>
                        <div>
                            <button className='btn-cancel2' onClick={closeModal}>Cancelar</button>
                            <button className='btn-add_room' onClick={handleSalvarSala}>Salvar</button>
                        </div>
                    </div >
                </div>
            )}

            <div className="game-grid">
                {salas.map((sala, index) => (
                    <div key={index} className="game-list">
                        <h1>{sala.nome}</h1>
                        <h2>Jogando:</h2>
                        <p>{games[sala.jogo]?.title}</p>
                        <h2>Hospedado em:</h2>
                        <p>{sala.cidade}</p>
                        <button onClick={() => handleDeletarSala(index)}>Deletar</button>
                    </div>
                ))}
            </div>

        </div>
    );
}
