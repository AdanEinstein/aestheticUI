import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import {
  Card,
  DataGridActions,
  FilterCard,
  FilterFieldsProvider,
  Nav,
  Navbar,
  useFilter,
} from './components'
import { INav } from './@types/sitemap'
import { DataGrid, GridColDef, ptBR } from '@mui/x-data-grid'
import pessoas from './data/pessoas.json'

const sitemap: INav = {
  menu1: {
    name: "Cadastro",
    items: {
      produto: {
        name: "Produto",
        items: {
          new: {
            name: "Novo",
            link: () => '/produto/new'
          },
          list: {
            name: "Listar",
            handleLink: () => console.log('Function void')
          }
        }
      },
      ofertas: {
        name: "Oferta",
        items: {
          new: {
            name: "Novo",
            link: () => '/ofertas/new'
          },
          list: {
            name: "Listar",
            handleLink: () => console.log('Function void')
          }
        }
      },
      pessoas: {
        name: "Pessoas",
        link: () => '/pessoa'
      }
    }
  },
  menu2: {
    name: "Configuração",
    items: {
      usuario: {
        name: "Usuário",
        items: {
          new: {
            name: "Novo",
            link: () => '/user/new'
          },
          list: {
            name: "Listar",
            handleLink: () => console.log('Function void')
          }
        }
      },
      conta: {
        name: "Conta",
        items: {
          new: {
            name: "Novo",
            link: () => '/conta/new'
          },
          list: {
            name: "Listar",
            handleLink: () => console.log('Function void')
          }
        }
      }
    }
  },
  menu3: {
    name: "Manutenção",
    handleLink:() => console.log('Function void')
  }
}

export const pessoaModel: GridColDef<any>[] = [
  {
    field: 'id',
    headerName: 'ID',
    type: 'number',
    headerAlign: 'center',
    align: 'center',
    minWidth: 100,
  },
  {
    field: 'cpf_cnpj',
    headerName: 'CPF/CNPJ',
    type: 'number',
    headerAlign: 'center',
    align: 'center',
    minWidth: 200,
    flex: 1,
  },
  {
    field: 'nome_completo',
    headerName: 'Nome/Razão Social',
    type: 'string',
    headerAlign: 'center',
    align: 'center',
    minWidth: 200,
    flex: 1,
  },
  {
    field: 'telefone',
    headerName: 'Telefone',
    type: 'string',
    headerAlign: 'center',
    align: 'center',
    minWidth: 150,
    flex: 1,
  },
  {
    field: 'actions',
    headerName: 'Ações',
    headerAlign: 'center',
    align: 'center',
    width: 300,
    renderCell(params) {
      return (
        <DataGridActions.Root params={params} className="gap-3">
          <DataGridActions.Edit />
          <DataGridActions.Delete />
        </DataGridActions.Root>
      )
    },
  },
]

function Page() {
  const { filteredData, loading } = useFilter({data: pessoas as any, model: pessoaModel})

  return (
    <div
      className="h-screen w-full gap-3"
      style={{
        display: 'grid',
        gridTemplateRows: '60px 1fr',
      }}
    >
      <Navbar.Root className="gap-3">
        <Navbar.Content>
          <Nav sitemap={sitemap} linkWrapper={props => <a {...props}>{props.children}</a>} activeOnMouseOver/>
        </Navbar.Content>
        <Navbar.Right>
          <Navbar.Container title="Aplicação" subtitle="&copy; Adan Einstein - 2023" />
        </Navbar.Right>
      </Navbar.Root>
      <div className="w-screen flex flex-col justify-center items-center">
        <FilterCard.Root
          className="md:w-4/6"
          dataModel={pessoaModel}
          title={<span className="text-2xl font-light">Filtrar Pessoas</span>}
          titleModal={<span className="text-2xl font-light">Filtrar Pessoas</span>}
        />
        <Card.Root className="md:w-4/6">
          <Card.Header className="text-2xl font-light">
            <div className="flex flex-row items-center justify-between">Pessoas</div>
          </Card.Header>
          <Card.Body className="h-[480px]">
            <DataGrid
              loading={loading}
              rows={filteredData}
              columns={pessoaModel}
              getRowId={(row) => `${Math.random() * row.id}`}
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
      <Page />
    </FilterFieldsProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
