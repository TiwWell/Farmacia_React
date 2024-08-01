import HomeComponent from "../components/Home/HomeComponent"
import farmaceutico1 from '../components/Home/Farmaceutico 1.JPG';
import remedios from '../components/Home/Remedios.jpg';
import cliente from '../components/Home/Cliente.jpg';

const HomePage = () => {
    return (
        <>
        <HomeComponent
            titulo="Boas-Vindas!"
            descricao="Estamos felizes em ter você conosco e dedicados a oferecer a melhor experiência em saúde e bem-estar. Navegue pelo nosso site e descubra como podemos ajudar a cuidar da sua saúde com atenção e carinho"
            imagemUrl={farmaceutico1}
            imagemAlt="Farmaceutica sorrindo"
        />
        <HomeComponent
            titulo="Produtos de Saúde de Alta Qualidade"
            descricao="Oferecemos uma ampla gama de produtos de saúde e medicamentos com a mais alta qualidade e segurança. Trabalhamos com marcas renomadas e garantimos que todos os nossos produtos atendam aos mais rigorosos padrões de eficácia e segurança para seu bem-estar."
            imagemUrl={remedios}
            imagemAlt="Prateleiras de remedios" 
        />
        <HomeComponent
            titulo="Excelência no Atendimento ao Cliente"
            descricao="Comprometidos com a qualidade do atendimento, garantimos um serviço personalizado e eficiente para atender todas as suas necessidades farmacêuticas. Nossa equipe está treinada para fornecer conselhos profissionais e suporte de primeira classe em cada interação."
            imagemUrl={cliente}
            imagemAlt="Cliente sendo atendido"
        />
        </>
    )
}
export default HomePage;