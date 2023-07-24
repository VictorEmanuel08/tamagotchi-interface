import { useEffect, useState } from "react";
import "../style/index.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import pouExercito from "../assets/exercito.png";
import pouTerno from "../assets/terno.png";

export function Page() {
  const photos = [
    {
      index: 0,
      emoji: "😃",
      img: "https://play-lh.googleusercontent.com/xToRFw-mqA18HtizgutV0K1IouakfR8iJ3PW75u-1n1oxbP7hVfBMlgHWIwuUYKKS_s",
    },
    { emoji: "❤️", index: 1, img: pouTerno },
    { emoji: "😂", index: 2, img: pouExercito },
  ];

  let nomePet = "Tamagotchi";
  const [felicidadePet, setFelicidadePet] = useState(50);
  const [fomePet, setFomePet] = useState(50);
  const [emojiPet, setEmojiPet] = useState("😃");
  const [roupaPet, setRoupaPet] = useState(
    "https://play-lh.googleusercontent.com/xToRFw-mqA18HtizgutV0K1IouakfR8iJ3PW75u-1n1oxbP7hVfBMlgHWIwuUYKKS_s"
  );

  if (fomePet > 100) {
    setFomePet(100);
  }
  if (felicidadePet > 100) {
    setFelicidadePet(100);
  }

  console.log(emojiPet)

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
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
    const intervalId = setInterval(diminuirFelicidadeEFome, 5000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, [fomePet, felicidadePet]);

  const handleInfoPou = function (e) {
    const selectedIndex = e.target.value;
    setRoupaPet(photos[selectedIndex].img);
    setEmojiPet(photos[selectedIndex].emoji);
  };
  

  return (
    <div className="Page">
      <ToastContainer />
      <div className="bichinho">
        <div className="imagemBichinho">
          <img src={roupaPet} alt="pou" />
        </div>
        <div className="infoBichinho">
          <p>nome: {nomePet}</p>
          <p>felicidadePet: {felicidadePet}</p>
          <p>fome: {fomePet}</p>
          <p>emoji: {emojiPet}</p>
        </div>
      </div>
      <div className="botoes">
        <button onClick={alimentar}>Alimentar</button>
        <button onClick={darCarinho}>Dar carinho</button>
        <button onClick={levarPraPassear}>Levar pra passear</button>
        <label>
          Mudar roupa:
          <select defaultValue={emojiPet} onChange={handleInfoPou}>
            {photos.map((pou, index) => {
              return <option value={pou.index} key={index}>{pou.emoji}</option>;
            })}
          </select>
        </label>
      </div>
    </div>
  );
}
