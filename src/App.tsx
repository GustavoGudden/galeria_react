import { useState, FormEvent } from "react";
import { useEffect } from "react";
import {
  Area,
  Container,
  Header,
  PhotoList,
  ScreenWaring,
  UploandForm,
} from "./styles";
import * as Photos from "./services/fotos";
import { Photo } from "./types/fototype";
import { PhotoItem } from "./components/fotoitem";

function App() {
  const [up, setup] = useState(false);
  const [loading, setloading] = useState(false);
  const [photos, setphotos] = useState<Photo[]>([]);

  useEffect(() => {
    getPhotos();
  }, []);

  const getPhotos = async () => {
    setloading(true);
    setphotos(await Photos.getAll());
    setloading(false);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get("image") as File;

    if (file && file.size > 0) {
      setloading(true);
      let result = await Photos.insert(file);
      setloading(false);

      if (result instanceof Error) {
        alert(`${result.name} - ${result.message}`);
      } else {
        let newPhotoList = [...photos];
        newPhotoList.push(result);
        setphotos(newPhotoList);
      }
    }
  };

  return (
    <Container>
      <Area>
        <Header className="header">galeria de fotos</Header>

        <UploandForm method="POST" onSubmit={handleFormSubmit}>
          <input type="file" name="image" />
          <input type="submit" value="Enviar" />
          {up && "Enviando..."}
        </UploandForm>

        {loading && (
          <ScreenWaring>
            <div className="emoji">🤚</div>
            <div>carregando ...</div>
          </ScreenWaring>
        )}

        {!loading && photos.length > 0 && (
          <PhotoList>
            {photos.map((item, index) => (
              <PhotoItem key={index} url={item.url} name={item.name} />
            ))}
          </PhotoList>
        )}

        {!loading && photos.length === 0 && (
          <ScreenWaring>
            <div className="emoji">😥</div>
            <div>Nao ha fotos cadastradas</div>
          </ScreenWaring>
        )}
      </Area>
    </Container>
  );
}

export default App;
