import { NavItem } from './@types/sitemap'
import Nav from './components/Layout/Nav'
import { Navbar } from './components/Layout/Navbar'
import { Card } from './components/Layout/Card'
import { FilterCard } from './components/FilterCard'
import { GridColDef } from '@mui/x-data-grid'
import { Container, Grid, Link } from '@mui/material'
import useFilter from './components/FilterCard/contexts/hooks/useFilter'

const sitemap: NavItem[] = [
    {
        id: 1,
        name: 'Solicitação',
        items: [
            {
                id: 1,
                label: 'Solicitar',
                link: (end = 'new') => `/solicitacao/${end}`,
            },
            {
                id: 2,
                label: 'Consultar',
                link: (end = 'list') => `/solicitacao/${end}`,
            },
            {
                id: 3,
                label: 'Configuração',
                link: (end = 'settings') => `/solicitacao/${end}`,
            },
        ],
    },
    {
        id: 2,
        name: 'Sair',
        link: '/login',
        handleLink(param) {
            console.log(param)
        },
    },
]

const columns: GridColDef<object>[] = [
    {
        field: 'solicitacao_idsolicitacao',
        headerName: 'ID',
        sortable: true,
        width: 90,
        type: 'string',
        valueGetter: () => {
            return `foo`
        },
    },
    {
        field: 'bairro_nmbairro',
        headerName: 'Bairro',
        sortable: true,
        width: 150,
        type: 'string',
        valueGetter: () => {
            return `foo`
        },
    },
    {
        field: 'solicitacao_dtencerramento',
        headerName: 'Data de encerramento',
        sortable: true,
        width: 200,
        type: 'string',
        valueGetter: () => {
            return `foo`
        },
    },
    {
        field: 'tipo_resposta_txdescricao',
        headerName: 'Tipo de resposta',
        sortable: true,
        width: 150,
        type: 'string',
        valueGetter: () => {
            return `foo`
        },
    },
    {
        field: 'resposta_obsobservacao',
        headerName: 'Resposta',
        sortable: true,
        width: 350,
        type: 'string',
        valueGetter: () => {
            return `foo`
        },
    },
]

function App() {
    const {} = useFilter([], [])

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
                    <Navbar.Container title="jPRO.Atende 2.0" subtitle="&copy; Prodesan - 2023" />
                </Navbar.Right>
            </Navbar.Root>
            <div className="flex justify-center items-center">
                <FilterCard.Root
                    className="md:w-4/6 sm:w-full sm:mx-3"
                    title="Solicitações"
                    dataModel={columns}
                    action={
                        <FilterCard.Action
                            href={'/'}
                            label="Nova Solicitação"
                            className="mt-3 bg-blue-500"
                            variant="contained"
                            linkWrapper={Link}
                        />
                    }
                    footer={
                        <Container>
                            <Grid container spacing={2} alignItems={'center'}></Grid>
                        </Container>
                    }
                />
                <Card.Root className="lg:w-2/5 md:w-4/6 w-5/6 pb-5">
                    <Card.Header className="flex justify-center items-center">
                        <h1 className="font-light text-2xl text-zinc-800">Login</h1>
                    </Card.Header>
                    <Card.Body className="flex flex-col justify-center items-center">
                        <h1 className="mb-5 text-2xl font-light">404 - Página não encontrada</h1>
                        <a
                            className="p-3 rounded-lg bg-prodesan-banner hover:bg-blue-300 hover:border-blue-500 border-2"
                            href={'/home'}
                        >
                            Voltar a navegação
                        </a>
                    </Card.Body>
                </Card.Root>
            </div>
        </div>
    )
}

export default App
