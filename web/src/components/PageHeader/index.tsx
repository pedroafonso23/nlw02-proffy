import React from 'react'

import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg'
import backIcon from '../../assets/images/icons/back.svg'

import './styles.css'

// As we are passing a parameter (title) to the component PageHeader, we have to say to TS what this parameter
interface PageHeaderProps {
    title: string
}

// We have a component PageHeader, it is a Functional Compomente, and the properties it can receive are inside <>
const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Voltar"/>
                </Link>
                <img src={logoImg} alt="Proffy"/>
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>

                {props.children}
            </div>
        </header>
    )
}

export default PageHeader