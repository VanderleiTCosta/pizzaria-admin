import { createContext, useEffect, useState } from "react";
import axios from "axios";
import io from 'socket.io-client'; // Importa o socket.io-client

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [professional_list, setProfessionalList] = useState([]);
    const [category_list, setCategoryList] = useState([]);
    const [state_list, setStateList] = useState([]);
    const url = "https://project-server-vlsp.onrender.com"; // Sua URL de produção

    const fetchProfessionalList = async () => {
        try {
            const response = await axios.get(`${url}/api/professional/list`);
            setProfessionalList(response.data.data);
        } catch (error) {
            console.error("Erro ao buscar a lista de profissionais:", error);
        }
    };

    const fetchCategoryList = async () => {
        try {
            const response = await axios.get(`${url}/api/category/list`);
            setCategoryList(response.data.data);
        } catch (error) {
            console.error("Erro ao buscar a lista de categorias:", error);
        }
    };

    const fetchStateList = async () => {
        try {
            const response = await axios.get(`${url}/api/state/list`);
            setStateList(response.data.data);
        } catch (error) {
            console.error("Erro ao buscar a lista de estados:", error);
        }
    };

    useEffect(() => {
        // Função para carregar os dados iniciais
        async function loadData() {
            await fetchProfessionalList();
            await fetchCategoryList();
            await fetchStateList();
        }
        loadData();

        // Conecta ao servidor Socket.IO
        const socket = io.connect(url);

        // Ouve o evento 'data_updated' vindo do backend
        socket.on('data_updated', () => {
            console.log("Recebido evento de atualização, buscando novos dados...");
            // Quando o evento é recebido, busca todas as listas novamente
            loadData();
        });

        // Limpeza: desconecta quando o componente for desmontado
        return () => {
            socket.disconnect();
        };
    }, []); // O array vazio garante que isso rode apenas uma vez

    const contextValue = {
        professional_list,
        category_list,
        state_list,
        url,
        fetchProfessionalList,
        fetchCategoryList,
        fetchStateList
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;