import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars2.githubusercontent.com/u/62068773?s=460&u=46d1fb5d480e4c6b50312d35c6dc524267bc4d95&v=4" alt="Pedro Afonso"/>
                <div>
                    <strong>Pedro Afonso</strong>
                    <span>Algoritmos</span>
                </div>
            </header>

            <p>
                Professor de algoritmos com 36 anos de experiência.
                <br/><br/>
                Muitos anos de carreira o tornaram um dos melhores professores da área. Se você está com dificuldades em algoritmos e lógica de programação, essa é a escolha certa.
            </p>

            <footer>
                <p>
                    Preço/hora
                    <strong>R$ 280,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp"/>Entrar em contato
                </button>
            </footer>
        </article>
    )
}

export default TeacherItem