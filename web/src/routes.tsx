import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom' // yarn add @types/react-router-dom -D ---> installing type so TS can recognize it (add types as development dependecies -D)

import Landing from './pages/Landing'
import TeacherList from './pages/TeachersList'
import TeacherForm from './pages/TeacherForm'

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing} />    
            <Route path="/study" component={TeacherList} />
            <Route path="/give-classes" component={TeacherForm} />
        </BrowserRouter>
    )
}

export default Routes
