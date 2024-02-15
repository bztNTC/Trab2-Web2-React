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
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [minhasSalas, setMinhasSalas] = useState([]); 

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
                    .then(data => setCidade(data.address.city || ''))
                    .catch(error => console.error('Erro ao obter a cidade:', error));
            });
        }
    }, [usarLocalizacao]);

    useEffect(() => {
        if (!isModalOpen) {
            setCidade('');
            setFormSubmitted(false);
        }
    }, [isModalOpen]);

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

    const handleSalvarSala = (event) => {
        event.preventDefault();
        setFormSubmitted(true); 

        const salaExistente = salas.find(sala => sala.nome === nomeSala);
        if (salaExistente) {
            alert("O nome da sala já está em uso. Por favor, escolha outro nome.");
            return;
        }

        // Salva a nova sala
        const novaSala = { nome: nomeSala, jogo: jogoSelecionado, cidade: cidade };
        const updatedSalas = [...salas, novaSala];
        setSalas(updatedSalas);
        localStorage.setItem('salas', JSON.stringify(updatedSalas));
        setNomeSala('');
        setJogoSelecionado('');
        setCidade('');
        closeModal();
    };

    const handleDeletarSala = (index, isMinhasSalas) => {
        if (isMinhasSalas) {
            const updatedMinhasSalas = minhasSalas.filter((_, i) => i !== index);
            setMinhasSalas(updatedMinhasSalas);
        } else {
            const salaToDelete = salas[index];
            const updatedSalas = salas.filter((_, i) => i !== index);
            setSalas(updatedSalas);
            localStorage.setItem('salas', JSON.stringify(updatedSalas));
    
            const updatedMinhasSalas = minhasSalas.filter(sala => sala !== salaToDelete);
            setMinhasSalas(updatedMinhasSalas);
        }
    };
    
    

    const handleAddCidadeAtual = () => {
        setUsarLocalizacao(!usarLocalizacao);
    
        if (!usarLocalizacao) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                    .then(response => response.json())
                    .then(data => setCidade(data.address.city || ''))
                    .catch(error => console.error('Erro ao obter a cidade:', error));
            });
        } else {
            setCidade(''); 
        }
    };

    const handleEntrarSala = (sala) => {
        const salaExistente = minhasSalas.find(s => s.nome === sala.nome);
        if (salaExistente) {
            alert("Você já está na sala.");
            return;
        }
        setMinhasSalas(prevMinhasSalas => [...prevMinhasSalas, sala]);
    };
    
    return(
        <div className="container">
            <h1>Salas</h1>

            <div className='btn_newRoom'>
                <button onClick={openModal}>Criar Nova Sala</button>
            </div>
            
            {isModalOpen && (
                <div className='bg_modal'>
                    <form onSubmit={handleSalvarSala}>
                        <div className="modal">
                            <h2>Criar Nova Sala</h2>
                            <label>Nome da Sala:</label>
                            <input type="text" value={nomeSala} onChange={handleNomeSalaChange} required />
                            <br/>
                            <label>Jogo:</label>
                            <br/>
                            <select value={jogoSelecionado} onChange={handleJogoChange} required>
                                <option value="">Selecione um jogo</option>
                                {games.map((game, index) => (
                                    <option key={index} value={index}>{game.title}</option>
                                ))}
                            </select>
                            <br/>
                            <label>Cidade:</label>
                            <br/>
                            <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} disabled={usarLocalizacao} required />
                            <button type="button" className='btn_cidade' onClick={handleAddCidadeAtual}>Obter Cidade Atual</button>
                            <div className='ckbx-container'></div>
                            <div>
                                <button className='btn-cancel2' onClick={closeModal}>Cancelar</button>
                                <button type="submit" className='btn-add_room'>Salvar</button>
                            </div>
                        </div>
                    </form>
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
                        <button onClick={() => handleEntrarSala(sala)}>Entrar</button>
                        <button onClick={() => handleDeletarSala(index)}>Deletar</button>
                    </div>
                ))}
            </div>

            <div>
                <h1>Minhas Salas</h1>
                <div className="game-grid">
                    {minhasSalas.map((sala, index) => (
                        <div key={index} className="game-list">
                            <h1>{sala.nome}</h1>
                            <h2>Jogando:</h2>
                            <p>{games[sala.jogo]?.title}</p>
                            <h2>Hospedado em:</h2>
                            <p>{sala.cidade}</p>
                            <button onClick={() => handleDeletarSala(index, true)}>Deletar</button>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
