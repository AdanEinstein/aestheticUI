import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import { Card, DataGridActions, FilterCard, FilterFieldsProvider, Nav, Navbar, useFilter } from "./components";
import { INav } from './@types/sitemap';
import { DataGrid, GridColDef, ptBR } from '@mui/x-data-grid';
import pessoas from './data/pessoas.json'

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

export const pessoaModel: GridColDef<any>[] = [
    { field: "id", headerName: "ID", type: "number", headerAlign: "center", align: "center", minWidth: 100 },
    { field: "cpf_cnpj", headerName: "CPF/CNPJ", type: "number", headerAlign: "center", align: "center", minWidth: 200, flex: 1 },
    { field: "nome_completo", headerName: "Nome/Razão Social", type: "string", headerAlign: "center", align: "center", minWidth: 200, flex: 1 },
    { field: "telefone", headerName: "Telefone", type: "string", headerAlign: "center", align: "center", minWidth: 150, flex: 1 },
    {
        field: "actions",
        headerName: "Ações",
        headerAlign: "center",
        align: "center",
        width: 300,
        renderCell(params) {
            return (
                <DataGridActions.Root params={params} className="gap-3">
                    <DataGridActions.Edit/>
                    <DataGridActions.Delete/>
                </DataGridActions.Root>
            )
        },
    }
]

function Page() {
    const { filteredData } = useFilter(pessoas, pessoaModel)

    return (
        <div
            className="h-screen gap-3"
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
            <div className='w-screen flex flex-col justify-center items-center gap-12 p-12'>
            <FilterCard.Root
                className='md:w-4/6'
                dataModel={pessoaModel}
                title={<span className='text-2xl font-light'>Filtrar Pessoas</span>}
            />
            <Card.Root className="md:w-4/6">
                <Card.Header className="text-2xl font-light">
                    <div className="flex flex-row items-center justify-between">
                        Pessoas
                    </div>
                </Card.Header>
                <Card.Body className="h-[480px]">
                    <DataGrid
                        rows={filteredData}
                        columns={pessoaModel}
                        getRowId={(row) => `${row.id}`}
                        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                        initialState={{
                            columns: {
                                columnVisibilityModel: {
                                    id: false,
                                },
                            },
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[10, 25, 50, 100]}
                    />
                </Card.Body>
            </Card.Root>
        </div>
        </div>
    )
}

function App() {
    return (
        <FilterFieldsProvider>
            <Page/>
        </FilterFieldsProvider>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
