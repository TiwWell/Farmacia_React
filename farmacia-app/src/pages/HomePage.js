import HomeComponent from "../components/Home/HomeComponent"
import farmaceutico1 from '../components/Home/Farmaceutico 1.JPG';
import remedios from '../components/Home/Remedios.jpg';
import cliente from '../components/Home/Cliente.jpg';

const HomePage = () => {
    return (
        <>
        <HomeComponent
            titulo="Aqui é farmacia!"
            descricao="Essa é a home ein "
            imagemUrl={farmaceutico1}
            imagemAlt="Farmaceutica sorrindo"
        />
        <HomeComponent
            titulo="Remedios para melhorar a saúde"
            descricao="Remedios"
            imagemUrl={remedios}
            imagemAlt="Prateleiras de remedios" 
        />
        <HomeComponent
            titulo="Excelencia no atendimento"
            descricao="Cuidado com o cliente"
            imagemUrl={cliente}
            imagemAlt="Cliente sendo atendido"
        />
        </>
    )
}
export default HomePage;