import { useState } from "react";
import { Input } from "../../components/Input";
import { Container, Form, FormTitle, Section, MapContainer, CategoryContainer, CategoryBox, CategoryImage, ButtonContainer, Button } from "./styles";
import { Marker, TileLayer } from "react-leaflet";
import { LatLngExpression, LeafletMouseEvent } from "leaflet";
import { categories } from "./categories";
import useGetLocation from "../../hooks/useGetLocation/useGetLocation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function New(){
    const history = useNavigate();

    const [formValues, setFormValues] = useState({
        name:"",
        description:"",
        contact:"",
        category:"",
        coords: [0, 0]
    });

    const onSubmit = async() =>{
        const req = await fetch('http://localhost:3000/store', {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                ...formValues,
                latitude:formValues.coords[0],
                longitude:formValues.coords[1]
            })
        })

        if(req.ok){
            toast("Estabelecimento gravado com sucesso!",{
                type:"success",
                autoClose:2000,
                onClose: () => history('/'),
            })
        }
    }

    const { coords } = useGetLocation();

    if (!coords) {
        return <h1>Obtendo Localização</h1>
    }
    
    return(
        <Container>
            <Form onSubmit={(ev) => {
                ev.preventDefault();
                onSubmit();
            }}>
                <FormTitle>
                    Cadastro de Loja
                </FormTitle>
                <Section>
                    Dados
                </Section> 

                <Input 
                    label="Nome do Local" 
                    name="name" 
                    value={formValues.name} 
                    onChange={setFormValues}
                />

                <Input 
                    label="Descrição" 
                    name="description" 
                    value={formValues.description} 
                    onChange={setFormValues}
                />

                <Input 
                    label="Contato" 
                    name="contact" 
                    value={formValues.contact} 
                    onChange={setFormValues}
                />

                <Section>Endereço</Section>
                <MapContainer center={{
                    lat: coords[0],
                    lng: coords[1]
                } as LatLngExpression}
                zoom={13}
                ref ={(map)=>{map?.addEventListener('click', (event: LeafletMouseEvent)=>{
                    setFormValues(prev => ({
                        ...prev,
                        coords:[event.latlng.lat, event.latlng.lng],
                    }))
                })}}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[formValues.coords[0], formValues.coords[1]] as LatLngExpression}/>

                </MapContainer>

                <CategoryContainer>
                    {categories.map(category=>(
                        <CategoryBox
                            key={category.key}
                            onClick={()=>{setFormValues((prev)=>({...prev, category: category.key}))}}
                            isActive={formValues.category === category.key}
                        >
                            <CategoryImage src={category.url}/>
                            {category.label}
                        </CategoryBox>
                    ))}
                </CategoryContainer>    
            
                <ButtonContainer>
                    <Button type="submit">
                        Salvar
                    </Button>
                </ButtonContainer>
            </Form>
        
        </Container>
    );
}