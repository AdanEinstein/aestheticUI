import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import { Card, Nav, Navbar } from "./components";
import { INav } from './@types/sitemap';

const sitemap: INav = {
    contratos: {
        name: "Contratos",
        items: {
            cadastro: {
                label: "Cadastro de contratos",
                link: () => "/cadastro-de-contratos"
            },
            vencer: {
                label: "Contratos a vencer",
                link: () => "/contratos-a-vencer"
            }
        }
    },
    manutencao: {
        name: "Manutenção",
        items: {
           pessoas: {
                label: "Pessoas",
                link: () => "/pessoas"
            }
        }
    }
}

function App() {
    return (
        <div
            className="h-screen"
            style={{
                display: 'grid',
                gridTemplateRows: '60px 1fr',
            }}
        >
            <Navbar.Root className="gap-3">
                <Navbar.Content>
                    <Nav sitemap={sitemap} />
                </Navbar.Content>
                <Navbar.Right>
                    <Navbar.Container title="Aplicação" subtitle="&copy; Adan Einstein - 2023" />
                </Navbar.Right>
            </Navbar.Root>
            <div className="flex justify-center items-center">
                <Card.Root className="lg:w-2/5 md:w-4/6 w-5/6 pb-5">
                    <Card.Header className="flex justify-center items-center">
                        <h1 className="font-light text-2xl text-zinc-800">Login</h1>
                    </Card.Header>
                    <Card.Body className="flex flex-col justify-center items-center">
                        <h1 className="mb-5 text-2xl font-light">Olá mundo</h1>
                        <a
                            className="p-3 rounded-lg hover:bg-blue-300 hover:border-blue-500 border-2"
                            href={'/home'}
                        >
                            Navegar
                        </a>
                    </Card.Body>
                </Card.Root>
            </div>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
