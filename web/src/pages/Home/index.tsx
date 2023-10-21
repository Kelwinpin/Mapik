import { Link } from "react-router-dom";
import { Button, ButtonBox, Container, LeftContainer, RightContainer, Subtitle, Title, Image } from "./styles";

export default function Home(){
    return(
        <Container>
            <LeftContainer>
                <Title>O mapa de local de sua cidade</Title>
                <Subtitle>Encontre tudo que precisa!</Subtitle>
                <Link to="/new">
                    <Button>
                        <ButtonBox>{">"}</ButtonBox>
                        Cadastre um ponto comercial
                    </Button>
                </Link>
            </LeftContainer>
            <RightContainer>                
                <Image />
            </RightContainer>
        </Container>
    );
}