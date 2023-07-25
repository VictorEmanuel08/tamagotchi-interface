import { useEffect, useState } from "react";
import "../style/index.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import avatar1 from "../assets/avatar1/gif-avatar1.gif";
import avatar2 from "../assets/avatar2/gif-avatar2.gif";
import avatar3 from "../assets/avatar3/gif-avatar3.gif";
import avatarDied from "../assets/avatar-died.png";

export function Page() {
  const photos = [
    {
      index: 0,
      skin: "Anjo 👼",
      img: avatar1,
    },
    { skin: "Marciano 👽", index: 1, img: avatar2 },
    { skin: "Peste negra ☠️", index: 2, img: avatar3 },
  ];

  let nomePet = "Tamagotchi";
  const [felicidadePet, setFelicidadePet] = useState(50);
  const [fomePet, setFomePet] = useState(50);
  const [skinPet, setSkinPet] = useState("Anjo 👼");
  const [roupaPet, setRoupaPet] = useState(avatar1);

  if (fomePet > 100) {
    setFomePet(100);
  }
  if (felicidadePet > 100) {
    setFelicidadePet(100);
  }

  console.log(skinPet);

  function alimentar() {
    setFomePet(fomePet + 15);
    setFelicidadePet(felicidadePet + 5);
  }

  function darCarinho() {
    setFelicidadePet(felicidadePet + 15);
    setFomePet(fomePet - 5);
  }

  function levarPraPassear() {
    setFelicidadePet(felicidadePet + 20);
    setFomePet(fomePet - 10);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function diminuirFelicidadeEFome() {
    setFelicidadePet(felicidadePet - 10);
    setFomePet(fomePet - 10);
  }

  const notify = () => {
    toast.error("Seu bichinho morreu :c \n Reiniciando...", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  // Efeito para chamar a função a cada 5 segundos
  useEffect(() => {
    if (fomePet <= 0 || felicidadePet <= 0) {
      notify();
      setRoupaPet(avatarDied);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
    const intervalId = setInterval(diminuirFelicidadeEFome, 5000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, [fomePet, felicidadePet, diminuirFelicidadeEFome]);

  const handleInfoPet = function (e) {
    const selectedIndex = e.target.value;
    setRoupaPet(photos[selectedIndex].img);
    setSkinPet(photos[selectedIndex].skin);
  };

  return (
    <div className="Page">
      <ToastContainer />
      <div className="imagemBichinho">
        <img src={roupaPet} alt="pou" />
      </div>
      <div className="bichinho">
        <div className="infoBichinho">
          <div>Nome: {nomePet}</div>
          <div>Felicidade: {felicidadePet}</div>
          <div>Fome: {fomePet}</div>
          <div>Skin: {skinPet}</div>
        </div>
        <div className="botoes">
          <button onClick={alimentar}>Alimentar</button>
          <button onClick={darCarinho}>Dar carinho</button>
          <button onClick={levarPraPassear}>Levar pra passear</button>
          <label>
            Mudar roupa:
            <select defaultValue={skinPet} onChange={handleInfoPet}>
              {photos.map((pet, index) => {
                return (
                  <option value={pet.index} key={index}>
                    {pet.skin}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}
