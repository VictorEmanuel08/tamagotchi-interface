import "../style/index.scss";
import { useEffect, useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IoHappyOutline, IoFastFoodOutline } from "react-icons/io5";
import { FaHandHoldingHeart } from "react-icons/fa";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { MdOutlineDirectionsBike } from "react-icons/md";

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

  const [nomePet, setNomePet] = useState("");
  const [felicidadePet, setFelicidadePet] = useState(50);
  const [fomePet, setFomePet] = useState(50);
  const [skinPet, setSkinPet] = useState("Anjo 👼");
  const [roupaPet, setRoupaPet] = useState(avatar1);

  const [isOpenModalName, setIsOpenModalName] = useState(true);
  const [isOpenModalDied, setIsOpenModalDied] = useState(false);

  function closeModalImage() {
    setIsOpenModalName(false);
  }
  function closeModalDied() {
    setIsOpenModalDied(false);
    window.location.reload();
  }

  if (fomePet > 100) {
    setFomePet(100);
  }
  if (felicidadePet > 100) {
    setFelicidadePet(100);
  }

  function alimentar() {
    setFomePet(fomePet + 10);
    setFelicidadePet(felicidadePet + 5);
  }

  function darCarinho() {
    setFomePet(fomePet - 5);
    setFelicidadePet(felicidadePet + 10);
  }

  function levarPraPassear() {
    setFomePet(fomePet - 10);
    setFelicidadePet(felicidadePet + 20);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function diminuirFelicidadeEFome() {
    setFomePet(fomePet - 10);
    setFelicidadePet(felicidadePet - 10);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const notify = () => {
    toast.error(
      `${nomePet} morreu :c
      Reinicie e vamos jogar novamente.`,
      {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // Quebra de linha
        style: {
          whiteSpace: "pre-line",
        },
      }
    );
  };

  const [hasDiedToastShown, setHasDiedToastShown] = useState(false);

  useEffect(() => {
    if (fomePet <= 0 || felicidadePet <= 0) {
      if (!hasDiedToastShown) {
        notify();
        setHasDiedToastShown(true);
      }
      setRoupaPet(avatarDied);
      setTimeout(() => {
        setIsOpenModalDied(true);
      }, 1500);
    }

    //quando o modal do nome for fechado, a diminuição iniciará
    if (!isOpenModalName) {
      // Efeito para chamar a função a cada 10 segundos
      const intervalId = setInterval(diminuirFelicidadeEFome, 1000000);

      // Limpa o intervalo quando o componente é desmontado
      return () => clearInterval(intervalId);
    }
  }, [
    fomePet,
    felicidadePet,
    diminuirFelicidadeEFome,
    hasDiedToastShown,
    notify,
    isOpenModalName,
  ]);

  const handleInfoPet = function (e) {
    const selectedIndex = e.target.value;
    setRoupaPet(photos[selectedIndex].img);
    setSkinPet(photos[selectedIndex].skin);
  };

  const handleChangeName = (e) => {
    const namePet = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
    setNomePet(namePet.toUpperCase());
  };

  return (
    <div className="Page">
      <ToastContainer />

      <div
        className="bichinho"
        //Quando o modal do nome estiver aperto,
        //tudo ao fundo ficará borrado
        style={{
          filter: isOpenModalName === true ? "blur(5px)" : "none",
        }}
      >
        <div className="nomeBichinho">{nomePet}</div>
        <div className="infoBichinho">
          <div className="progress-bar">
            <div
              className="bar"
              style={{
                width: `${felicidadePet}%`,
                background:
                  felicidadePet <= 30
                    ? "linear-gradient(45deg, #FF0000,#FF4500)"
                    : felicidadePet <= 45
                    ? "linear-gradient(45deg, #FF5733, #FFC300)"
                    : felicidadePet <= 55
                    ? "linear-gradient(45deg, #FFC300, #4caf50)"
                    : "linear-gradient(45deg, #4caf50, #8bc34a)",
              }}
            >
              <IoHappyOutline className="icon" />
            </div>
          </div>
          <div className="progress-bar">
            <div
              className="bar"
              style={{
                width: `${fomePet}%`,
                background:
                  fomePet <= 30
                    ? "linear-gradient(45deg, #FF0000,#FF4500)"
                    : fomePet <= 45
                    ? "linear-gradient(45deg, #FF5733, #FFC300)"
                    : fomePet <= 55
                    ? "linear-gradient(45deg, #FFC300, #4caf50)"
                    : "linear-gradient(45deg, #4caf50, #8bc34a)",
              }}
            >
              <IoFastFoodOutline className="icon" />
            </div>
          </div>
        </div>
        <div className="containerBichinho">
          <div className="botoes">
            <div
              className="botaoBichinho"
              onClick={fomePet === 100 ? null : alimentar}
              style={{
                cursor: fomePet === 100 ? "not-allowed" : "pointer",
              }}
            >
              Alimentar <CgSmartHomeRefrigerator />
            </div>
            <div
              className="botaoBichinho"
              onClick={felicidadePet === 100 ? null : darCarinho}
              style={{
                cursor: felicidadePet === 100 ? "not-allowed" : "pointer",
              }}
            >
              Dar carinho <FaHandHoldingHeart />
            </div>
            <div className="botaoBichinho" onClick={levarPraPassear}>
              Levar pra passear <MdOutlineDirectionsBike />
            </div>
          </div>
          <div className="imagemBichinho">
            <img
              src={roupaPet}
              alt="skin do bichinho"
              className="imagem"
              style={{
                maxWidth: `${fomePet}%`,
                maxHeight: `${fomePet}%`,
                transition:
                  "max-width 0.5s ease-in-out, max-height 0.5s ease-in-out",
              }}
            />
          </div>
          <div className="skinBichinho">
            MUDE A SKIN
            <select defaultValue={skinPet} onChange={handleInfoPet}>
              {photos.map((pet, index) => {
                return (
                  <option value={pet.index} key={index}>
                    {pet.skin}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      {isOpenModalName && (
        <div className="modalInicial">
          <p className="infoName">INSIRA O NOME DO SEU BICHINHO</p>
          <input
            className="inputName"
            type="text"
            maxLength={20}
            value={nomePet}
            onChange={handleChangeName}
          />
          <div
            className="botaoName"
            onClick={nomePet.length === 0 ? null : closeModalImage}
            style={{
              cursor: nomePet.length === 0 ? "not-allowed" : "pointer",
              backgroundColor: nomePet.length === 0 ? "#ccc" : "#00008b", // Cor de fundo diferente quando desabilitado
              opacity: nomePet.length === 0 ? 0.6 : 1, // Opacidade reduzida quando desabilitado
            }}
          >
            OK
          </div>
        </div>
      )}
      {isOpenModalDied && (
        <div className="modalDied">
          <p className="infoDied">{nomePet} MORREU :c</p>
          <div className="botaoName" onClick={closeModalDied}>
            REINICIAR
          </div>
        </div>
      )}
    </div>
  );
}
