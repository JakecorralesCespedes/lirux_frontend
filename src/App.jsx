import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { Navbar, NavbarBrand, NavbarContent, Link } from "@nextui-org/react";
import Chat from './components/Chat';
import './App.css';

function App() {
  return (
    <NextUIProvider>
      <div className="app">
        <Navbar 
          maxWidth="xl" 
          className="nav-header"
          shouldHideOnScroll
        >
          <NavbarBrand>
            <img 
              src="src/assets/Logo w 88.7.png" 
              alt="Radio Lira" 
              className="h-10 mr-3"
            />
            <p className="font-bold text-inherit">Radio Lira</p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <Link color="foreground" href="#">
              Inicio
            </Link>
            <Link color="foreground" href="#">
              Programación
            </Link>
            <Link color="foreground" href="#">
              Nosotros
            </Link>
          </NavbarContent>
        </Navbar>
        <main className="main-content">
          <div className="chat-welcome">
            <h1 className="text-4xl font-bold mb-4">Bienvenido a Radio Lira</h1>
            <p className="text-xl text-gray-400 mb-8">
              ¿Tienes alguna pregunta? Estamos aquí para ayudarte
            </p>
          </div>
          <Chat />
        </main>
      </div>
    </NextUIProvider>
  );
}

export default App;